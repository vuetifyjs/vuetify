---
meta:
  nav: Vuetify MCP
  title: Vuetify MCP - AI assistant integration
  description: Connect Claude, Cursor, VS Code and other AI assistants to version-accurate Vuetify 4 APIs, installation guides, upgrade plans and release notes.
  keywords: mcp, model context protocol, ai, claude, cursor, vs code, vuetify api, upgrade
related:
  - /getting-started/installation/
  - /getting-started/upgrade-guide/
  - /getting-started/release-notes/
---

# Vuetify MCP

Vuetify MCP is the official [Model Context Protocol](https://modelcontextprotocol.io) server for Vuetify. It gives your AI assistant live, version-accurate access to Vuetify component APIs, installation guides, v4 breaking changes, upgrade plans and release notes, so it stops guessing props from older versions.

<PageFeatures />

## Quick start

The hosted server needs no install and no API key:

```bash
claude mcp add --transport http vuetify-mcp https://mcp.vuetifyjs.com/mcp
```

Or let the CLI detect your editor and configure it:

```bash
npx -y @vuetify/mcp config --remote   # hosted
npx -y @vuetify/mcp config            # local (stdio)
```

::: tip Vuetify One features

To use [bins, playgrounds and links](#share-reproductions-vuetify-one) you need to connect to the `/one` endpoint instead and log in with your Vuetify One account. See [Authentication](https://github.com/vuetifyjs/mcp#authentication) in the MCP README for setup instructions.

```bash
claude mcp add --transport http vuetify-one https://mcp.vuetifyjs.com/one
```

:::

## Editor configuration

### Cursor

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "vuetify-mcp": { "url": "https://mcp.vuetifyjs.com/mcp" }
  }
}
```

### VS Code

`.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "vuetify-mcp": { "type": "http", "url": "https://mcp.vuetifyjs.com/mcp" }
  }
}
```

### Claude Desktop

Add the hosted server as a custom connector: open **Settings > Connectors**, choose **Add custom connector**, and enter `https://mcp.vuetifyjs.com/mcp`. Custom connectors are available on all Claude plans (Free is limited to one) and are reached from Anthropic's cloud, not your machine.

To run the server locally instead, add it to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vuetify-mcp": { "command": "npx", "args": ["-y", "@vuetify/mcp"] }
  }
}
```

### Any client (local stdio)

```json
{ "command": "npx", "args": ["-y", "@vuetify/mcp"] }
```

## What your assistant can do

### API lookup

- `get_vuetify_api_by_version`: the API surface for a given Vuetify version
- `get_component_api_by_version`: props, events and slots for one component at a version
- `get_directive_api_by_version`: directive APIs
- `get_exposed_exports`: what the `vuetify` package exports

### Installation and features

- `get_installation_guide`: Vite, Nuxt, Laravel, CDN and more
- `get_feature_guides` / `get_feature_guide`: theme, display, grid, typography and other feature docs
- `get_frequently_asked_questions`

### Upgrading to Vuetify 4

- `get_v4_breaking_changes`: v3 → v4 breaking changes
- `get_upgrade_guide`, `get_upgrade_plan`, `get_upgrade_rules`: a step-by-step plan for your project
- `get_release_notes_by_version`: what changed in any release
- Coming from v2: `get_v3_breaking_changes`, `get_v2_to_v3_component_map`, `get_v3_upgrade_playbook`

### Share reproductions (Vuetify One)

- `create_vuetify_bin`, `update_vuetify_bin`, `get_bin`, `get_all_bins`
- `create_vuetify_playground`, `update_vuetify_playground`, `get_playground`, `get_all_playgrounds`
- `create_vuetify_link`, `create_bug_report`

These need a Vuetify One account. See the [Vuetify MCP README](https://github.com/vuetifyjs/mcp#authentication).

::: info
Building with [Vuetify0](https://0.vuetifyjs.com)? The same server includes `get_vuetify0_*` tools. See the [v0 MCP guide](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp).
:::

## Try it

- "Upgrade this project to Vuetify 4. Use the Vuetify MCP upgrade plan and check each component against the 4.x API."
- "What props does VDataTable support in my Vuetify version?"

## Privacy

See the [Vuetify MCP privacy policy](/en/legal/mcp-privacy/).
