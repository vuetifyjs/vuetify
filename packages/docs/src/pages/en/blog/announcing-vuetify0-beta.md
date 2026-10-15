---
layout: blog
meta:
  title: Announcing the Vuetify0 Beta
  description: Vuetify0 hits beta and freezes its public API — 49 components, 68 composables, a headless drag-and-drop family, and the testing work leading to v1.
  keywords: Vuetify0 beta, headless Vue, API freeze, Vue drag and drop, createSortable, createKanban, TypeScript components, Vuetify0 v1
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

# Announcing the Vuetify0 Beta

Vuetify0 has reached beta. The main change from the alpha is that the public API is now frozen: the existing composables and components keep their current names and signatures, and we don't expect them to change before v1. Work from here is focused on stability, documentation, and edge cases.

🖊️ John Leider • 📅 June 2nd, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## What beta means

The alpha, released in April, came with the caveat that APIs were mostly stable but could still shift between releases. Beta removes that caveat for the existing surface. From here to v1.0:

- Existing composables and components keep their names, signatures, and behavior. A breaking change would only happen if a critical issue required one, and it would be documented in the release notes.
- Development shifts toward edge cases, documentation, accessibility, and performance rather than new API.
- v0 is the headless layer being built into Vuetify itself. Freezing it gives that migration a fixed target to build against.

---

## Where things stand

Since the [alpha](/blog/announcing-vuetify0-alpha/) in April, the totals went from 46 components and 63 composables to **49 components and 68 composables**. The maturity mix also changed: at alpha, three composables and thirteen components were still marked draft. Now no composables are in draft, and ten components remain there.

| Maturity | Components | Composables | What it means |
|----------|-----------|-------------|---------------|
| **Stable** | 0 | 6 | In use across releases, no planned breaking changes |
| **Preview** | 39 | 62 | Feature-complete and documented |
| **Draft** | 10 | 0 | Experimental or planned for a future release |

