# Cyber Hygiene — UML alignment and presentation scope

Updated 2 November 2026 to reflect the team feedback and implemented GitHub Pages prototype. This is a change specification for the team's UML source, not a claim that the recorded diagram itself has been edited. Some labels in the video are too blurred to transcribe reliably; use these concrete responsibilities when updating the original.

## Navigation and responsibility changes

| Existing concept | UML change | Implemented behaviour |
| --- | --- | --- |
| Password Security leading to learning content | Rename the feature to **Password Manager / Cyber Vault**. Link it to a separate vault unlock flow, not Learning Hub. | Local account → create/unlock a separate master passphrase → encrypted vault |
| Password Manager screens | Model Unlock, Vault Home, Credential Detail, Add/Edit Form, Generator and Settings as views of the password-manager feature. | All six view responsibilities exist; layout adapts to desktop/mobile |
| Security Guidelines containing lessons and quizzes | Make this an **Incident Guidance** feature with scenario-specific response instructions. | Guidance for suspicious links, stolen credentials, malware and payment exposure |
| Cyber Training Awareness | Make this the parent of **Learning Hub**, **Lesson**, **Knowledge Quiz** and **Phishing Challenge**. | Six lessons, embedded quiz entry points, eight-message challenge |
| Risk Assessment menu item | Remove only the direct menu association; retain the assessment use case under Home. | Home → risk details/calculator; existing risk data stays intact |
| Report Manager | Distinguish saving a local practice report from submitting a real report. | Browser-local report/history/export; no IT ticket is sent |

## Class/model changes

| Model | Useful attributes | Operations / relationships |
| --- | --- | --- |
| LocalAccount | id, displayName, username, salt, passwordHash | register(), authenticate(); owns a local learning workspace and at most one local vault |
| EncryptedVault | version, algorithm, iterations, salt, iv, ciphertext | create(), unlock(), lock(), save(); stored per account; plaintext exists only while unlocked |
| CredentialEntry | id, title, username, password, websiteURL, favourite | add(), edit(), delete(), reveal(), copy(); 0..100 entries inside the encrypted vault payload |
| PasswordGenerator | requestedLength, selectedCharacterGroups | generate(); produces random credentials locally; no server call |
| TrainingLesson | id, title, category, body, quizQuestions | open(), startQuiz(); belongs to Cyber Training Awareness |
| QuizAttempt | lessonId, score, total, date | recordAttempt(); contributes to Learning Progress |
| PhishingChallenge | message, expectedVerdict, warningSigns, explanation | chooseVerdict(), revealFeedback(); its results also contribute to progress |
| IncidentGuidance | incidentType, orderedSteps, sourceLinks | showAdvice(); static educational content, no remote account control |
| PracticeReport | channel, kind, redactedDetails, date | saveLocally(), export(); no assigned responder or server delivery status |
| RiskAssessment | title, likelihood, impact, date | calculateScore() = likelihood × impact, 1..25; reached through Home |

The credential password is a **conceptual decrypted field** in the in-memory model. Do not draw plaintext password columns in local persistent storage. Only the encrypted vault envelope is stored. The platform account hash verifies prototype sign-in; it is not the vault encryption key. The vault master passphrase is not stored.

## Use-case and activity changes

- Student → sign in / guest learning access. Vault creation and unlocking require a local account; guest learning remains available.
- Student → Password Manager → [existing vault?] → create with confirmation OR unlock with master passphrase → vault home.
- Unlocked vault → view, search, favourite, add/edit/delete, reveal/copy credentials, generate password, change session lock timeout.
- Vault → lock on explicit action, inactivity, hidden tab, page departure, account switch or logout. Unsuccessful unlock returns to the locked state; unsuccessful saves show an error.
- Student → Security Guidelines → select incident type → read recovery steps → act through the official provider or institution. Saving practice notes is optional and is not incident escalation.
- Student → Cyber Training Awareness → lesson → quiz → feedback → progress. The phishing challenge is a second practice path within the same feature.
- Student → Home → Risk Assessment. Removing a menu link does not remove the risk entity or calculator.

For a sequence diagram, show `Student → Vault UI → Web Crypto → Browser Storage` for create/save and unlock. Web Crypto derives a non-exportable AES-GCM key from the separate master passphrase using PBKDF2-SHA-256 (600,000 iterations, random 16-byte salt). Each save uses a fresh random 12-byte IV. Storage receives ciphertext and encryption parameters; no vault network service is called. The key and plaintext are discarded by the application on lock, subject to JavaScript memory-management limits.

## What the presentation can demonstrate

1. Register/sign in to a browser-local account using a unique prototype password.
2. Open Password Manager; create a separate master passphrase; add a **fictional** student portal credential.
3. Reveal, edit, generate, save and delete credentials; lock and unlock; show that an incorrect passphrase fails.
4. Open Security Guidelines and demonstrate what to do after entering a portal password into a fake bursary page.
5. Open Cyber Training Awareness; read the phishing lesson, complete its quiz, then try the scam challenge.
6. Open Home to access Risk Assessment; show that its menu duplicate has gone.

## State these limits clearly

| Feature | Current scope / limitation |
| --- | --- |
| Account sign-in | Device-local password verification; no server identity or institutional authorization |
| Vault | Browser-local encryption prototype; no independent security audit; use fictional demo credentials |
| Master passphrase | Separate from sign-in; no reset/recovery; clearing site data loses the vault |
| Persistence | Same browser profile and site origin only; no cloud sync, export/restore or cross-device recovery |
| Autofill / biometrics / OTP | Not implemented; do not claim fingerprint unlock, native keychain integration or live one-time-code generation |
| Clipboard | Copy is user-triggered; clipboard contents are outside vault protection and are not automatically cleared |
| Locking | Clears the application's references and visible secrets; cannot promise forensic erasure from browser memory |
| Reports | Practice notes only; no IT response queue, email notification or automatic incident escalation |
| Session revocation | Instructions only; users revoke sessions in each actual provider's security settings |
| Verification | Local message-pattern hints; no definitive phishing detection, URL reputation feed or malware scanning |
| Risk score | Manual likelihood × impact exercise; no automatic device or account audit |
| Security boundary | Encryption at rest does not protect an unlocked vault from malicious scripts on the same origin, browser extensions or device compromise |

The browser extension is a separate companion project, not a web-vault backend. Its TLS and opt-in exposure checks do not provide autofill or establish that a website is trustworthy.

## Verification status

Automated tests cover encryption round trips, plaintext absence in storage, wrong passphrases, tampering, account binding, CRUD, new IVs, storage failures, multi-tab conflicts, lock races and generator bounds. Existing learning, reports, risk and account checks are retained. Browser visual QA is blocked by this workspace's preview/browser environment and remains a manual acceptance step before the presentation.
