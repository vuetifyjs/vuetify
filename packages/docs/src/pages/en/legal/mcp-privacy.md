---
meta:
  nav: MCP privacy
  title: Vuetify MCP Privacy Policy
  description: Privacy policy for the hosted Vuetify MCP server, including data collection, retention, and Vuetify One tools.
  keywords: vuetify mcp privacy, model context protocol, privacy policy, data retention, vuetify one
related:
  - /about/licensing/
  - /about/security-disclosure/
---

# Vuetify MCP Privacy Policy

**Last updated:** 13 August 2026

This policy applies to the hosted Vuetify MCP at https://mcp.vuetifyjs.com/mcp (streamable HTTP), including public documentation tools and Vuetify One–authenticated Bins, Playgrounds, and vtfy.link tools.

<PageFeatures />

## 1. Who we are

Vuetify LLC  
2041 Rufe Snow Dr. #101 PMB10  
Keller, TX 76248  
United States

**Contact:** hello@vuetifyjs.com

This policy is only about the **hosted Vuetify Model Context Protocol (MCP) server** and the Vuetify One features that server can reach (Bins, Playgrounds, vtfy.link). It is not a general Vuetify.com or Vuetify One privacy policy. Other Vuetify properties may have their own notices.

---

## 2. What this service is

Vuetify MCP is the official hosted MCP server for the Vuetify ecosystem. AI clients (Claude, Cursor, Grok, and others) connect to:

`https://mcp.vuetifyjs.com/mcp`

and call tools that:

- **Read public Vuetify documentation and APIs** (components, directives, install/feature/upgrade guides, FAQs, release notes, Vuetify0 / headless surfaces). These tools work **without an account**.
- **Read and write Vuetify Bins, Playgrounds, and vtfy.link short URLs** after the user signs in with **Vuetify One OAuth**. Listings and clients must not ask the user to paste a Vuetify API key for these tools.

Connecting a client to the public docs tools does not require creating a Vuetify account. Using Bins, Playgrounds, or vtfy.link through MCP does.

---

## 3. Data we collect

### 3.1 Request metadata (API and MCP host)

When a client calls Vuetify One APIs that support the hosted MCP, we record the client IP address as `remoteAddress`. **User-Agent, cookie, url, code, and state are redacted** from those logs and are not stored as part of that record.

Successful (HTTP 2xx) API requests are typically logged at debug level and **may not persist**.

The hosted MCP server logs **HTTP method and URL on errors**. It does not, in application code, log prompt bodies.

Cloudflare sits in front of **mcp.vuetifyjs.com** and processes request metadata as part of providing CDN / WAF / edge services.

### 3.2 Data you send through MCP (docs tools — no account)

When a client calls a public documentation tool, the hosted server receives the tool name and arguments needed to fulfill the request (for example a component name or guide id), plus standard HTTP request metadata.

**Tool-call logging on the hosted MCP (0.9.0):** we record the **tool name, duration, and error only**. We do **not** log tool arguments or results.

We do **not** require a Vuetify account, email, or OAuth token for public docs tools.

### 3.3 Data you send through MCP (Bins, Playgrounds, vtfy.link — Vuetify One OAuth)

When you (or your agent) use these tools, the server additionally processes:

- **Vuetify One account identity** obtained via OAuth, enough to know which One user is acting.
- **Short-lived access tokens** (JWTs, one hour) used to call One APIs on your behalf. These JWTs are **not stored in the database**. The MCP host **does not store the incoming Bearer** token.
- **A long-lived per-user secret** (`McpAccessToken.apiKey`) stored in the database as a unique plain string. It has **no expiry field** and is **deleted when the user is deleted**. We do not claim special or specific Gel encryption.
- **Bin, Playground, and vtfy.link content and metadata** you create, update, or list (titles, source, URLs, and the fields those products already store).
- Tool name, duration, and error for those calls (same as §3.2 — arguments and results are not logged by the current MCP host).

A separate Vuetify One API path (`/one/mcp/log`) **will persist parameters if a client sends them**. The current hosted MCP **does not send params** to that path. No prompt-body logging exists in application code.

Authentication for these tools is **Vuetify One OAuth**, not a pasted API key in a directory listing.

### 3.4 Data we do not intentionally collect here

This hosted MCP is not a general analytics product. We do not collect payment card data, government IDs, or precise geolocation through MCP. If a user pastes secrets into a bin, playground, or tool argument, that content is treated as user-supplied content of that feature — do not put secrets in tool args.

### 3.5 Children’s data

The service is for developers. It is not directed at children under 13 (or under 16 where that is the relevant age). We do not knowingly collect personal data from children.

---

## 4. How we use and store data

We use the data in §3 to:

- Answer MCP tool calls (return docs/API payloads; list/create/update bins, playgrounds, and vtfy.link URLs).
- Authenticate One-scoped tools via OAuth and enforce that those actions run as the signed-in One user.
- Operate, secure, and debug the hosted endpoint (see §3.1 and §3.2 for what is actually logged).
- Comply with law and respond to support mail at hello@vuetifyjs.com.

**Storage:**

- Public docs responses are generated from Vuetify documentation/API data we already publish.
- Bin, Playground, and vtfy.link records live in the existing Vuetify One / Play systems (Gel). MCP is another client of those systems; it does not replace their storage.
- Short-lived access tokens are JWTs, valid for **one hour**, and are **not written to the database**.
- The long-lived MCP credential is the per-user `McpAccessToken.apiKey` in the database (plain string, no expiry field). We do not claim special or specific Gel encryption.
- The MCP host does not persist the incoming Bearer.

