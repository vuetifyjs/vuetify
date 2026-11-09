---
meta:
  nav: Security disclosure
  title: Security disclosure procedures
  description: This document outlines security procedures and general policies for the Vuetify project.
  keywords: security, security vulnerability, disclosure policy, security disclosure
related:
  - /introduction/enterprise-support/
  - /getting-started/contributing/
  - /introduction/long-term-support/
---

# Security disclosure procedures

This document outlines security procedures and general policies for the Vuetify project.

<PageFeatures />

<PromotedPromoted slug="enterprise-support" />

## Incidents

In the interest of transparency, confirmed security incidents that affect Vuetify or its community are logged here, each linking to a full public report.

| Date | Incident | Severity | Status | Report |
| - | - | - | - | - |
| 2026-06-03 | Maintainer endpoint compromise → Discord account takeover & extortion | High | Contained — Discord recovery ongoing | [Read the report](/about/incidents/2026-06-nyven-infostealer/) |

::: warning
The Vuetify Discord support account was taken over in the June 2026 incident and has not yet been recovered. Until it is restored, the only verified home for our community on Discord is **[vtfy.link/discord-fallback](https://vtfy.link/discord-fallback)**. Anyone using the old server — or a DM — to ask you for money, credentials, or 2FA codes is not us.
:::

## Reporting a Bug

The Vuetify team and community take all security bugs in Vuetify seriously. We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.

To report a security issue, email [security@vuetifyjs.com](mailto:security@vuetifyjs.com?subject=SECURITY) and include the word **\"SECURITY\"** in the subject line.

The Vuetify team will send a response indicating the next steps in handling your report. After the initial reply to your report, the security team will keep you informed of the progress towards a fix and full announcement, and may ask for additional information or guidance.

Report security bugs in third-party modules to the person or team maintaining the module.

## Disclosure Policy

When the security team receives a security bug report, they will assign it to a primary handler. This person will coordinate the fix and release process, involving the following steps:

- Confirm the problem and determine the affected versions.
- Audit code to find any potential similar problems.
- Prepare fixes for all releases still under maintenance.These fixes will be released as fast as possible to npm.

## Comments on this Policy

If you have suggestions on how this process could be improved please submit a pull request using the [issue creator](https://issues.vuetifyjs.com).
