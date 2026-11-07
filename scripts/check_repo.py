"""Check local references and JavaScript syntax; no network calls or npm dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
errors = []

def reference(source, value):
    url = urlsplit(value)
    if url.scheme or url.netloc or not url.path:
        return
    target = ROOT / unquote(url.path.lstrip('/')) if url.path.startswith('/') else source.parent / unquote(url.path)
    if not target.exists():
        errors.append(f"{source.relative_to(ROOT)}: missing {value}")

def syntax(code, label):
    with tempfile.TemporaryDirectory(prefix='js-syntax-') as folder:
        path = Path(folder) / 'source.js'
        path.write_text(code)
        result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
        if result.returncode:
            errors.append(f'{label}: {result.stderr.strip()}')

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.source, self.inline, self.script, self.kind = source, [], False, ''
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        for key in ('src', 'href'):
            if attrs.get(key):
                reference(self.source, attrs[key])
        if tag == 'script':
            self.script = not attrs.get('src')
            self.kind = attrs.get('type', '')
            self.inline = []
    def handle_data(self, data):
        if self.script:
            self.inline.append(data)
    def handle_endtag(self, tag):
        if tag == 'script' and self.script:
            if self.kind in ('', 'text/javascript', 'application/javascript'):
                syntax(''.join(self.inline), f'{self.source.relative_to(ROOT)} inline script')
            self.script = False

files = [p for p in ROOT.rglob('*') if p.is_file() and not any(x.startswith('.') or x in ('node_modules', '__pycache__') for x in p.relative_to(ROOT).parts)]
for path in files:
    suffix = path.suffix.lower()
    if suffix == '.html':
        Page(path).feed(path.read_text())
    elif suffix in ('.js', '.cjs', '.mjs'):
        result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
        if result.returncode:
            errors.append(f'{path.relative_to(ROOT)}: {result.stderr.strip()}')
    elif suffix == '.css':
        for value in re.findall(r'url\([\s\'\"]*([^\)\'\"\s]+)', path.read_text()):
            reference(path, value)
    elif suffix == '.md':
        for value in re.findall(r'\]\(([^\s\)]+)\)', path.read_text()):
            reference(path, value)
if errors:
    raise SystemExit('\n'.join(errors))
print('PASS: local HTML/Markdown links, CSS assets and JavaScript syntax')