We do not sell personal data. This draft does not describe advertising or cross-context behavioral ads for the hosted MCP.

---

## 5. Sharing with third parties

We share data only as needed to run the service, and only with parties we can actually name.

| Recipient | Role | Status |
| --- | --- | --- |
| **Vuetify LLC** (and people acting for us) | Operate MCP and One | Confirmed |
| **Vuetify One** (same company / product surface) | Account, OAuth, bins, playgrounds, vtfy.link | Confirmed |
| **Your MCP client** (Anthropic, Cursor, xAI, etc.) | You connected that client; it sends tool calls and receives results | Confirmed — we are not responsible for that client’s privacy policy |
| **Cloudflare** | CDN / WAF / edge in front of mcp.vuetifyjs.com | Confirmed |
| **Caddy** | Reverse proxy in front of the hosted MCP | Confirmed |
| **Gel** | Database for One accounts, bins, playgrounds, vtfy.link, and `McpAccessToken` | Confirmed |
| **GitHub, Discord, Google, Open Collective, Patreon, Shopify** | Sign-in and/or sponsorship identity for Vuetify One | Confirmed (auth / sponsorship) |
| **Stripe** | Payments for Vuetify One | Confirmed |
| **Coolify** | Deploy / host the MCP service | Confirmed |
| **Authorities** | If required by law | Standard reservation |

We do not sell MCP or One data to data brokers.

---

## 6. Retention

Confirmed retention, as operated today:

| Category | Retention |
| --- | --- |
| **Application logs, level ≤ 30** (includes info-level MCP tool logs) | Deleted when older than **1 week**, by a daily job at **21:09 UTC** |
| **Application logs, any level** | Deleted when older than **3 months**, same daily job. **docs-feedback** records are skipped |
| **MCP tool logs** (info: tool name, duration, error) | **7 days** (they are level ≤ 30) |
| **Access-token JWTs** | **1 hour** (not stored in the database) |
| **`McpAccessToken` (per-user apiKey)** | Until the **user is deleted** (no expiry field) |
| **Dynamically registered (DCR) OAuth clients** | **No TTL** |
| **Vuetify One account, bins, playgrounds, vtfy.link** | Until the user deletes them or the One product’s own rules apply |
| **Support email** to hello@vuetifyjs.com | As needed to handle the request |

**Not confirmed:** how long Cloudflare and Coolify retain their own edge / platform logs.

When we no longer need a category, we delete or de-identify it, subject to legal holds.

---

## 7. Your choices and rights

- **Docs tools:** do not connect a client, or disconnect it, if you do not want tool calls sent to https://mcp.vuetifyjs.com/mcp.
- **One-scoped tools:** sign in only if you want the agent to act on your Bins, Playgrounds, or vtfy.link. Manage those products from the dashboards below.
- **Account:** [Vuetify One → Settings](https://one.vuetifyjs.com/user/dashboard?tab=settings)
- **MCP:** [Vuetify One → MCP](https://one.vuetifyjs.com/user/dashboard?tab=mcp)
- **Bins:** [Vuetify Bins](https://bin.vuetifyjs.com/user/dashboard)
- **Playgrounds:** [Vuetify Playgrounds](https://play.vuetifyjs.com/user/dashboard)
- **Links:** [Vuetify Links](https://link.vuetifyjs.com/user/dashboard). **vtfy.link** is a redirector only; manage short links at [link.vuetifyjs.com](https://link.vuetifyjs.com/user/dashboard).
- **Access / deletion / correction:** email hello@vuetifyjs.com, or use the dashboard links above.
- Deleting your Vuetify One user deletes the long-lived `McpAccessToken` secret.
- Depending on where you live (including the EEA/UK and some US states), you may have rights to access, correct, delete, or port personal data, to object or restrict certain processing, and to lodge a complaint with a supervisory authority. We will honor applicable law.

If we act as a “service provider” / “processor” for an organization that connected MCP for its users, that organization’s instructions and agreement control to the extent required.

---

## 8. Security

We use HTTPS for the hosted endpoint and OAuth for One-scoped tools instead of pasted API keys.

- Incoming Bearer tokens are **not stored** on the MCP host.
- Access tokens are **one-hour JWTs** and are **not in the database**.
- The long-lived credential is a unique per-user secret in Gel, stored as a **plain string**, deleted with the user.
- We do not claim special or specific Gel encryption.
- Cloudflare provides edge / WAF protection for mcp.vuetifyjs.com.

No security statement in this draft is a guarantee of incident-free operation.

---

## 9. International transfers

Vuetify LLC is in the United States. If you connect from elsewhere, your tool calls and (for One tools) account data are processed in the United States and in any region used by the confirmed subprocessors in §5 (Cloudflare, Caddy, Gel, the listed identity providers, Stripe, Coolify). We will add a transfer mechanism (SCCs or equivalent) if counsel requires it for the final page.

---

## 10. Contact

Questions about this policy or MCP privacy:

**hello@vuetifyjs.com**  
Vuetify LLC  
2041 Rufe Snow Dr. #101 PMB10  
Keller, TX 76248  
United States

---

## 11. Changes

We will date material updates on this page. The canonical URL is https://vuetifyjs.com/en/legal/mcp-privacy.
