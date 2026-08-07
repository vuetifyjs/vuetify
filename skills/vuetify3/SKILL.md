---
name: vuetify3
description: Work with Vuetify 3 framework codebase. Use when developing Vuetify components, fixing issues, reviewing PRs, or understanding framework architecture.
---

# Vuetify 3 Skill

> **vuetify** — Vue 3 Material Design component framework.

## Repository Structure

```
~/sites/vuetify/
├── packages/
│   ├── vuetify/           # Main framework
│   │   ├── src/
│   │   │   ├── components/    # All components
│   │   │   ├── composables/   # Framework composables
│   │   │   ├── directives/    # v-ripple, v-resize, etc.
│   │   │   ├── labs/          # Experimental components
│   │   │   ├── locale/        # i18n
│   │   │   ├── styles/        # SASS styles
│   │   │   └── util/          # Internal utilities
│   ├── docs/              # Documentation site
│   └── api-generator/     # API docs generator
```

## MCP Tools

Always use MCP for API lookups before implementing:

| Need | MCP Tool |
|------|----------|
| Component props/events/slots | `get_component_api_by_version` |
| Directive API | `get_directive_api_by_version` |
| Feature docs | `get_feature_guide` |
| Release notes | `get_release_notes_by_version` |
| Upgrade guidance | `get_upgrade_guide` |
| v4 breaking changes | `get_v4_breaking_changes` |

Example lookup:
```bash
curl -X POST "https://mcp.vuetifyjs.com/mcp" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_component_api_by_version","arguments":{"componentName":"VBtn"}}}'
```

---

## Code Style

### Vue SFCs

Always `<script>` first, then `<template>`:

```vue
<script lang="ts" setup>
// imports, composables, logic
</script>

<template>
  <!-- markup -->
</template>
```

### Prefer `shallowRef` Over `ref`

```ts
// ❌ Bad
const open = ref(false)
const items = ref([])

// ✅ Good
const open = shallowRef(false)
const items = shallowRef([])
```

### Function Declarations Over Arrows

```ts
// ❌ Bad
const toggle = () => { ... }

// ✅ Good
function toggle () { ... }
```

### Naming

```ts
// ❌ Bad
const isMenuOpen = shallowRef(false)
function handleClick () {}
const idx = 0

// ✅ Good
const open = shallowRef(false)
function onClick () {}
const index = 0
```

### toRef vs computed

```ts
// ✅ Default — toRef for simple derivations
const color = toRef(() => props.color || 'primary')

// ✅ Only when expensive — computed
const sorted = computed(() => heavySort(items.value))
```

---

## Component Architecture

### Anatomy of a Vuetify Component

```
components/VBtn/
├── VBtn.tsx           # Main component
├── VBtn.sass          # Styles
└── index.ts           # Exports
```

### Component Pattern

```ts
// VExample.tsx
import { makeComponentProps, useComponent } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genericComponent, propsFactory } from '@/util'

export const makeVExampleProps = propsFactory({
  // Component-specific props
  text: String,
  
  // Include other prop factories
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VExample')

export const VExample = genericComponent<VExampleSlots>()({
  name: 'VExample',
  
  props: makeVExampleProps(),
  
  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    
    return () => (
      <div class={['v-example', themeClasses.value]}>
        { slots.default?.() ?? props.text }
      </div>
    )
  },
})
```

### Key Patterns

**propsFactory** — Creates typed prop definitions with defaults:
```ts
export const makeVBtnProps = propsFactory({
  color: String,
  disabled: Boolean,
  ...makeRouterProps(),
}, 'VBtn')
```

**genericComponent** — Type-safe component factory:
```ts
export const VBtn = genericComponent<VBtnSlots>()({
  name: 'VBtn',
  props: makeVBtnProps(),
  setup (props, { slots }) { ... }
})
```

**Slot typing**:
```ts
type VBtnSlots = {
  default: never
  prepend: never
  append: never
  loader: never
}
```

---

## Core Composables

### Theme
```ts
import { provideTheme, useTheme } from '@/composables/theme'

// In component setup
const { themeClasses, styles } = provideTheme(props)

// Access current theme
const theme = useTheme()
theme.global.current.value // 'light' | 'dark'
theme.global.name.value    // theme name
```

### Defaults
```ts
import { provideDefaults, useDefaults } from '@/composables/defaults'

// Provide defaults to children
provideDefaults({
  VBtn: { color: 'primary', variant: 'flat' }
})

// Use in component setup
const { props } = useDefaults(originalProps)
```

### Display
```ts
import { useDisplay } from '@/composables'

const { xs, sm, md, lg, xl, xxl } = useDisplay()
const { mobile, platform } = useDisplay()
```

### Layout
```ts
import { useLayout } from '@/composables/layout'

const { mainRect, mainStyles } = useLayout()
```

### Router
```ts
import { useLink } from '@/composables/router'

const link = useLink(props, attrs)
// link.isActive, link.isExactActive, link.href, link.navigate
```

### Form
```ts
import { useForm } from '@/composables/form'

const form = useForm()
form?.register({ id, validate, reset, resetValidation })
```

### Validation
```ts
import { makeValidationProps, useValidation } from '@/composables/validation'

const validation = useValidation(props, 'v-text-field', inputRef)
// validation.errorMessages, validation.isValid, validation.validate
```

### Group
```ts
import { makeGroupProps, useGroup, makeGroupItemProps, useGroupItem } from '@/composables/group'

// Parent
const group = useGroup(props, symbol)

// Child
const item = useGroupItem(props, symbol)
// item.isSelected, item.select, item.toggle
```

### Overlay / Stack
```ts
import { useStack } from '@/composables/stack'

const { isTop, localZIndex } = useStack(isActive, zIndex, disableGlobalStack)
```

---

## Directory Reference

| Path | Contains |
|------|----------|
| `src/components/` | All production components |
| `src/labs/` | Experimental components (VDatePicker, VDataTable, etc.) |
| `src/composables/` | Framework composables |
| `src/directives/` | Directives (ripple, resize, scroll, etc.) |
| `src/util/` | Internal helpers |
| `src/styles/` | SASS variables and base styles |
| `src/locale/` | Translation files |
| `src/blueprints/` | Pre-configured component sets |

---

## Working with Issues

1. Find component source: `src/components/V{Name}/`
2. Check MCP for current API: `get_component_api_by_version`
3. Look for related composable in `src/composables/`
4. Check if similar pattern exists in other components

## Working with PRs

1. Identify affected components/composables
2. Check for breaking changes (prop renames, slot changes)
3. Verify styles haven't regressed
4. Run `pnpm lint` and `pnpm typecheck`

---

## Development Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Build all packages
pnpm lint             # ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm typecheck        # TypeScript check
pnpm test --run       # Run tests
```

---

## Anti-Patterns

### ❌ Don't use `ref` for primitives
```ts
// Bad
const loading = ref(false)

// Good
const loading = shallowRef(false)
```

### ❌ Don't use computed for simple derivations
```ts
// Bad
const displayValue = computed(() => props.value ?? '')

// Good
const displayValue = toRef(() => props.value ?? '')
```

### ❌ Don't write custom provide/inject
```ts
// Bad
provide('myKey', value)

// Good — use existing composable patterns
```

### ❌ Don't import from relative paths in components
```ts
// Bad
import { useTheme } from '../../composables/theme'

// Good
import { useTheme } from '@/composables'
```

---

## Resources

- **Docs**: https://vuetifyjs.com
- **Source**: https://github.com/vuetifyjs/vuetify
- **Discord**: https://discord.gg/vuetify
- **MCP**: https://mcp.vuetifyjs.com
