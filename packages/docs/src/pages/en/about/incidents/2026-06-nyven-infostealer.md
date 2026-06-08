---
meta:
  nav: Discord takeover (June 2026)
  title: Incident report: Compromise and Discord account takeover (June 2026)
  description: Report on the June 2026 security incident in which a maintainer's personal machine was compromised by an infostealer and the Vuetify Discord support account was taken over. No Vuetify packages, source, releases, or user data were affected.
  keywords: vuetify security incident, infostealer, discord account takeover, extortion, incident report, nyven
related:
  - /about/security-disclosure/
  - /introduction/enterprise-support/
  - /introduction/long-term-support/
---

# Incident report June 2026

This page documents the June 2026 security incident affecting Vuetify's Discord support account.

<PageFeatures />

::: info
**TLDR:** On 2026-06-03, a Vuetify maintainer's personal machine was compromised by a commodity infostealer after a social-engineering lure. The attacker used credentials harvested from the browser to take over the Vuetify Discord support account, added 2FA to lock the owner out, and sent an extortion demand, which was refused. No Vuetify package, source, release, CI pipeline, or user data was affected. Discord recovery is ongoing; the current verified community link is in [Where to find us now](#where-to-find-us-now).
:::

## Summary { #summary }

On 2026-06-03, a Vuetify maintainer ran an unsigned installer that was a packaged infostealer. It harvested the credentials, cookies, and autofill data saved in the browser and exfiltrated them.

The attacker used those credentials to take over the Vuetify Discord support account. After taking control, the attacker added 2FA to lock the owner out and sent an extortion demand under threat to leak and sell the data. The demand was refused and no payment was made.

The compromise was limited to one personal machine and the accounts reachable from it. No part of Vuetify's software supply chain was affected.

## What was and was not affected { #scope }

| Asset | Status |
| - | - |
| **npm packages & releases** | **Not affected.** No package was modified, tampered with, or published. |
| **Source & GitHub org** | **Not affected.** No repository, branch, tag, or release was altered. |
| **CI/CD & infrastructure** | **Not affected.** |
| **User data & databases** | **Not affected.** |
| **Google Workspace** | **Not breached.** The `vuetifyjs.com` account was auto-suspended by Google as a precaution; the password was reset and control retained. |
| **Discord support account** | **Compromised.** The attacker added 2FA after taking it over; it is currently unrecoverable through self-service. |
| **Browser-stored secrets** | **Exposed.** Saved credentials, cookies, and autofill on the affected machine are treated as compromised and have been rotated or removed pending an internal audit. |
| **Developer tokens & keys** | **Treated as exposed.** Tokens on the host, including those with npm/GitHub access, have been rotated or removed and their sessions revoked, pending an internal audit. No evidence any were used against project infrastructure. |

Credentials and tokens on the machine that could reach npm or GitHub have been rotated or removed pending an internal audit. Vuetify's release pipeline already enforces several layers of protection, including OIDC-based trusted publishing to npm and mandatory two-factor authentication, which limit what any single stolen credential can do. There is no sign any were used against Vuetify's packages, repositories, or releases, and all areas of the ecosystem are being actively monitored for suspicious activity. No action is required of users.

## Timeline { #timeline }

All times are UTC on 2026-06-03 unless noted. Approximate times are marked with `~`.

| Time (UTC) | Event | Detail |
| - | - | - |
| `~17:00` | Installer downloaded | The unsigned installer was downloaded from the throwaway site. |
| `17:06` | Malware executed | The installer was run; the infostealer harvested browser-stored credentials and cookies and exfiltrated them. |
| `17:08` | Host isolated | The machine was disconnected from the network. |
| `17:16` | Extortion email received | The attacker emailed claiming to hold the stolen passwords, cookies, and autofill data. |
| `17:25` | Refused to engage | The attacker's contact was declined. |
| `~17:46–17:58` | Discord account takeover | The attacker used the stolen credentials to seize the Vuetify support account and added 2FA to lock the owner out. |
| `18:06` | Email/GitHub secured | Email and GitHub passwords were changed and all sessions forced to re-authenticate. |
| `18:10` | OAuth revoked | Third-party OAuth grants were revoked and active sessions cut. |
| `18:25` | Payment demanded | The attacker demanded payment under threat to leak and sell the data; no payment was made. |
| `2026-06-04` | Discord recovery blocked | Self-service recovery failed because of the attacker-added 2FA; a recovery case was opened with Discord. |
| `ongoing` | Discord recovery pending | Recovery and takedown requests to Discord remain unanswered; the attacker still controls the account and server. An interim community channel is live (see below). |

## Root cause { #root-cause }

The maintainer was led to a throwaway website and ran an unsigned installer that was malware. Because credentials were stored in the browser, a single execution exposed the full set at once.

## What is still open: Discord recovery { #discord-recovery }

The Vuetify Discord support account is not yet recovered. The attacker added 2FA, and because the account itself is required to begin Discord's self-service recovery, that path is blocked. Requests submitted through Discord's support channels have so far gone unanswered.

As of 2026-06-05, more than 48 hours after the takeover, the attacker still has complete control of the Vuetify Discord server and is actively messaging people from the hijacked support account. Requests asking Discord to suspend or shut down the account or the server have not received a response.

The exfiltration channel and the attacker's delivery infrastructure have been reported to the relevant platforms.

## Where to find us now { #where-to-find-us-now }

::: warning
Until the official server is restored or replaced, the only verified home for the Vuetify community on Discord is:

**[vtfy.link/discord-fallback](https://vtfy.link/discord-fallback)**

If the old server, or any direct message, claims to be us and asks for money, credentials, or 2FA codes, it is not us.
:::

Changes to the official channels will be posted here and on [vuetifyjs.com](https://vuetifyjs.com), the [GitHub organization](https://github.com/vuetifyjs), and [@vuetifyjs on X](https://x.com/vuetifyjs).

## For security researchers and organizations { #coordinated-disclosure }

A complete evidence package has been preserved: forensic artifacts, the full set of indicators of compromise, and the malware sample. Security vendors, researchers, CERT/CSIRTs, and platform trust-and-safety teams that can action it can request it at [security@vuetifyjs.com](mailto:security@vuetifyjs.com?subject=INCIDENT) (subject: INCIDENT).

A subset of indicators is published below; the complete set is available on request.

### Indicators (public subset) { #indicators }

- Malware family: a commodity "Nyven" infostealer (Electron dropper delivering an obfuscated Java credential grabber).
- Delivery: an unsigned installer (`NyvenSetupV1.exe`) downloaded from a throwaway `*.pages.dev` site (`nyvanbeta.pages.dev`).
- Behavior: harvests browser-stored credentials, cookies, and autofill data and exfiltrates them over a Discord channel.

Full indicators (file hashes, exfiltration channel identifiers, and build metadata) are withheld here to avoid interfering with platform recovery, and are shared with vetted parties on request.

## Contact { #contact }

Questions about this incident, or related information, can be sent to [security@vuetifyjs.com](mailto:security@vuetifyjs.com?subject=INCIDENT)

---

### Updates { #updates }

Dated entries are added here rather than editing the report above.

| Date | Update |
| - | - |
| 2026-06-05 | Initial publication. |