::: info
The full list is on the [Maturity Matrix](https://0.vuetifyjs.com/roadmap#maturity-matrix), with the current level for every component and composable.
:::

The preview label describes how long a primitive has been in use, not whether its API is settled. With the freeze, the existing preview surface is not expected to change before v1.

---

## Drag and drop

The largest addition since the alpha is a group of three composables for drag-and-drop. Like the rest of v0, they handle state and behavior only, with no markup or styling.

- **[useDragDrop](https://0.vuetifyjs.com/composables/system/use-drag-drop)** ([#225](https://github.com/vuetifyjs/0/pull/225)) — the base primitive: a pointer and keyboard input adapter that owns two registries (draggables and drop zones) and the active-drag state.
- **[createSortable](https://0.vuetifyjs.com/composables/data/create-sortable)** ([#231](https://github.com/vuetifyjs/0/pull/231)) — ordered-list state, with `move`, `swap`, and `reorder` mutations and a typed `move:ticket` event. It has no DOM or input handling of its own, so it can be driven from buttons, gestures, or server updates.
- **[createKanban](https://0.vuetifyjs.com/composables/data/create-kanban)** ([#234](https://github.com/vuetifyjs/0/pull/234)) — two levels of `createSortable` (columns and their items) plus a `transfer` method for moving items between columns.

Because `createSortable` is state only, a pair of buttons can drive it without any drag handling:

```ts
import { createSortable } from '@vuetify/v0'
import type { SortableTicketInput } from '@vuetify/v0'

interface TaskTicket extends SortableTicketInput {
  value: { id: number, label: string }
}

const sortable = createSortable<TaskTicket>()

const [a, b, c] = sortable.onboard([
  { value: { id: 1, label: 'Cut alpha' } },
  { value: { id: 2, label: 'Ship docs' } },
  { value: { id: 3, label: 'Tweet' } },
])

sortable.move(a.id, 2)        // move a ticket to a new index
sortable.swap(a.id, b.id)     // swap two tickets
sortable.reorder([b.id, a.id, c.id]) // apply a full permutation
```

The same state rendered as a list — this is the example from the documentation:

```html { resource="src/components/ReorderList.vue" }
<script setup lang="ts">
  import { createSortable, useProxyRegistry } from '@vuetify/v0'
  import { mdiChevronDown, mdiChevronUp } from '@mdi/js'

  import type { SortableTicketInput } from '@vuetify/v0'

  interface ItemTicket extends SortableTicketInput {
    value: string
  }

  const sortable = createSortable<ItemTicket>()

  sortable.onboard([
    { value: 'Cut alpha' },
    { value: 'Ship the docs' },
    { value: 'File the bug' },
    { value: 'Tweet about it' },
  ])

  const proxy = useProxyRegistry(sortable)
</script>

<template>
  <TransitionGroup class="flex flex-col gap-1" name="list" tag="ul">
    <li
      v-for="ticket in proxy.values"
      :key="ticket.id"
      class="flex items-center gap-2 rounded border border-divider bg-surface px-3 py-2"
    >
      <span class="grow">{{ ticket.value }}</span>

      <button
        aria-label="Move up"
        class="rounded p-1 hover:bg-surface-tint disabled:opacity-30"
        :disabled="ticket.index === 0"
        @click="sortable.move(ticket.id, ticket.index - 1)"
      >
        <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24">
          <path :d="mdiChevronUp" fill="currentColor" />
        </svg>
      </button>

      <button
        aria-label="Move down"
        class="rounded p-1 hover:bg-surface-tint disabled:opacity-30"
        :disabled="ticket.index === proxy.size - 1"
        @click="sortable.move(ticket.id, ticket.index + 1)"
      >
        <svg aria-hidden="true" class="size-5" viewBox="0 0 24 24">
          <path :d="mdiChevronDown" fill="currentColor" />
        </svg>
      </button>
    </li>
  </TransitionGroup>
</template>
```

`useDragDrop` adds pointer and keyboard dragging on top, calling the same `move`, `swap`, and `reorder` methods.

---

## Other additions

Other primitives added since the alpha:

- **[createOtp](https://0.vuetifyjs.com/composables/forms/create-otp)** ([#238](https://github.com/vuetifyjs/0/pull/238)) — state and focus management for one-time-code and verification inputs.
- **[Overflow](https://0.vuetifyjs.com/components/semantic/overflow)** ([#220](https://github.com/vuetifyjs/0/pull/220)) — a container that detects overflow and exposes scroll state to its children.
- **useDelay** — debounce and delayed-execution timing.
- **[toHighlight](https://0.vuetifyjs.com/composables/transformers/to-highlight)** ([#222](https://github.com/vuetifyjs/0/pull/222)) — a transformer that marks matched substrings, for search results and filters.

`createRegistry`, which the stateful composables build on, also gained a bulk `reorder` primitive and an `offboard` that returns removed entries. The latter is what `createKanban` uses to move items between columns.

---

## Testing and performance

Current numbers:

- 5,700+ unit tests across 142 spec files.
- 98.7% average test coverage across the 105 primitives with recorded metrics.
- 12 benchmark suites covering performance-sensitive paths such as `createDataTable`, `createFilter`, and the registry core. `createSortable`'s reorder was rewritten to use the registry's bulk operation rather than a per-item loop.
- 100% TypeScript and no runtime CSS. The package ships no styles, and exports are annotated so bundlers can drop unused composables.

::: info
The [benchmarks page](https://0.vuetifyjs.com/guide/fundamentals/benchmarks) documents the methodology and per-primitive results.
:::

One change since the alpha: `useTheme`, `useLocale`, and `useFeatures` use a reactive registry by default ([#210](https://github.com/vuetifyjs/0/pull/210)), so switching a theme or feature flag updates consumers without extra setup. The convention is [documented](https://0.vuetifyjs.com/guide/fundamentals/reactivity) for plugin authors.

---

## AI tooling

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

As in the alpha, each documentation page has an Ask AI option, the docs publish `llms.txt` and `llms-full.txt`, and the [Vuetify MCP server](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp) connects an editor to the API reference. The MCP data is synced to the beta.

::: info
The [Vuetify MCP guide](https://0.vuetifyjs.com/guide/tooling/vuetify-mcp#claude-code) covers connecting it to an editor.
:::

---

## Road to v1

The beta is the second of three milestones:

- **Alpha** (April 7, 2026) — open for feedback, APIs mostly stable
- **Beta** (June 2, 2026) — API freeze; stability, documentation, and edge cases
- **v1.0** (July 2026) — milestone-driven; ships when the milestones are met

See the [roadmap](https://0.vuetifyjs.com/roadmap) for details.

---

## FAQ

### What changes at beta?

The public API stops changing. During alpha, names and signatures could change between releases; from beta to v1.0 they don't, unless a critical fix requires it. The stable, preview, and draft labels still indicate how long each primitive has been in use.

### Can I use the beta in production?

Code written against the beta API should keep working through v1, since the API is frozen. The remaining work is hardening and documentation.

### Can I use Vuetify0 alongside Vuetify 4?

Yes. They don't conflict, and v0 is already used inside Vuetify's internals. The path to future Vuetify versions is expected to need minimal changes.

### Will there be breaking changes between beta and v1?

None are planned. If a critical bug or accessibility issue requires one, it will be noted in the release notes.

### Do I have to use the whole framework?

No. You can import a single component or composable on its own. The plugins and other layers are optional.

---

- **Documentation** — [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **Getting Started** — [Installation guide](https://0.vuetifyjs.com/introduction/getting-started)
- **GitHub** — [vuetifyjs/0](https://github.com/vuetifyjs/0)
- **Discord** — [community.vuetifyjs.com](https://community.vuetifyjs.com)

*Vuetify0 is part of the [Vuetify](https://vuetifyjs.com) ecosystem. Documentation is at [0.vuetifyjs.com](https://0.vuetifyjs.com); source is on [GitHub](https://github.com/vuetifyjs/0).*
