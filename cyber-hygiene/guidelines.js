'use strict';
globalThis.CyberGuidelines = {
  render() {
    const cards = [
      ['I opened a suspicious link', [
        'Close the suspicious page and stop replying. Do not enter passwords, codes or payment details.',
        'If you only opened the page and entered nothing or installed nothing, stay alert for unusual account activity. A click alone does not prove compromise.',
        'If you entered a password, follow the account steps below. If you downloaded or installed something suspicious, follow the device steps.'
      ]],
      ['I shared a password or lost an account', [
        'Use a trusted device and open the official service independently. Follow its recovery process if you cannot sign in.',
        'Change the affected password and replace it on every other account where it was reused. Prioritise your email and student portal.',
        'Use the affected service’s security settings to sign out other sessions or all devices. Review connected apps and revoke unfamiliar access; changing a password alone may not remove every session.',
        'Check recovery addresses, phone numbers and email forwarding rules. Remove unfamiliar changes and enable MFA or a passkey where available.',
        'Review accounts linked through the affected email or single sign-on. Warn contacts if the attacker sent messages as you. Contact your university’s known IT support route.'
      ]],
      ['I installed suspicious software', [
        'Stop using the affected device for sensitive accounts. Disconnect it from Wi-Fi, Ethernet and other networks if you suspect malware.',
        'Use a separate trusted device to secure accounts used on the affected device. Review and revoke unfamiliar sessions.',
        'Contact university IT or a trusted technician. Use updated security tools and follow their cleanup advice; a persistent infection may require reinstalling the system.',
        'Keep the suspicious message and relevant details without reopening files. Follow IT instructions before deleting evidence or restoring backups.'
      ]],
      ['I shared payment details or sent money', [
        'Contact your bank or mobile-money provider immediately using its official app or a known contact number. Ask about blocking affected access and disputing the transaction.',
        'Keep transaction references, timestamps and redacted screenshots. Do not share your PIN, password or one-time codes in a report.',
        'Report through the provider and appropriate local authorities. Beware of anyone demanding an advance fee to recover your money.'
      ]]
    ];
    return '<div class="reading">'+
      '<div class="intro guide-intro"><p class="eyebrow">SECURITY GUIDELINES</p><h1>Something happened. What now?</h1><p class="muted">Choose what happened and take the relevant recovery steps. These actions are guidance—you carry them out in the official services.</p><div class="row"><a class="btn" href="#report">Save a practice report</a><a class="btn secondary" href="#training">Learn to recognise phishing</a></div></div>'+
      '<div class="incident-grid">'+cards.map(([title,steps],i)=>'<details '+(i===1?'open':'')+'><summary>'+title+'</summary><ol>'+steps.map(step=>'<li>'+step+'</li>').join('')+'</ol></details>').join('')+'</div>'+
      '<section class="article" style="margin-top:24px"><h2>Keep the response focused</h2><p>Logging out of unrelated services alone does not undo an attack. Secure affected accounts, reused passwords and linked recovery routes. This platform cannot remotely close sessions, recover funds or remove malware.</p><p>For a real university incident, contact established IT support directly. The Report Manager stores practice notes locally and does not alert anyone.</p><h3>Further guidance</h3><p><a class="textlink" href="https://www.ncsc.gov.uk/guidance/recovering-a-hacked-account" target="_blank" rel="noopener noreferrer">NCSC: Recovering a hacked account ↗</a><br><a class="textlink" href="https://www.ncsc.gov.uk/section/respond-recover/phishing" target="_blank" rel="noopener noreferrer">NCSC: Responding to phishing ↗</a><br><a class="textlink" href="https://www.cyber.gov.au/guidance/recover-from-email-and-online-account-compromise" target="_blank" rel="noopener noreferrer">Australian Cyber Security Centre: Account compromise ↗</a></p><small>General technical advice adapted for this student demo. Use your own institution and provider support channels in Zambia.</small></section></div>';
  }
};
