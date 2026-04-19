---
layout: blog
meta:
  title: Announcing the Vuetify0 Alpha
  description: The Vuetify0 alpha is here — a headless Vue framework with 46 components, 63 composables, first-class AI integration, and an adapter-based plugin system. 100% TypeScript, 0 styles, built for building UI libraries.
  keywords: Vuetify0 alpha, headless Vue, Vue component library, AI-native framework, TypeScript components, Vuetify MCP
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const paperlogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vpaper-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# Announcing the Vuetify0 Alpha

**The foundation of the next generation of Vuetify is here.** Vuetify0 is a headless Vue framework — 100% TypeScript, zero styles, built from the ground up to power custom UI libraries, design systems, and the Vuetify ecosystem itself. Today we're releasing the first public alpha.

🖊️ John Leider • 📅 April 7th, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## What is Vuetify0?

Vuetify0 is not a component library — it's a **meta-framework for building component libraries**. Every component is a standard Vue SFC using the latest macros (`defineModel`, `defineSlots`, generics). Every composable is a pure TypeScript function. Nothing ships with styles, opinions about your CSS framework, or assumptions about your design language.

The primitives handle the hard parts — accessibility, keyboard navigation, focus management, state coordination, form validation — so you can focus on what makes your library yours: the design.

```html { resource="src/components/MyButton.vue" }
<script setup lang="ts">
  import { Button } from '@vuetify/v0'
</script>

<template>
  <Button.Root class="my-button">
    <Button.Content>
      <slot />
    </Button.Content>

    <Button.Loading>
      <span class="my-button__spinner" />
    </Button.Loading>
  </Button.Root>
</template>

<style scoped>
  /* ... */
</style>
```

You bring the styles. Vuetify0 brings everything else.

---

## What's in the Alpha

The alpha ships with **46 components** and **63 composables** across three maturity levels:

| Maturity | Components | Composables | What it means |
|----------|-----------|-------------|---------------|
| **Stable** | 0 | 6 | API locked, production-ready |
| **Preview** | 34 | 54 | Implemented, API may change |
| **Draft** | 13 | 3 | Planned or in early development |

