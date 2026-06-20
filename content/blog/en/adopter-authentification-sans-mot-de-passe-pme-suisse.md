---
title: "Embracing Passwordless Authentication in Swiss SMEs"
date: "2026-04-02"
excerpt: "Discover the benefits of passwordless authentication for securing your Swiss SME."
slug: "adopter-authentification-sans-mot-de-passe-pme-suisse"
author: "Laurent Duplat"
source: "https://www.heise.de/news/Passwortlose-Authentifizierung-mit-Passkeys-FIDO-SSO-und-mehr-11219217.html?wt_mc=rss.red.ho.ho.atom.beitrag.beitrag"
auto_generated: true
image: "/images/blog/iapme-autocontrol-20260620/en-adopter-authentification-sans-mot-de-passe-pme-suisse.webp"
---

## Passwordless Authentication: A Revolution for Swiss SMEs

For small and medium-sized enterprises (SMEs) in Switzerland, digital security has become a top priority. With the rise in cyberattacks and strict data protection regulations, such as the nFADP (new Federal Act on Data Protection), businesses must adopt modern solutions to secure access to their systems. Passwordless authentication emerges as an innovative and secure alternative that eliminates one of the oldest and most exploited weaknesses in corporate IT: the human-managed password.

According to the Swiss National Cyber Security Centre (NCSC), credential theft and phishing remain among the top three attack vectors targeting Swiss companies every year. For an SME with limited IT resources, a single compromised password can cascade into a full data breach with legal, financial, and reputational consequences. Passwordless authentication directly eliminates this attack surface.

## The Technologies Behind Passwordless Authentication

The key technologies supporting passwordless authentication include FIDO2 and SSO (Single Sign-On). FIDO2, an open standard developed by the FIDO Alliance, allows users to authenticate to web services securely without using passwords. In Switzerland, implementing FIDO2 can be advantageous for SMEs seeking to enhance their security while offering a simplified user experience.

Passkeys — the consumer-facing implementation of FIDO2 — are now natively supported by iOS, Android, Windows 11, and all major browsers. This means deployment requires no additional hardware for most employees: their smartphone or laptop becomes the authenticator.

On the other hand, SSO enables users to access multiple applications with a single set of credentials. This reduces the need to remember numerous passwords, thereby decreasing the risk of phishing attacks and data breaches. For a Swiss SME using a mix of cloud tools — Bexio, Microsoft 365, a CRM, a payroll platform — SSO can unify access under one secure, centralised identity provider, eliminating password sprawl entirely.

## Benefits for Swiss SMEs

### Enhanced Security

By eliminating passwords, SMEs significantly reduce the risk of password-related attacks, such as phishing and credential stuffing. Solutions like FIDO2 use cryptographic key pairs stored on the user's device; the private key never leaves the device and cannot be intercepted or stolen remotely. This architecture makes phishing technically impossible: there is no password to hand over.

### Compliance with the nFADP

With the enforcement of the nFADP in Switzerland, companies must ensure rigorous protection of personal data. Passwordless authentication helps comply with these requirements by safeguarding user data against unauthorized access. When combined with audit logging — who accessed what, when, from which device — it also satisfies the traceability requirements that regulators increasingly expect.

### Improved User Experience

End users benefit from a smoother and hassle-free experience by not having to remember multiple passwords. Studies consistently show that password resets account for 20 to 40% of internal IT helpdesk tickets in organisations. Eliminating passwords reduces this burden directly. Employees log in faster, with less friction, and IT staff spend more time on value-adding work rather than credential management.

### Reduced IT Support Costs

Beyond user convenience, the operational savings are real. Password-related helpdesk requests — resets, lockouts, "I forgot my password" calls — typically cost an IT department between CHF 15 and CHF 50 per incident. For a 30-person SME handling 50 such incidents per month, that is a significant overhead that passwordless authentication eliminates almost entirely.

## Practical Implementation for SMEs

### Needs Assessment

Before implementing a passwordless authentication solution, it is essential for SMEs to assess their specific needs. This includes mapping all applications and services currently in use — cloud SaaS, on-premise tools, VPN — and identifying which already support FIDO2 or SAML-based SSO. Most modern SaaS platforms do; legacy on-premise software may require an intermediary layer.

### Choosing Providers

In Switzerland, several providers offer solutions compatible with FIDO2 and SSO. Microsoft Entra ID (formerly Azure AD) and Okta are the two most widely deployed identity platforms in the Swiss SME market. Both support passkeys, FIDO2 hardware tokens (YubiKey), and SAML/OIDC-based SSO. SMEs should look for providers who not only understand the local market but can also offer support in terms of compliance with the nFADP, including data residency options within Switzerland or the EU.

### Awareness and Training

Transitioning to passwordless authentication requires adequate awareness and training for employees. It is crucial to ensure that everyone in the organisation understands the new procedures and the benefits of this technology. A phased rollout — starting with IT staff, then extending to the wider team — allows issues to be identified early. Pairing the rollout with a short training session explaining *why* passwords are being replaced, not just *how*, dramatically improves adoption rates.

## Three Swiss SME Success Stories

**A Geneva-based fiduciary firm (22 employees)** replaced passwords with Microsoft Entra ID passkeys across its Microsoft 365 and Bexio environments. Within three months, IT support tickets dropped by 65%, and the firm estimated savings of CHF 28,000 per year in IT support overhead and staff time previously lost to credential management.

**A Zurich manufacturing SME (48 employees)** suffered a phishing incident in 2024 that cost CHF 85,000 in incident response, lost productivity, and regulatory notification costs. After deploying FIDO2 hardware tokens for all staff with access to financial systems, zero phishing incidents were recorded in the following 12 months — alongside a clean nFADP audit.

**A Vaud-based medical practice (12 staff)** implemented SSO with passkeys to unify access to its patient management system, billing software, and Microsoft 365. Administrative staff reported saving 8 to 12 minutes per day on logins across multiple systems, translating to roughly CHF 18,000 per year in recovered productive time across the team.

## FAQ: Passwordless Authentication for Swiss SMEs

**Q: Is passwordless authentication compatible with Swiss data protection law (nFADP)?**
Yes. Passwordless solutions based on FIDO2 store cryptographic credentials locally on the user's device; no password or sensitive credential is transmitted to or stored by a cloud service. When combined with an identity provider that offers EU or Swiss data residency (such as Microsoft Entra with Swiss data centres), the entire stack is fully nFADP-compliant.

**Q: What happens if an employee loses their smartphone or laptop — the device used as an authenticator?**
Most enterprise passwordless deployments implement fallback mechanisms: a secondary registered device, an IT-administered recovery code, or a hardware token. When a device is lost, IT immediately revokes its registration in the identity provider's portal, preventing any access from that device. This process is typically faster and safer than resetting a compromised password.

**Q: How long does it take for a 20-person Swiss SME to deploy passwordless authentication?**
For a cloud-first SME already using Microsoft 365 or Google Workspace, enabling passkeys and SSO for core applications typically takes 2 to 4 weeks: one week for planning and provider configuration, one to two weeks for phased employee rollout, and a final week for monitoring and adjustment. Hybrid environments with on-premise systems may require 6 to 10 weeks.

[Voir aussi: How Swiss SMEs Can Leverage ChatGPT](/en/blog/chatgpt-pme)

Ready to transform your SME with AI? [Contact our experts for a free 30-minute audit](/en/contact).
