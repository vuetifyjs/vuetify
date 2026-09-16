---
layout: blog
meta:
  title: Announcing Vuetify0 1.0
  description: Vuetify0 1.0 — a headless meta-framework for Vue 3. Its foundation is now locked under semver — the logic layer plus a stable component spine.
  keywords: Vuetify0 1.0, Vuetify0 v1, headless Vue, meta-framework, composables, WAI-ARIA, semver
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# Announcing Vuetify0 1.0

I've built Vuetify0 — the framework, its documentation, and everything surrounding it — with one express intent: to take everything I've learned over a decade of building Vuetify and pour it into something that will stand the test of time. The principles and the underlying functionality that drive v0 weren't invented for this release; they were honed over ten years of Vuetify, tested against real applications, and only then extracted into a foundation you can build on directly.

Vuetify0 is 1.0. The release candidate held — the frozen surface shipped through the validation window without a breaking change — and the package is now `@vuetify/v0`, no tag required. For most projects, 1.0 is the signal that a library is safe to build on. For a framework whose job is to build other frameworks, it means something more precise: the contracts are locked.

🖊️ John Leider • 📅 July 22nd, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## Table of Contents

- [What 1.0 means](#what-1-0-means)
- [What Vuetify0 is](#what-vuetify0-is)
- [Headless, accessible by default](#headless-accessible-by-default)
- [The whole logic layer](#the-whole-logic-layer)
- [Where it sits in the stack](#where-it-sits-in-the-stack)
- [Logic without components](#logic-without-components)
- [Proven, not promised](#proven-not-promised)
- [The road to v1.x](#the-road-to-v1-x)
- [Get started](#get-started)
- [FAQ](#faq)

---

## What 1.0 means { #what-1-0-means }

I want to be precise about what shipped, because it is easy to read "1.0" as "every component is finished." Not all of them are — and for a meta-framework, that is by design.

Vuetify0 is a headless meta-framework — a logic layer you build UI libraries *on top of*. Its value is not a catalog of buttons; it is the guarantee that the primitives underneath your buttons will not move. So 1.0 is a promise about the foundation:

- **The stable set is locked under semver.** Nineteen composables, seventeen utilities, and thirteen components — the selection family, the registry, the foundation and observer primitives, the `useTheme`, `useStorage`, and `useBreakpoints` plugins, and the structural spine the rest of the library is built from (Tabs, Checkbox, Radio, Switch, the providers, and more) — carry a no-breaking-changes guarantee for the entire 1.x line. Breaking changes wait for a major.
- **The freeze is enforced mechanically.** A repository check fails any pull request that alters the public surface. The guarantee is not a promise in a blog post; it is CI.
- **The rest of the components promote individually.** Beyond that stable spine, the remaining components are `preview` and graduate onto the frozen foundation one at a time, each on its own milestone rather than gated behind a single number. Stabilizing the engine and its load-bearing components first is exactly the right order for a meta-framework — everything downstream inherits that stability.

If you have used Vuetify at any point in the last decade, you have relied on this logic without seeing it — selection, registries, focus management, theming. 1.0 is that logic, extracted, hardened, and frozen, so you can build on it directly.

![The Vuetify0 maturity matrix — 49 stable primitives across 15 categories at 1.0](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1/maturity-matrix-dark.png "The Vuetify0 maturity matrix"){ width=100% }

::: info
The [Maturity Matrix](https://0.vuetifyjs.com/roadmap#maturity-matrix) lists the current level for every component, composable, and utility.
:::

---

## What Vuetify0 is

If this is your first time hearing about it: **Vuetify0 (v0) is a headless meta-framework for Vue 3.** Logic only, zero styling. You do not install v0 to get a button — you install it to *build* the button your design system paints.

That distinction is the whole point. Most component libraries hand you finished, opinionated UI and ask you to fight the defaults when they do not fit. Most headless libraries hand you a dozen primitives and leave the rest to you. v0 aims at the layer underneath both: the complete state, accessibility, and behavior of a UI library, exposed as composables and unstyled compound components, with nothing rendered until you say so.

The acid test v0 holds itself to: strip every stylesheet from the page, and the components still work — still manage focus, still enforce selection rules, still announce their state to a screen reader. If styling is load-bearing, it is not headless.

There is no plugin to register and nothing is global. Everything is a tree-shakeable import:

```ts
import { createSelection, useBreakpoints } from '@vuetify/v0'
import { Tabs, Dialog } from '@vuetify/v0/components'
```

---

## Headless, accessible by default

Headless is not an excuse to ship less. Every v0 component is WAI-ARIA correct out of the box, SSR-safe by default, and exposes each piece of its state as a `data-*` attribute so a stylesheet — or a design system — can react to it without touching the logic.

Accessibility does not wait for a locale plugin, either. Every component ships a built-in English aria label through the locale system's `ti` method — "translate if exists" — which returns a translation when one is registered and falls back to the inline default otherwise:

```ts
const label = locale.ti('Button.label') ?? 'Button'
```

An app with no i18n configured still gets meaningful accessible names (WCAG 4.1.2), with zero locale strings bundled into the runtime. Add a locale plugin later and the same components localize with no code change. That is the pattern throughout v0: correct defaults for the beginner, full control for the framework author.

The release cycle closed with a dedicated accessibility pass — carousel autoplay that pauses on focus (WCAG 2.2.2), `aria-current` on tree items, explicit group labels on sliders and splitters, and more — so the guarantee holds in the details, not just the headline.

---

## The whole logic layer

The number that matters is not how many buttons v0 draws — it is how much of the hard logic you never have to write again. At 1.0, v0 ships **40 components, 71 composables, and 24 utilities** across fifteen categories, with ten more components already scheduled through v1.5.

Before you write custom logic, the odds are v0 already has the primitive:

| You need | Reach for |
|----------|-----------|
| Single, multi, grouped, or nested selection | `createSingle`, `createSelection`, `createGroup`, `createNested` |
| Wizard / carousel / step tracking | `createStep` |
| Form validation with async + dirty tracking | `createForm`, `createValidation` |
| Autocomplete / combobox | `createCombobox` |
| Paginated, virtualized, sortable, filterable data | `createPagination`, `createVirtual`, `createSortable`, `createFilter`, `createDataTable` |
| Floating UI — popover, tooltip, menu | `usePopover` |
| Roving tabindex / virtual focus | `useRovingFocus`, `useVirtualFocus` |
| Breakpoints, theme, RTL, locale, storage | `useBreakpoints`, `useTheme`, `useRtl`, `useLocale`, `useStorage` |

This is where "meta-framework" stops being marketing. The goal is breadth no point-solution can match — the selection, forms, data, and system primitives that every serious UI library re-implements, written once, tested once, and shared. See how that stacks up against a typical headless library in [Beyond a Component Library](https://0.vuetifyjs.com/introduction/why-vuetify0#beyond-a-component-library).

---

## Where it sits in the stack

v0 is the bottom of a three-layer stack, and each layer only depends on the one below it:

- **Vuetify0** — headless logic (this release)
- **Design systems** — Material, and the in-development Emerald, Helix, and Onyx — each a *complete framework* with its own visual language, built directly on the v0 primitives
- **Vuetify** — orchestration and the defaults system that ties it together

The clearest proof that the foundation is solid is that we are rebuilding on it ourselves. Vuetify's own internals are being refactored to consume v0 directly — the frozen 1.0 surface is exactly what that work stands on. A decade of Vuetify — 41k+ GitHub stars, millions of monthly downloads, MIT-licensed with nothing gated behind a paid tier — is being rebuilt from this layer up.

---

## Logic without components

The fastest way to understand v0 is to use a composable with nothing rendered. `createSelection` is a complete multi-selection engine — mandatory rules, batch operations, enrollment — and it does not care whether you ever draw a list:

```ts
import { createSelection } from '@vuetify/v0'

const selection = createSelection({ mandatory: true })

const home = selection.register({ value: 'home' })
const search = selection.register({ value: 'search' })

home.select()                    // ticket self-method — select this item
home.isSelected.value            // -> true
selection.selectedIds            // -> reactive Set of selected ids
selection.selectedValues.value   // -> reactive Set { 'home' }
```

When you *do* want UI, the same logic backs a headless compound component. The root owns state; the sub-components read it through context — no prop-drilling between siblings:

```html
<script setup lang="ts">
  import { Tabs } from '@vuetify/v0/components'
  import { shallowRef } from 'vue'

  const active = shallowRef('overview')
</script>

<template>
  <Tabs.Root v-model="active">
    <Tabs.List>
      <Tabs.Item value="overview">Overview</Tabs.Item>
      <Tabs.Item value="details">Details</Tabs.Item>
    </Tabs.List>
    <Tabs.Panel value="overview">Overview content</Tabs.Panel>
    <Tabs.Panel value="details">Details content</Tabs.Panel>
  </Tabs.Root>
</template>
```

Both examples run live in the docs — [createSelection](https://0.vuetifyjs.com/composables/selection/create-selection) and [Tabs](https://0.vuetifyjs.com/components/disclosure/tabs) — and every example on the site is a multi-file, copy-paste recipe you can open in the playground.

Where it gets interesting is at application scale. [DevKey](https://devkey.vuetifyjs.com), a developer API dashboard, is the reference implementation — maintained in lockstep with every release. Its dashboard is almost entirely wiring: a `Tabs` view over a data layer that is `useStorage` and nothing more, driving the components that render it.

![The DevKey dashboard — API-key management built on Vuetify0](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1/devkey-dashboard.png "DevKey — the Vuetify0 reference implementation"){ width=100% }

The code behind that view is mostly this:

```html
<script setup lang="ts">
  import { shallowRef } from 'vue'
  import { useNotifications } from '@vuetify/v0'
  import { useKeys } from './composables/useKeys' // useStorage-backed CRUD

  const tab = shallowRef('keys')
  const keys = useKeys()                  // add / remove / rotate, persisted
  const notifications = useNotifications()
  const createOpen = shallowRef(false)

  function onRotate (id: string) {
    keys.rotate(id)
    notifications.send({ subject: 'API key rotated', severity: 'success' })
  }
</script>

<template>
  <DkTabs v-model="tab" :items="[{ value: 'keys', label: 'API Keys' }, /* ... */]">
    <template #keys>
      <DkTable :items="keys.all.value" @rotate="onRotate" @revoke="keys.removeMany" />
    </template>
  </DkTabs>

  <DkCreateKeyDialog v-model="createOpen" />
</template>
```

The stable spine here — `Tabs` and the `useStorage`-backed data layer — is exactly what 1.0 freezes. The components it orchestrates (`DkTable`, the create-key dialog, the command palette) are built on preview primitives today; the data-table components promote to stable in v1.1, and the rest follow across the 1.x line. The wiring above doesn't change when they do. Build it yourself with the [DevKey integration guide](https://0.vuetifyjs.com/guide/integration/devkey).

---

## Proven, not promised

The 1.x guarantee is only worth as much as the testing behind it. Heading into 1.0:

- **6,200+ passing unit tests** across the primitives, with average coverage above 98% and 80 of them at 100%.
- **16 benchmark suites** regenerated on every release against a fixed apparatus, so regressions surface as history rather than anecdotes — `mergeDeep`, for instance, clears 1.7M+ ops/sec on a shallow merge, and a recent rewrite cut large-grid sort time by roughly 28×. The [benchmarks page](https://0.vuetifyjs.com/guide/fundamentals/benchmarks) documents the methodology and per-primitive results.
- **A dedicated security pass** hardened the composables against prototype pollution and CSS injection, and validated theme, locale, and feature-flag inputs against safe charsets.
- **100% TypeScript, zero runtime CSS.** The package ships no styles, and exports are annotated so bundlers drop anything you do not import.

v0 is also built to be understood by the tools people now build with: every documentation page has an Ask AI option, the docs publish `llms.txt` and `llms-full.txt`, and the [Vuetify MCP server](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp) wires the full API reference into your editor.

---

## The road to v1.x { #the-road-to-v1-x }

1.0 locks the engine. Everything on the roadmap from here is components promoting onto that stable foundation — and because the logic already shipped and is already frozen, each one is assembly over a proven primitive, not a rewrite. The milestones are public:

- **v1.1** — DataTable and DataGrid components over the shipped `createDataTable` and `createDataGrid`, plus the Alert component
- **v1.2** — Tour, a headless primitive for guided product tours and feature discovery
- **v1.3** — Virtualizer, Kanban, and Otp over the shipped `createVirtual`, `createKanban`, and `createOtp`
- **v1.4** — TimePicker, headless and accessible time selection
- **v1.5** — DatePicker and DateRangePicker for single dates and ranges

Beyond the components, the first design systems — Emerald and Onyx — come next, and the whole surface is authored for forward-compatibility with Vue Vapor. Track it on the [roadmap](https://0.vuetifyjs.com/roadmap) and the [milestones](https://github.com/vuetifyjs/0/milestones).

---

## Get started

```bash
pnpm install @vuetify/v0
```

No plugin to register, nothing global. Import what you need:

```ts
import { createSelection } from '@vuetify/v0'
import { Dialog } from '@vuetify/v0/components'
```

The [getting-started guide](https://0.vuetifyjs.com/introduction/getting-started) covers setup, and [Vuetify0 Skillz](https://0.vuetifyjs.com/skillz) walks through the docs, search, and examples interactively.

---

## FAQ

### Does 1.0 mean the components are stable?

The spine is. Thirteen components — the structural and selection primitives the rest of the library builds on, like Tabs, Checkbox, Radio, and Switch — are stable and semver-locked at 1.0, alongside nineteen composables and seventeen utilities. The remaining components are `preview` and promote individually as they meet the bar. For a meta-framework, the engine and its load-bearing components are what must not move first; everything downstream inherits that stability.

### Can I use it in production?

Yes. Code written against the beta API ran through six beta releases, the release candidate, and into 1.0 without changes, and the surface freeze is enforced by CI on every pull request. The stable set will not break under you within 1.x.

### Can I use Vuetify0 alongside Vuetify 4?

Yes. They do not conflict, and you can adopt v0 primitives inside a Vuetify 4 app today. Vuetify's own internals are being refactored to consume v0 directly.

### When do the draft components ship?

Each is plotted on the public [milestones](https://github.com/vuetifyjs/0/milestones): table components in v1.1, tours in v1.2, virtualized lists, Kanban, and OTP in v1.3, then time and date pickers in v1.4 and v1.5. Each promotes when it is ready.

### How do I report a problem or contribute?

Bug reports go through [issues.vuetifyjs.com](https://issues.vuetifyjs.com). The [contributing guide](https://0.vuetifyjs.com/introduction/contributing) covers local setup, and [Discord](https://community.vuetifyjs.com) is the place to discuss before you build.

---

- **Documentation** — [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **Getting Started** — [Installation guide](https://0.vuetifyjs.com/introduction/getting-started)
- **GitHub** — [vuetifyjs/0](https://github.com/vuetifyjs/0)
- **Report an issue** — [issues.vuetifyjs.com](https://issues.vuetifyjs.com)
- **Contributing** — [Contributing guide](https://0.vuetifyjs.com/introduction/contributing)
- **Discord** — [community.vuetifyjs.com](https://community.vuetifyjs.com)

*Vuetify0 is part of the [Vuetify](https://vuetifyjs.com) ecosystem. Documentation is at [0.vuetifyjs.com](https://0.vuetifyjs.com); source is on [GitHub](https://github.com/vuetifyjs/0).*
