---
layout: blog
meta:
  title: Announcing the Vuetify0 Release Candidate
  description: Vuetify0 reaches release candidate. The API freeze held through five beta releases and 60 fixes — 50 components, 71 composables, and the last stretch to v1.
  keywords: Vuetify0 RC, release candidate, headless Vue, API freeze, accessibility, WCAG, useReducedMotion, Vuetify0 v1
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# Announcing the Vuetify0 Release Candidate

Vuetify0 has reached release candidate. The API freeze announced at [beta](/blog/announcing-vuetify0-beta/) held through six beta releases: nothing was renamed, nothing was removed, and the only additions were additive — a reduced-motion plugin and an accessibility helper on the locale system. From here to v1.0, the work is final testing and documentation. No new features.

🖊️ John Leider • 📅 July 2nd, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## Table of Contents

- [What a release candidate means](#what-a-release-candidate-means)
- [Where things stand](#where-things-stand)
- [A month of hardening](#a-month-of-hardening)
- [Accessible by default](#accessible-by-default)
- [Testing and benchmarks](#testing-and-benchmarks)
- [A reference implementation](#a-reference-implementation)
- [Documentation](#documentation)
- [AI tooling](#ai-tooling)
- [Road to v1](#road-to-v1)
- [FAQ](#faq)

---

## What a release candidate means

The beta froze the public API and promised that existing composables and components would keep their names, signatures, and behavior. A month and six releases later, that promise held — and it is now enforced mechanically: a repository check fails any pull request that changes the public surface ([#409](https://github.com/vuetifyjs/0/pull/409)).

The release candidate narrows scope further. Between now and v1.0:

- **No breaking changes and no new features.** The beta still accepted additive changes; the RC does not. The single exception is a critical security vulnerability that cannot be fixed any other way — and it would be documented in the release notes.
- **The time goes to testing.** Exercising the frozen surface against edge cases, accessibility passes, and security testing on top of the hardening the betas already shipped.
- **Documentation and feedback.** The rest of the effort is documentation, and the RC window is the last chance for feedback to catch a problem before the API locks in for the whole 1.x line. An API that fights you, a doc that misleads, a behavior that surprises — report it at [issues.vuetifyjs.com](https://issues.vuetifyjs.com) or on [Discord](https://community.vuetifyjs.com).
- **v1.0 is milestone-driven**, targeted for Q3 2026. Barring release-blocking discoveries, the RC is what v1.0 ships as — it releases when the milestones are met, not on a date.

After v1.0, the surface is governed by semver: breaking changes only in major releases.

---

## Where things stand

At the beta announcement the totals were 49 components and 68 composables. Beta.0 itself shipped the [Tooltip](https://0.vuetifyjs.com/components/disclosure/tooltip) component with its [useTooltip](https://0.vuetifyjs.com/composables/plugins/use-tooltip) plugin and [createDataGrid](https://0.vuetifyjs.com/composables/data/create-data-grid); the freeze window added [useReducedMotion](https://0.vuetifyjs.com/composables/plugins/use-reduced-motion) in beta.2. The RC surface is **50 components, 71 composables, and 24 utilities**.

The RC also promotes the v1 stable set ([#470](https://github.com/vuetifyjs/0/pull/470)): the selection family — `createModel`, `createSelection`, `createSingle`, `createStep`, `createGroup`, `createNested` — plus `createRegistry` and the `useTheme`, `useStorage`, and `useBreakpoints` plugins are now API-locked for 1.0. They join the already-stable foundation and observer composables, bringing the stable surface to 16 composables and 17 utilities.

| Maturity | Components | Composables | Utilities | What it means |
|----------|-----------|-------------|-----------|---------------|
| **Stable** | 0 | 16 | 17 | In use across releases, no planned breaking changes |
| **Preview** | 40 | 55 | 7 | Feature-complete and documented |
| **Draft** | 10 | 0 | 0 | Experimental or planned for a future release |

::: info
The full list is on the [Maturity Matrix](https://0.vuetifyjs.com/roadmap#maturity-matrix), with the current level for every component and composable.
:::

The ten draft components — DatePicker, DateRangePicker, TimePicker, Otp, Alert, DataGrid, DataTable, Kanban, Virtualizer, and Tour — are experimental and sit outside the frozen surface. They are not committed to v1 and promote individually when ready.

---

## A month of hardening

The beta cycle ran on a weekly cadence — five follow-up releases between June 9 and the RC cut — and produced 184 commits: 60 fixes, 5 performance rewrites, and 66 documentation commits. The fixes cluster into a few themes:

- **Security and input hardening** — composables were hardened against prototype pollution, CSS injection, and unbounded allocation ([#271](https://github.com/vuetifyjs/0/pull/271)); theme adapters now validate their CSS prefix ([#440](https://github.com/vuetifyjs/0/pull/440)) and popover anchor names are coerced to a safe charset ([#416](https://github.com/vuetifyjs/0/pull/416)).
- **Overlays and the top layer** — a native modal `<dialog>` paints above all z-index, so overlays teleported to `body` rendered underneath it. Snackbar and Portal can now teleport into the topmost open modal instead ([#397](https://github.com/vuetifyjs/0/pull/397)), and non-modal overlays no longer count toward stack blocking or scrim state ([#354](https://github.com/vuetifyjs/0/pull/354), [#352](https://github.com/vuetifyjs/0/pull/352)).
- **SSR and adapter lifecycle** — CSP nonces are applied to server-rendered theme styles ([#441](https://github.com/vuetifyjs/0/pull/441)), adopted stylesheets are removed on dispose ([#424](https://github.com/vuetifyjs/0/pull/424)), and plugins defer factory work to install time so unused plugins no longer allocate resources ([#343](https://github.com/vuetifyjs/0/pull/343)).
- **Selection and registry contracts** — disabled items can no longer slip in through the v-model sync path ([#426](https://github.com/vuetifyjs/0/pull/426)) or be toggled off ([#311](https://github.com/vuetifyjs/0/pull/311)), circular tree references are guarded ([#316](https://github.com/vuetifyjs/0/pull/316)), and registry cache consistency was tightened ([#331](https://github.com/vuetifyjs/0/pull/331)).
- **Forms edge cases** — submitting a form with a field id of `0` ([#288](https://github.com/vuetifyjs/0/pull/288)), invalidating in-flight async validation ([#294](https://github.com/vuetifyjs/0/pull/294)), and committing parsed NumberField values before the reactivity round-trip completes ([#371](https://github.com/vuetifyjs/0/pull/371)).
- **Renderless mode** — the element and handler contracts are now exposed through slot attributes across dialogs, form controls, Scrim, and Snackbar ([#327](https://github.com/vuetifyjs/0/pull/327)), so the consumer-owned-DOM path carries the same guarantees as the rendered one.

Performance work landed alongside: registry reordering moved from a Map rebuild to an order-array splice with windowed reindexing ([#273](https://github.com/vuetifyjs/0/pull/273)), proxy registry snapshots rebuild lazily on read ([#280](https://github.com/vuetifyjs/0/pull/280)), `createDataTable` replaced its reactive row registry with an event-driven version signal ([#328](https://github.com/vuetifyjs/0/pull/328)), and Overflow visibility checks dropped from O(n²) to O(n) per resize ([#417](https://github.com/vuetifyjs/0/pull/417)).

---

## Accessible by default

The largest user-facing change of the cycle is invisible until you turn on a screen reader. Every v0 component now ships a built-in English aria label through the locale system's new `ti` method ([#372](https://github.com/vuetifyjs/0/pull/372)) — "translate if exists" — which returns the translation or `undefined` instead of echoing the key:

```ts
const label = locale.ti('Button.label') ?? 'Button'
```

Apps with no locale plugin get meaningful accessible names (WCAG 4.1.2) with zero locale strings bundled into the runtime. The canonical English catalog is exposed as an optional `@vuetify/v0/locale/messages/en` export for seeding translations.

The RC audit of the project's [PHILOSOPHY](https://github.com/vuetifyjs/0/blob/master/packages/0/PHILOSOPHY.md) document surfaced two more attribute-compliance bugs, fixed in the same pass ([#451](https://github.com/vuetifyjs/0/pull/451)): ExpansionPanel emitted `data-selected="false"` instead of dropping the attribute, and Slider and Rating dropped `aria-disabled` entirely when enabled instead of emitting a concrete boolean for assistive tech.

Beta.2 also added the [useReducedMotion](https://0.vuetifyjs.com/composables/plugins/use-reduced-motion) plugin ([#278](https://github.com/vuetifyjs/0/pull/278)) — a three-way `system` / `always` / `never` mode over `prefers-reduced-motion`, with a reactive flag and a body data attribute for CSS-only consumers:

```ts
import { useReducedMotion } from '@vuetify/v0'

const motion = useReducedMotion()

motion.isReduced.value // should motion be minimized right now?
motion.select('always') // force reduce
motion.select('system') // follow the OS setting
```

---

## Testing and benchmarks

Current numbers:

- 6,338 passing unit tests across 159 test files.
- 97.8% average test coverage across the 113 primitives with recorded metrics; 78 of them sit at 100%.
- 13 benchmark suites with 399 recorded cases. Benchmark history is now regenerated on every release against a fixed apparatus ([#394](https://github.com/vuetifyjs/0/pull/394), [#422](https://github.com/vuetifyjs/0/pull/422)), so regressions show up as history, not anecdotes.
- 100% TypeScript and no runtime CSS. The package ships no styles, and exports are annotated so bundlers can drop unused composables.

::: info
The [benchmarks page](https://0.vuetifyjs.com/guide/fundamentals/benchmarks) documents the methodology and per-primitive results.
:::

---

## A reference implementation

Numbers describe the surface; [DevKey](https://devkey.vuetifyjs.com) shows it in use. The developer API dashboard from the [alpha tutorial](/blog/announcing-vuetify0-alpha/) is maintained as the reference v0 implementation and is updated in lockstep with releases — including this RC. Its command palette is a good picture of how the primitives compose: a `Dialog`, an `Input`, `createFilter`, `useHotkey`, and `useVirtualFocus` in one component (condensed from the source):

```html { resource="src/components/DkCommandPalette.vue" }
<script setup lang="ts">
  import { Dialog, Input, createFilter, useHotkey, useVirtualFocus } from '@vuetify/v0'

  // Cmd+K to open
  useHotkey('cmd+k', () => {
    open.value = true
    query.value = ''
  })

  // Filter commands by search query
  const filter = createFilter({ keys: ['label'] })
  const { items: filtered } = filter.apply(query, () => commands)

  // Keyboard navigation through results
  const { highlightedId, onKeydown } = useVirtualFocus(
    () => filtered.value.map(cmd => ({ id: cmd.id })),
    { control: search },
  )
</script>
```

No positioning math, no key-event switch statements, no filter re-implementation — the component is mostly wiring. The full source is at [vuetifyjs/devkey](https://github.com/vuetifyjs/devkey), and the [integration guide](https://0.vuetifyjs.com/guide/integration/devkey) walks through the architecture.

---

## Documentation

The 61 documentation commits were mostly one push: a full audit of the guide pages. Component and composable pages were normalized to one structure ([#392](https://github.com/vuetifyjs/0/pull/392)), FAQ sections homogenized ([#395](https://github.com/vuetifyjs/0/pull/395)), examples converted to multi-file copy-paste blocks ([#382](https://github.com/vuetifyjs/0/pull/382)), and stale data corrected across the board ([#458](https://github.com/vuetifyjs/0/pull/458), [#461](https://github.com/vuetifyjs/0/pull/461)).

New pages landed for [testing](https://0.vuetifyjs.com/guide/tooling/testing) ([#283](https://github.com/vuetifyjs/0/pull/283)) and a [core terminology glossary](https://0.vuetifyjs.com/guide/essentials/glossary) ([#410](https://github.com/vuetifyjs/0/pull/410)). The release pipeline moved to [Changesets](https://github.com/changesets/changesets) ([#365](https://github.com/vuetifyjs/0/pull/365)), and the docs now derive feature counts directly from the maturity manifest instead of hand-maintained numbers ([#378](https://github.com/vuetifyjs/0/pull/378)).

For learning the framework, [Vuetify0 Skillz](https://0.vuetifyjs.com/skillz) — interactive, hands-on tutorials built into the docs, itself in beta — now counts three guided tours: Using the Docs, Using Search, and Using Examples, the newest landing alongside the RC ([#459](https://github.com/vuetifyjs/0/pull/459)) to walk through live examples, the Playground, and multi-file recipes. Every page is also tagged Beginner, Intermediate, or Advanced, and the [skill filter](https://0.vuetifyjs.com/guide/essentials/using-the-docs#skill-levels-learning-tracks) trims the navigation to the levels you choose.

---

## AI tooling

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

As before, each documentation page has an Ask AI option, the docs publish `llms.txt` and `llms-full.txt`, and the [Vuetify MCP server](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp) connects an editor to the API reference. The MCP data is synced to the RC.

::: info
The [Vuetify MCP guide](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp#claude-code) covers connecting it to an editor.
:::

---

## Road to v1

The release candidate is the last milestone before v1.0:

- **Alpha** (April 7, 2026) — open for feedback, APIs mostly stable
- **Beta** (June 2, 2026) — API freeze; stability, documentation, and edge cases
- **RC** (July 2, 2026) — final testing and documentation; no new features
- **v1.0** (Q3 2026) — milestone-driven; ships when the milestones are met

See the [roadmap](https://0.vuetifyjs.com/roadmap) for details.

---

## FAQ

### What changes at RC?

Scope, not API. The beta froze names and signatures but still accepted additive features; the RC accepts none. Between now and v1.0 only release-blocking fixes and documentation land — the focus is testing, security review, and feedback. New features resume after v1.

### Can I use the RC in production?

Code written against the beta API ran through six beta releases and the RC without changes, and the same guarantee carries to v1: the surface is frozen and the freeze is enforced by a repository check on every pull request.

### Will the draft components ship in v1?

The ten draft components are experimental and outside the frozen surface, and each is already plotted on the public [milestones](https://github.com/vuetifyjs/0/milestones): table components in v1.1, product tours in v1.2, virtualized lists, Kanban, and OTP input in v1.3, then time and date pickers in v1.4 and v1.5. Each promotes when it meets the bar.

### Will there be breaking changes between RC and v1?

None are planned. The only thing that could force one is a critical security vulnerability with no other fix, and it would be documented in the release notes.

### Can I use Vuetify0 alongside Vuetify 4?

Yes. They don't conflict, and you can adopt v0 primitives inside a Vuetify 4 app today. Meanwhile, Vuetify 5's internals are being refactored to use v0 directly — the frozen surface is the foundation that work builds on.

### How do I report a problem or contribute?

Bug reports go through [issues.vuetifyjs.com](https://issues.vuetifyjs.com) — issues opened outside the generator are closed automatically. The [contributing guide](https://0.vuetifyjs.com/introduction/contributing) covers local setup and conventions, and [Discord](https://community.vuetifyjs.com) is the place to discuss before you build.

---

- **Documentation** — [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **Getting Started** — [Installation guide](https://0.vuetifyjs.com/introduction/getting-started)
- **GitHub** — [vuetifyjs/0](https://github.com/vuetifyjs/0)
- **Report an issue** — [issues.vuetifyjs.com](https://issues.vuetifyjs.com)
- **Contributing** — [Contributing guide](https://0.vuetifyjs.com/introduction/contributing)
- **Discord** — [community.vuetifyjs.com](https://community.vuetifyjs.com)

*Vuetify0 is part of the [Vuetify](https://vuetifyjs.com) ecosystem. Documentation is at [0.vuetifyjs.com](https://0.vuetifyjs.com); source is on [GitHub](https://github.com/vuetifyjs/0).*