::: success
See the full breakdown on the [Maturity Matrix](https://0.vuetifyjs.com/roadmap#maturity-matrix) — every component and composable with its current stability level.
:::

**Components** span six categories — every one headless, accessible, and keyboard-navigable out of the box:

- **Forms** — [Input](https://0.vuetifyjs.com/components/forms/input), [Select](https://0.vuetifyjs.com/components/forms/select), [Combobox](https://0.vuetifyjs.com/components/forms/combobox), [Checkbox](https://0.vuetifyjs.com/components/forms/checkbox), [Radio](https://0.vuetifyjs.com/components/forms/radio), [Switch](https://0.vuetifyjs.com/components/forms/switch), [Slider](https://0.vuetifyjs.com/components/forms/slider), [Rating](https://0.vuetifyjs.com/components/forms/rating)
- **Disclosure** — [Dialog](https://0.vuetifyjs.com/components/disclosure/dialog), [Popover](https://0.vuetifyjs.com/components/disclosure/popover), [Tabs](https://0.vuetifyjs.com/components/disclosure/tabs), [Collapsible](https://0.vuetifyjs.com/components/disclosure/collapsible), [ExpansionPanel](https://0.vuetifyjs.com/components/disclosure/expansion-panel), [Treeview](https://0.vuetifyjs.com/components/disclosure/treeview)
- **Navigation** — [Breadcrumbs](https://0.vuetifyjs.com/components/semantic/breadcrumbs), [Pagination](https://0.vuetifyjs.com/components/semantic/pagination)
- **Layout** — [Splitter](https://0.vuetifyjs.com/components/semantic/splitter)
- **Feedback** — [Snackbar](https://0.vuetifyjs.com/components/semantic/snackbar)
- **Primitives** — [Atom](https://0.vuetifyjs.com/components/primitives/atom), [Portal](https://0.vuetifyjs.com/components/primitives/portal), [Presence](https://0.vuetifyjs.com/components/primitives/presence)

[Browse all components](https://0.vuetifyjs.com/components).

**Composables** go even deeper:

- **Selection** — [single](https://0.vuetifyjs.com/composables/selection/create-single), [multi](https://0.vuetifyjs.com/composables/selection/create-group), [grouped](https://0.vuetifyjs.com/composables/selection/create-selection), [stepped](https://0.vuetifyjs.com/composables/selection/create-step), [nested](https://0.vuetifyjs.com/composables/selection/create-nested)
- **Data** — [filtering](https://0.vuetifyjs.com/composables/data/create-filter), [pagination](https://0.vuetifyjs.com/composables/data/create-pagination), [virtual scrolling](https://0.vuetifyjs.com/composables/data/create-virtual), [data tables](https://0.vuetifyjs.com/composables/data/create-data-table)
- **Forms** — [validation](https://0.vuetifyjs.com/composables/forms/create-validation) with Standard Schema support, [form coordination](https://0.vuetifyjs.com/composables/forms/create-form), [rules engine](https://0.vuetifyjs.com/composables/plugins/use-rules)
- **Plugins** — [theme](https://0.vuetifyjs.com/composables/plugins/use-theme), [locale](https://0.vuetifyjs.com/composables/plugins/use-locale), [breakpoints](https://0.vuetifyjs.com/composables/plugins/use-breakpoints), [features](https://0.vuetifyjs.com/composables/plugins/use-features), [permissions](https://0.vuetifyjs.com/composables/plugins/use-permissions), [logger](https://0.vuetifyjs.com/composables/plugins/use-logger), [storage](https://0.vuetifyjs.com/composables/plugins/use-storage), [notifications](https://0.vuetifyjs.com/composables/plugins/use-notifications)
- **Browser** — [observers](https://0.vuetifyjs.com/composables/system/use-resize-observer), [event listeners](https://0.vuetifyjs.com/composables/system/use-event-listener), [hotkeys](https://0.vuetifyjs.com/composables/system/use-hotkey), [media queries](https://0.vuetifyjs.com/composables/system/use-media-query)

---

## Built for AI

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

Vuetify0 is the first Vue framework designed from day one to be consumed by AI agents.

Every documentation page includes **Ask AI** — ask a question about any component or composable and get an answer grounded in the actual source code and API reference. The docs ship with `llms.txt` and `llms-full.txt` files for direct LLM consumption, plus `SKILL.md` files that let AI agents discover and use Vuetify0 capabilities automatically.

The [Vuetify MCP server](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp) connects your IDE to the full documentation and API surface. Use it with Claude, Cursor, Copilot, or any MCP-compatible tool to get context-aware assistance while you build.

::: info
**Try Vuetify0 with Claude.** Our [Vuetify MCP guide](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp#claude-code) walks you through connecting Vuetify MCP to your development environment.
:::

---

## Progressive Enhancement

Vuetify0's plugin system follows a simple principle: **only take what you use**. Every plugin is optional and tree-shakeable. A minimal setup might use nothing at all — just import components and composables directly. As your needs grow, add plugins:

```ts
import { createApp } from 'vue'
import {
  createBreakpointsPlugin,
  createThemePlugin,
  createLocalePlugin,
  createStoragePlugin,
} from '@vuetify/v0'

const app = createApp(App)

// Add only what you need
app.use(createThemePlugin({ default: 'light', themes: { light, dark } }))
app.use(createBreakpointsPlugin())
app.use(createLocalePlugin({ default: 'en', messages: { en, es } }))
app.use(createStoragePlugin())
```

Available plugins include `useTheme`, `useLocale`, `useBreakpoints`, `useFeatures`, `usePermissions`, `useLogger`, `useStorage`, `useNotifications`, `useRules`, `useRtl`, and `useStack`. Each one follows the same pattern: install the plugin to provide app-wide context, or use the `create*` factory for scoped instances in component subtrees. [Browse all composables](https://0.vuetifyjs.com/composables).

---

## Adapter-Based Architecture

Most plugins accept **adapters** — swappable implementations that let you plug in the tools you already use. Vuetify0 ships with sensible defaults, but you're never locked in.

```ts { resource="src/plugins/vuetify0.ts" }
import { createLocalePlugin } from '@vuetify/v0'
import { VueI18nLocaleAdapter } from '@vuetify/v0/locale/adapters/vue-i18n'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({ locale: 'en', messages: { en, es } })

app.use(
  createLocalePlugin({
    adapter: new VueI18nLocaleAdapter({ i18n }),
  })
)
```

The adapter pattern extends across the framework:

| Plugin | Default | Third-party adapters |
|--------|---------|---------------------|
| Logger | Console | Pino, Consola |
| Locale | Built-in | VueI18n |
| Date | Built-in | Custom (implement DateAdapter) |
| Features | Built-in | LaunchDarkly, Flagsmith, PostHog |
| Notifications | Built-in | Knock, Novu |
| Validation | Built-in | Standard Schema (Zod, Valibot, ArkType) |
| Storage | localStorage | sessionStorage, memory |
| Theme | CSS variables | Unhead (SSR) |

Write your own adapter by implementing a single interface. The framework handles the rest.

---

## Performance

Performance was a priority from the start, not an afterthought. Every composable is independently importable and tree-shakeable. There is no runtime CSS — your bundle includes exactly the JavaScript you use and nothing else.

Components use lazy mounting (`usePresence`, `useLazy`) so dialogs, popovers, and menus don't render their content until they're opened. Observer composables (`useResizeObserver`, `useIntersectionObserver`, `useMutationObserver`) clean up automatically on scope disposal.

The registry system — the foundation of every stateful composable — uses cached iterations and batched mutations to minimize reactive overhead. Performance-critical paths include benchmarks (`*.bench.ts`) tracked across releases.

::: info
**Want the numbers?** Check out our [benchmarks page](https://0.vuetifyjs.com/guide/fundamentals/benchmarks) for detailed performance testing guidelines and results.
:::

---

## Documentation

The documentation at [0.vuetifyjs.com](https://0.vuetifyjs.com) is designed to be the most complete documentation experience available.

- **Live examples** on every component and composable page with full source code
- **Auto-generated API reference** extracted directly from TypeScript source — always accurate, never stale
- **Ask AI** on every page — ask questions grounded in the actual docs and source
- **Skill-based filtering** — pages are tagged beginner, intermediate, or advanced so you see content matched to your experience
- **Personalized documentation** — the [Vuetify CLI](https://github.com/vuetifyjs/cli) generates docs context tailored to your project's installed plugins and components

---

## Ecosystem

Vuetify0 works with the tools the Vuetify community already uses:

- **[Vuetify CLI](https://github.com/vuetifyjs/cli)** — Scaffold new projects, generate components, and get personalized documentation based on your project setup
- **[Vuetify Play](https://vtfy.link/vuetify0-play)** — Try components and composables in the browser without installing anything
- **[Vuetify0 Play](https://v0play.vuetifyjs.com)** (beta) — Vuetify Play built entirely with Vuetify0
- **[Vuetify MCP](https://mcp.vuetifyjs.com)** — Connect your IDE to the full Vuetify0 API surface for context-aware AI assistance

---

## Road to v1

Today's alpha is the first milestone on the path to a stable release:

- **Alpha** (April 7, 2026) — Open for feedback, APIs mostly stable, expect minor breaking changes
- **Beta** (June 2026) — API freeze, stability and performance focus
- **v1.0** (July 2026) — Stable release

See the full [roadmap](https://0.vuetifyjs.com/roadmap) for milestone details and timelines.

<AppFigure :src="paperlogo" alt="Vuetify Paper logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Paper Logo" />

After v1, the next chapter is **[Vuetify Paper](https://github.com/vuetifyjs/0/tree/master/packages/paper)**: complete design systems built on Vuetify0. Paper design systems recreate popular design languages as ready-to-use component libraries powered by v0's headless primitives. We're starting with two original design systems, **Emerald** and **Onyx**, with recreations of well-known design systems to follow.

Vuetify0 is the result of over a decade of building component frameworks and learning what works. It's already being integrated into the core Vuetify framework, quietly powering the next generation from the inside out. The alpha is live. [Go break things](https://0.vuetifyjs.com/introduction/getting-started).

::: info
**Considering building with Vuetify0?** We'd love to hear about your use case. [Get in touch](https://vuetifyjs.com/introduction/enterprise-support/) about enterprise support and consulting.
:::

---

## Let's Build Something

Enough about what Vuetify0 *can* do — let's see it in action. We're going to build **DevKey**, a developer API dashboard, as a reusable UI library. Three pages, ten components, one composite component that ties it all together.

By the end, you'll have a publishable package that any Vue app can install and use. The full source is on GitHub: [vuetifyjs/devkey](https://github.com/vuetifyjs/devkey).

> This guide uses plain CSS for styling. Vuetify0 works great with [UnoCSS, Tailwind, or any CSS approach](https://0.vuetifyjs.com/guide/fundamentals/styling) you prefer.

### Project Setup

First, install the alpha:

::: tabs

```bash [pnpm]
pnpm add @vuetify/v0
```

```bash [npm]
npm install @vuetify/v0
```

```bash [yarn]
yarn add @vuetify/v0
```

```bash [bun]
bun add @vuetify/v0
```

:::

Then create a plugin file that registers the v0 plugins we'll use throughout the project:

```ts { resource="src/plugins/devkey.ts" }
import {
  createBreakpointsPlugin,
  createPermissionsPlugin,
  createRulesPlugin,
} from '@vuetify/v0'
import type { App } from 'vue'

export default function devkey (app: App) {
  app.use(
    createPermissionsPlugin({
      permissions: {
        admin: [['manage', '*']],
        developer: [['read', 'keys'], ['create', 'keys']],
        viewer: [['read', 'keys']],
      },
    })
  )

  app.use(
    createRulesPlugin({
      aliases: {
        required: v => !!v || 'Required',
        email: v => /.+@.+\..+/.test(String(v)) || 'Invalid email',
      },
    })
  )

  app.use(createBreakpointsPlugin())
}
```

The theme is configured separately in its own plugin file, using the `V0StyleSheetThemeAdapter` to generate CSS custom properties with a `v0-theme` prefix:

```ts { resource="src/plugins/vuetify.ts" }
import { createThemePlugin, V0StyleSheetThemeAdapter } from '@vuetify/v0'

export default createThemePlugin({
  default: 'dark',
  target: 'html',
  adapter: new V0StyleSheetThemeAdapter({ prefix: 'v0-theme' }),
  themes: {
    dark: {
      dark: true,
      colors: {
        'primary': '#818cf8',
        'secondary': '#fbbf24',
        'error': '#f87171',
        'info': '#38bdf8',
        'success': '#4ade80',
        'warning': '#fb923c',
        'background': '#18181b',
        'surface': '#1f1f23',
        'surface-tint': '#2a2a2a',
        'surface-variant': '#1e1e1e',
        'text': '#f1f5f9',
        'muted': '#94a3b8',
        'border': '#2e2e32',
        'divider': '#404040',
        'on-primary': '#1a1a1a',
        'on-secondary': '#1a1a1a',
        'on-error': '#1a1a1a',
        'on-info': '#1a1a1a',
        'on-success': '#1a1a1a',
        'on-warning': '#1a1a1a',
        'on-background': '#e0e0e0',
        'on-surface': '#e0e0e0',
        'on-surface-variant': '#a0a0a0',
      },
    },
  },
})
```

And wire it into your app entry:

```ts { resource="src/main.ts" }
import { createApp } from 'vue'
import devkey from './plugins/devkey'
import vuetify from './plugins/vuetify'
import App from './App.vue'

const app = createApp(App)
devkey(app)
app.use(vuetify)
app.mount('#app')
```

Four plugins across two files, each doing one job: `createPermissionsPlugin` sets up RBAC so we can gate dashboard actions by role, `createRulesPlugin` registers validation rule aliases so our form fields can use `'required'` and `'email'` by name, `createThemePlugin` with `V0StyleSheetThemeAdapter` provides DevKey's color tokens as CSS variables (`var(--v0-theme-primary)`, `var(--v0-theme-on-primary)`, etc.), and `createBreakpointsPlugin` gives us reactive viewport detection for the responsive dashboard layout.

Here's what we're building:

**Components:**

| Component | Wraps | Description |
|-----------|-------|-------------|
| `DkButton` | [Button](https://0.vuetifyjs.com/components/actions/button) | Styled button with variants |
| `DkInput` | [Input](https://0.vuetifyjs.com/components/forms/input) | Form field with label and errors |
| `DkCard` | [Atom](https://0.vuetifyjs.com/components/primitives/atom) | Content container |
| `DkToggle` | [Single](https://0.vuetifyjs.com/components/providers/single) | Option switcher |
| `DkTabs` | [Tabs](https://0.vuetifyjs.com/components/disclosure/tabs) | Tab navigation |
| `DkTable` | [createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table) | Filterable, paginated table |
| `DkCollapsible` | [Collapsible](https://0.vuetifyjs.com/components/disclosure/collapsible) | Expandable section |
| `DkLayout` | [useBreakpoints](https://0.vuetifyjs.com/composables/plugins/use-breakpoints) | Responsive shell |
| `DkCommandPalette` | [Dialog](https://0.vuetifyjs.com/components/disclosure/dialog) + [Input](https://0.vuetifyjs.com/components/forms/input) + [createFilter](https://0.vuetifyjs.com/composables/data/create-filter) + [useHotkey](https://0.vuetifyjs.com/composables/system/use-hotkey) + [useVirtualFocus](https://0.vuetifyjs.com/composables/system/use-virtual-focus) | `Cmd+K` search overlay with keyboard navigation |

**Plugins:**

| Plugin | Purpose |
|--------|---------|
| [createThemePlugin](https://0.vuetifyjs.com/composables/plugins/use-theme) | Dark theme with V0StyleSheetThemeAdapter for CSS custom properties |
| [createBreakpointsPlugin](https://0.vuetifyjs.com/composables/plugins/use-breakpoints) | Reactive viewport detection for responsive layout |
| [createPermissionsPlugin](https://0.vuetifyjs.com/composables/plugins/use-permissions) | RBAC to gate dashboard actions by role |
| [createRulesPlugin](https://0.vuetifyjs.com/composables/plugins/use-rules) | Built-in validation rules (required, email, minLength) |

---

## Part 1: Landing Page

The landing page introduces two core patterns in v0:

- **[Button](https://0.vuetifyjs.com/components/actions/button)** uses a compound component pattern — `Button.Root` handles state (loading, disabled, ARIA), `Button.Content` and `Button.Loading` swap visibility automatically. You style the root, v0 handles the behavior.
- **[Single](https://0.vuetifyjs.com/components/providers/single)** manages single-selection state. `Single.Root` provides the context, `Single.Item` exposes `isSelected` and `toggle` — perfect for our pricing interval toggle. No state management code needed.

Both patterns show up everywhere in v0: compound components for structure, provider components for state. Once you learn one, you know them all. We'll build `DkButton`, `DkCard`, `DkToggle`, and `DkLayout`.

![DevKey Landing Page](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-alpha/landing.png "DevKey Landing Page")

### DkButton

Our first component wraps Vuetify0's [Button](https://0.vuetifyjs.com/components/actions/button) with DevKey's visual style. Button uses a compound component pattern — `Button.Root` handles all the state (loading, disabled, selected, ARIA), and we style on top:

```html { resource="src/components/DkButton.vue" }
<script setup lang="ts">
  import { Button } from '@vuetify/v0'

  defineOptions({ name: 'DkButton' })

  const { variant = 'solid', size = 'md', loading = false, disabled = false } = defineProps<{
    variant?: 'solid' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
  }>()
</script>

<template>
  <Button.Root
    class="dk-button"
    :loading="loading"
    :disabled="disabled"
    :data-variant="variant"
    :data-size="size"
  >
    <Button.Content>
      <slot />
    </Button.Content>

    <Button.Loading>
      <svg class="dk-button__spinner" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-dasharray="32"
          stroke-linecap="round"
        />
      </svg>
    </Button.Loading>
  </Button.Root>
</template>

<style>
  .dk-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .dk-button[data-variant="solid"] {
    background: var(--v0-theme-primary);
    color: var(--v0-theme-on-primary);
    border: none;
  }

  .dk-button[data-variant="outline"] {
    background: transparent;
    color: var(--v0-theme-primary);
    border: 1px solid var(--v0-theme-primary);
  }

  .dk-button[data-variant="ghost"] {
    background: transparent;
    color: var(--v0-theme-text);
    border: none;
  }

  .dk-button[data-size="sm"] {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }

  .dk-button[data-size="md"] {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .dk-button[data-size="lg"] {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }

  .dk-button[data-disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .dk-button[data-loading] {
    pointer-events: none;
    cursor: default;
  }

  .dk-button__spinner {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 1em;
    height: 1em;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
```

Notice what we *didn't* write: loading state management, disabled coordination, toggle group support, or grace period timing. `Button.Root` handles all of that — we just pass `loading` and `disabled` props through. `Button.Content` renders when the button isn't loading, and `Button.Loading` renders when it is — with an absolutely positioned spinner overlay and `[data-loading]` disabling pointer events. We just add our styles on top.

### DkToggle — Pricing Interval Switcher

The pricing section needs a toggle between monthly and yearly. We use [Single](https://0.vuetifyjs.com/components/providers/single) for single-selection state — `Single.Root` provides the context, and `Single.Item` exposes `isSelected` and `toggle` for each option:

```html { resource="src/components/DkToggle.vue" }
<script setup lang="ts">
  import { Single } from '@vuetify/v0'

  defineOptions({ name: 'DkToggle' })

  const model = defineModel<string>()

  const { options } = defineProps<{
    options: Array<{ value: string, label: string }>
  }>()
</script>

<template>
  <Single.Root v-model="model" mandatory>
    <div class="dk-toggle">
      <Single.Item
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        v-slot="{ isSelected, toggle }"
      >
        <button
          class="dk-toggle__option"
          :data-active="isSelected || undefined"
          @click="toggle"
        >
          {{ option.label }}
        </button>
      </Single.Item>
    </div>
  </Single.Root>
</template>

<style scoped>
  .dk-toggle {
    display: inline-flex;
    background: var(--v0-theme-border);
    border-radius: 0.5rem;
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .dk-toggle__option {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--v0-theme-muted);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .dk-toggle__option[data-active] {
    background: var(--v0-theme-surface);
    color: var(--v0-theme-text);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>
```

The `mandatory` prop on `Single.Root` ensures something is always selected. The `isSelected` and `toggle` slot props from `Single.Item` give us everything we need to render the active state and handle clicks. Zero state management code in our component.

---

## Part 2: Login Page

The login page is where Vuetify0's form system shines. Three composables work together here:

- **[Form](https://0.vuetifyjs.com/components/forms/form)** coordinates validation across all fields. When the form submits, it validates every registered input and reports whether the form is valid.
- **[Input](https://0.vuetifyjs.com/components/forms/input)** handles individual field state — value binding, validation errors, ARIA attributes, dirty/pristine tracking — through a compound component pattern (`Input.Root`, `Input.Control`, `Input.Description`, `Input.Error`).
- **[createRulesPlugin](https://0.vuetifyjs.com/composables/plugins/use-rules)** provides named rule aliases. In our plugin setup we registered `'required'` and `'email'` — now any `Input.Root` with `:rules="['required', 'email']"` resolves those aliases automatically. You can mix aliases with inline functions for custom validation.

We'll build `DkInput` — a styled wrapper around Input — and assemble the login page.

![DevKey Login Page](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-alpha/login.png "DevKey Login Page")

### DkInput

Wrapping Vuetify0's [Input](https://0.vuetifyjs.com/components/forms/input) compound component. `Input.Root` handles validation, ARIA attributes, and field state. `Input.Control` renders the native `<input>`. `Input.Description` and `Input.Error` are automatically wired to `aria-describedby` and `aria-errormessage`:

```html { resource="src/components/DkInput.vue" }
<script setup lang="ts">
  import { Input } from '@vuetify/v0'
  import type { RuleInput } from '@vuetify/v0'

  defineOptions({ name: 'DkInput' })

  const { label, description, type = 'text', placeholder, rules } = defineProps<{
    label?: string
    description?: string
    type?: string
    placeholder?: string
    rules?: RuleInput[]
  }>()

  const model = defineModel<string>({ default: '' })
</script>

<template>
  <Input.Root
    v-model="model"
    :label="label"
    :type="type"
    :rules="rules"
    v-slot="{ isValid }"
  >
    <div class="dk-input" :data-error="isValid === false || undefined">
      <label v-if="label" class="dk-input__label">
        {{ label }}
      </label>

      <Input.Control
        class="dk-input__control"
        :placeholder="placeholder"
      />

      <Input.Description v-if="description && isValid !== false" class="dk-input__description">
        {{ description }}
      </Input.Description>

      <Input.Error v-slot="{ errors: messages }">
        <span
          v-if="messages.length"
          class="dk-input__error"
        >
          {{ messages[0] }}
        </span>
      </Input.Error>
    </div>
  </Input.Root>
</template>

<style scoped>
  .dk-input {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .dk-input__label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--v0-theme-text);
  }

  .dk-input__control {
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--v0-theme-border);
    border-radius: 0.5rem;
    background: var(--v0-theme-surface);
    color: var(--v0-theme-text);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.15s ease;
  }

  .dk-input__control:focus {
    border-color: var(--v0-theme-primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--v0-theme-primary) 20%, transparent);
  }

  .dk-input[data-error] .dk-input__control {
    border-color: var(--v0-theme-error);
  }

  .dk-input__description {
    font-size: 0.8125rem;
    color: var(--v0-theme-muted);
  }

  .dk-input__error {
    font-size: 0.8125rem;
    color: var(--v0-theme-error);
  }
</style>
```

### Login Page Assembly

Now we compose the login page using Vuetify0's [Form](https://0.vuetifyjs.com/components/forms/form) component. Form coordinates all child validations automatically — the `submit` slot prop is a function that validates every registered field and returns a boolean. We pass it to our `onSubmit` handler via `@click="onSubmit(submit)"`, which manages the loading state with a try/finally pattern. The `:rules` prop on `DkInput` accepts both string aliases (`'required'`, `'email'`) from the [rules plugin](https://0.vuetifyjs.com/composables/plugins/use-rules) and inline functions:

```html { resource="src/pages/LoginPage.vue" }
<script setup lang="ts">
  import { Form } from '@vuetify/v0'
  import { shallowRef } from 'vue'
  import { useRouter } from 'vue-router'
  import DkButton from '../components/DkButton.vue'
  import DkInput from '../components/DkInput.vue'
  import DkCard from '../components/DkCard.vue'

  defineOptions({ name: 'DkLoginPage' })

  const router = useRouter()
  const email = shallowRef('')
  const password = shallowRef('')
  const loading = shallowRef(false)

  async function onSubmit (submit: () => Promise<boolean>) {
    loading.value = true
    const valid = await submit()

    if (!valid) {
      loading.value = false
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard')
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="dk-login">
    <DkCard class="dk-login__card">
      <h1 class="dk-login__title">Sign in to DevKey</h1>
      <p class="dk-login__subtitle">Enter your credentials to access the dashboard</p>

      <Form class="dk-login__form" v-slot="{ submit, isValid, isValidating }">
          <DkInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            :rules="['required', 'email']"
          />

          <DkInput
            v-model="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            :rules="['required', (v: unknown) => (v as string).length >= 8 || 'Must be at least 8 characters']"
          />

          <DkButton
            :loading="loading || isValidating"
            :disabled="isValid === false"
            variant="solid"
            size="lg"
            @click="onSubmit(submit)"
          >
            Sign In
          </DkButton>
      </Form>
    </DkCard>
  </div>
</template>

<style scoped>
  .dk-login {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: var(--v0-theme-background);
  }

  .dk-login__card {
    max-width: 420px;
    width: 100%;
    padding: 2rem;
  }

  .dk-login__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--v0-theme-text);
  }

  .dk-login__subtitle {
    color: var(--v0-theme-muted);
    margin-bottom: 1.5rem;
  }

  .dk-login__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
```

---

## Part 3: Dashboard

This is where v0 really shows its depth. The dashboard composes more primitives than the previous two pages combined, and demonstrates how they stay out of each other's way:

- **[createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table)** handles the API key list — filtering, pagination, and column definitions in a single composable. We wire a search input to its `search()` method and let it manage the data pipeline.
- **[useBreakpoints](https://0.vuetifyjs.com/composables/plugins/use-breakpoints)** powers the responsive layout — sidebar visible on desktop, hidden on mobile — through the plugin we registered earlier.
- **The command palette** is the showcase piece: five v0 primitives ([Dialog](https://0.vuetifyjs.com/components/disclosure/dialog), [Input](https://0.vuetifyjs.com/components/forms/input), [createFilter](https://0.vuetifyjs.com/composables/data/create-filter), [useHotkey](https://0.vuetifyjs.com/composables/system/use-hotkey), [useVirtualFocus](https://0.vuetifyjs.com/composables/system/use-virtual-focus)) composed into a single interaction.

![DevKey Dashboard](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-alpha/dashboard.png "DevKey Dashboard")

### DkTable — API Key Management

The API key table uses [createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table), which composes filtering, pagination, and sorting into a single reactive state:

```html { resource="src/components/DkTable.vue" }
<script setup lang="ts">
  import { createDataTable } from '@vuetify/v0'
  import { shallowRef, watch } from 'vue'
  import DkInput from './DkInput.vue'

  defineOptions({ name: 'DkTable' })

  interface ApiKey {
    id: string
    name: string
    key: string
    created: string
    lastUsed: string
    [key: string]: unknown
  }

  const { items } = defineProps<{
    items: ApiKey[]
  }>()

  const query = shallowRef('')

  const { items: rows, pagination, search } = createDataTable({
    items: () => items,
    pagination: { itemsPerPage: 10 },
    columns: [
      { key: 'name', title: 'Name' },
      { key: 'key', title: 'API Key' },
      { key: 'created', title: 'Created' },
      { key: 'lastUsed', title: 'Last Used' },
    ],
  })

  watch(query, v => search(v))
</script>

<template>
  <div class="dk-table">
    <div class="dk-table__toolbar">
      <DkInput v-model="query" placeholder="Search keys..." />
    </div>

    <table class="dk-table__grid">
      <thead>
        <tr>
          <th>Name</th>
          <th>API Key</th>
          <th>Created</th>
          <th>Last Used</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in (rows as unknown as ApiKey[])" :key="row.id">
          <td>{{ row.name }}</td>
          <td><code>{{ row.key }}</code></td>
          <td>{{ row.created }}</td>
          <td>{{ row.lastUsed }}</td>
        </tr>
      </tbody>
    </table>

    <div class="dk-table__footer">
      <span>Page {{ pagination.page.value }} of {{ pagination.pages }}</span>
      <div class="dk-table__nav">
        <button :disabled="pagination.page.value <= 1" @click="pagination.prev()">Prev</button>
        <button :disabled="pagination.page.value >= pagination.pages" @click="pagination.next()">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dk-table {
    border: 1px solid var(--v0-theme-border);
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .dk-table__toolbar {
    padding: 1rem;
    border-bottom: 1px solid var(--v0-theme-border);
  }

  .dk-table__grid {
    width: 100%;
    border-collapse: collapse;
  }

  .dk-table__grid th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.8125rem;
    color: var(--v0-theme-muted);
    font-weight: 600;
    border-bottom: 1px solid var(--v0-theme-border);
  }

  .dk-table__grid td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--v0-theme-border);
    color: var(--v0-theme-text);
  }

  .dk-table__grid code {
    font-size: 0.8125rem;
    background: var(--v0-theme-background);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
  }

  .dk-table__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: var(--v0-theme-muted);
  }

  .dk-table__nav {
    display: flex;
    gap: 0.5rem;
  }

  .dk-table__nav button {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--v0-theme-border);
    border-radius: 0.375rem;
    background: var(--v0-theme-surface);
    cursor: pointer;
  }

  .dk-table__nav button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

The `createDataTable` composable handles all the data wrangling — filtering rows by the search query, computing page counts, slicing the visible rows — while our component handles only the rendering.

### DkCommandPalette — The Showcase

This is the component that shows what composing Vuetify0 primitives really looks like. A `Cmd+K` command palette that combines five v0 primitives into a single, polished interaction:

- [Dialog](https://0.vuetifyjs.com/components/disclosure/dialog) — modal overlay with focus trapping
- [Input](https://0.vuetifyjs.com/components/forms/input) — search field with ARIA
- [createFilter](https://0.vuetifyjs.com/composables/data/create-filter) — live filtering
- [useHotkey](https://0.vuetifyjs.com/composables/system/use-hotkey) — `Cmd+K` activation
- [useVirtualFocus](https://0.vuetifyjs.com/composables/system/use-virtual-focus) — keyboard navigation with `scrollIntoView`

```html { resource="src/components/DkCommandPalette.vue" }
<script setup lang="ts">
  import { Dialog, Input, createFilter, useHotkey, useVirtualFocus } from '@vuetify/v0'
  import { useTemplateRef, shallowRef, computed, watch } from 'vue'

  defineOptions({ name: 'DkCommandPalette' })

  interface Command extends Record<string, unknown> {
    id: string
    label: string
    group: string
    action: () => void
  }

  const { commands } = defineProps<{
    commands: Command[]
  }>()

  const open = defineModel<boolean>({ default: false })
  const query = shallowRef('')
  const search = useTemplateRef<HTMLInputElement>('search')

  // Cmd+K to open
  useHotkey('cmd+k', () => {
    open.value = true
    query.value = ''
  })

  // Filter commands by search query
  const filter = createFilter({ keys: ['label'] })
  const { items: filtered } = filter.apply(query, () => commands)

  // Group filtered results
  const groups = computed(() => {
    const map = new Map<string, Command[]>()
    for (const cmd of filtered.value as Command[]) {
      const group = map.get(cmd.group) ?? []
      group.push(cmd)
      map.set(cmd.group, group)
    }
    return map
  })

  // Keyboard navigation through results
  const { highlightedId, onKeydown } = useVirtualFocus(
    () => (filtered.value as Command[]).map(cmd => ({ id: cmd.id })),
    { control: search },
  )

  // Scroll highlighted item into view
  watch(highlightedId, id => {
    if (!id) return
    document.getElementById(String(id))?.scrollIntoView({ block: 'nearest' })
  })

  // Enter key runs the highlighted command
  function onEnter (e: KeyboardEvent) {
    if (e.key === 'Enter' && highlightedId.value) {
      const cmd = (filtered.value as Command[]).find(c => c.id === highlightedId.value)
      if (cmd) onRun(cmd)
    }
  }

  function onRun (cmd: Command) {
    cmd.action()
    open.value = false
  }
</script>

<template>
  <Dialog.Root v-model="open">
    <Dialog.Content class="dk-palette" @keydown="onEnter">
      <Input.Root v-model="query">
        <Input.Control renderless v-slot="{ attrs }">
          <input
            ref="search"
            v-bind="attrs"
            class="dk-palette__search"
            placeholder="Search commands..."
          >
        </Input.Control>
      </Input.Root>

      <div class="dk-palette__results">
        <div
          v-for="[group, items] in groups"
          :key="group"
        >
          <div class="dk-palette__group">
            {{ group }}
          </div>

          <div>
            <button
              v-for="cmd in items"
              :id="cmd.id"
              :key="cmd.id"
              class="dk-palette__item"
              :data-active="highlightedId === cmd.id || undefined"
              @click="onRun(cmd)"
            >
              {{ cmd.label }}
            </button>
          </div>
        </div>

        <p v-if="filtered.length === 0" class="dk-palette__empty">
          No results for "{{ query }}"
        </p>
      </div>
    </Dialog.Content>
  </Dialog.Root>
</template>

<style>
  .dk-palette {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 560px;
    background: var(--v0-theme-surface);
    border: 1px solid var(--v0-theme-border);
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .dk-palette__search {
    width: 100%;
    padding: 1rem;
    border: none;
    border-bottom: 1px solid var(--v0-theme-border);
    background: transparent;
    color: var(--v0-theme-text);
    font-size: 1rem;
    outline: none;
  }

  .dk-palette__results {
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .dk-palette__group {
    display: block;
    width: 100%;
    padding: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--v0-theme-muted);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
  }

  .dk-palette__item {
    display: block;
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
    background: transparent;
    color: var(--v0-theme-text);
    font-size: 0.9375rem;
    text-align: left;
    cursor: pointer;
  }

  .dk-palette__item:hover,
  .dk-palette__item[data-active] {
    background: var(--v0-theme-background);
  }

  .dk-palette__empty {
    padding: 2rem;
    text-align: center;
    color: var(--v0-theme-muted);
  }
</style>
```

That's roughly 100 lines of template and script for a fully functional command palette with keyboard navigation, live filtering, grouped results, and a hotkey trigger. Five Vuetify0 primitives, each doing one thing well, composed into something greater than the sum of its parts.

<!-- TODO: Build DkCommandPalette and report the gzipped bundle size here. We're already touting the low line count — showing the built size would reinforce the performance story. -->

![DevKey Command Palette](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-alpha/command-palette.png "DevKey Command Palette")

---

## Ship It

The full DevKey source is on GitHub: [vuetifyjs/devkey](https://github.com/vuetifyjs/devkey). Clone it, run `pnpm dev`, and you have a working app.

To deploy to production, build the project and preview it locally:

::: tabs

```bash [pnpm]
pnpm build
npx http-server dist
```

```bash [npm]
npm run build
npx http-server dist
```

```bash [yarn]
yarn build
npx http-server dist
```

```bash [bun]
bun run build
bunx http-server dist
```

:::

The `dist/` directory contains everything you need. Deploy it anywhere that serves static files — Vercel, Netlify, Cloudflare Pages, or your own server. The entire app, including all Vuetify0 primitives, builds to **~235 kB JS** (84 kB gzipped).

::: info
**Want to package your components as a reusable library?** We'll cover publishing and consuming a v0-based component library in an upcoming blog post. In the meantime, the [Building Frameworks](https://0.vuetifyjs.com/guide/fundamentals/building-frameworks) guide walks through using v0 as a dependency for your own library.
:::

---

## FAQ

### How is Vuetify0 different from Reka UI or other headless libraries?

Most headless libraries give you components. v0 gives you both the components *and* the underlying composables used to build them — so when a component doesn't fit your exact need, you're not stuck. The plugin system is also distinct: framework-level features like theme, locale, permissions, and notifications ship with fallbacks, so any component works standalone without requiring the full plugin to be installed. And v0 is built from a decade of Vuetify production experience by the same team — not a port of a React library.

### Is this only for teams building design systems?

No. Import a `Select` and stop there — you don't need the plugin system, the composables, or any of it. The advanced layer is there when you need it, invisible when you don't.

### Can I use Vuetify0 alongside Vuetify 4?

Yes. They don't conflict. You can start adopting v0 components and composables in a Vuetify 4 project today. The migration path to future Vuetify versions is expected to require trivial changes at most.

### Do I have to use all the plugins?

No. Every plugin is optional and tree-shakeable. A component import is just an import — no required setup. Add plugins as your needs grow.

### Is the alpha API stable enough to build on?

Mostly, yes. We ship ~5,000 unit tests and over 300 benchmark scenarios across the framework. The alpha label reflects completeness, not instability — expect minor breaking changes until beta, but nothing requiring rewrites.

---

- **Documentation** — [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **Getting Started** — [Installation guide](https://0.vuetifyjs.com/introduction/getting-started)
- **GitHub** — [vuetifyjs/0](https://github.com/vuetifyjs/0)
- **Discord** — [community.vuetifyjs.com](https://community.vuetifyjs.com)

The alpha is open for feedback. File issues, ask questions in Discord, or just build something and tell us about it. This is the foundation — help us shape it.

::: info
**Try Vuetify0 with Claude.** Connect the [Vuetify MCP server](https://0.vuetifyjs.com/guide/tooling/ai-tools) to get AI-assisted development with full access to the v0 docs and API reference.
:::

---

*Vuetify0 is part of the [Vuetify](https://vuetifyjs.com) ecosystem. Follow us on [Twitter](https://twitter.com/vuetifyjs), join the conversation on [Discord](https://community.vuetifyjs.com), and star us on [GitHub](https://github.com/vuetifyjs/0).*
