# VHotKey Design Document

> **Architecture Note**: This component uses TSX (TypeScript JSX) syntax following Vuetify's component patterns. All examples and implementation details reflect Vuetify's `genericComponent()`, `propsFactory`, and `useRender()` architecture.

## Overview

`VHotKey` is a lightweight TSX Vue component designed for displaying keyboard shortcuts in a user-friendly format. It follows Vuetify's component architecture patterns and serves as both a standalone component for general hotkey display and as an integral part of the ActionCore ecosystem for showing action-bound keyboard shortcuts.

## Core Architecture

### Component Definition

```typescript
// VHotKey.tsx
import { computed, toRef } from 'vue'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useLocale } from '@/composables/locale'
import { useDefaults } from '@/composables/defaults'
import { KeyBindingUtils } from '@/composables/key-bindings'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVHotKeyProps = propsFactory({
  // Core Properties
  hotkey: {
    type: String as PropType<string | null>,
    default: null,
  },
  actionId: {
    type: String as PropType<string | null>,
    default: null,
  },

  // Display Configuration
  displayMode: {
    type: String as PropType<'symbol' | 'text'>,
    default: 'symbol',
  },
  sequenceSeparator: {
    type: [String, Boolean] as PropType<string | false>,
    default: () => '$vuetify.hotkey.then', // Will be localized in setup
  },
  combinationSeparator: {
    type: [String, Boolean] as PropType<string | false>,
    default: '',
  },

  // Visual Styling
  variant: {
    type: String as PropType<'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'>,
    default: 'tonal',
  },
  size: {
    type: String as PropType<'x-small' | 'small' | 'default' | 'large' | 'x-large'>,
    default: 'small',
  },

  // Warning Control
  showWarning: {
    type: Boolean,
    default: true,
  },

  ...makeComponentProps(),
  ...makeThemeProps(),
  ...makeDensityProps(),
}, 'VHotKey')

export const VHotKey = genericComponent()({
  name: 'VHotKey',

  props: makeVHotKeyProps(),

  setup(props) {
    // Validate that at least one of hotkey or actionId is provided
    if (!props.hotkey && !props.actionId) {
      if (__DEV__) {
        console.warn('[VHotKey] At least one of "hotkey" or "actionId" props must be provided')
      }
    }

    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)
    const { t } = useLocale()
    useDefaults()

    // ActionCore integration
    const { effectiveHotkey } = useActionCoreIntegration(toRef(props, 'actionId'), toRef(props, 'showWarning'))

    // Determine the actual hotkey string to display
    const displayHotkey = computed(() => {
      // If actionId is provided, use effectiveHotkey from ActionCore
      if (props.actionId && effectiveHotkey.value) {
        return effectiveHotkey.value
      }

      // Fall back to hotkey prop if actionId doesn't resolve
      if (props.hotkey) {
        return props.hotkey
      }

      // No hotkey available
      return null
    })

    // Parse and format the hotkey for display using shared utilities
    const formattedDisplay = computed(() => {
      if (!displayHotkey.value) return null

      try {
        // Use shared utilities from useKeyBindings for consistency
        return KeyBindingUtils.formatForDisplay(
          displayHotkey.value,
          props.displayMode,
          {
            combinationSeparator: props.combinationSeparator,
            sequenceSeparator: typeof props.sequenceSeparator === 'string' && props.sequenceSeparator.startsWith('$vuetify.')
              ? t(props.sequenceSeparator)
              : props.sequenceSeparator,
          }
        )
      } catch (error) {
        if (__DEV__) {
          console.warn('[VHotKey] Failed to format hotkey string:', displayHotkey.value, error)
        }
        return null
      }
    })

    // Styling classes
    const sizeClasses = computed(() => [`v-hotkey--size-${props.size}`])
    const variantClasses = computed(() => [`v-hotkey--variant-${props.variant}`])

    useRender(() => {
      if (!formattedDisplay.value) {
        return null
      }

      return (
        <div
          class={[
            'v-hotkey',
            themeClasses.value,
            densityClasses.value,
            sizeClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={ props.style }
        >
          { formattedDisplay.value.sequences.map((sequence, seqIndex) => (
            <div key={ seqIndex } class="v-hotkey__sequence">
              {/* Sequence separator */}
              { seqIndex > 0 && formattedDisplay.value.sequenceSeparator && (
                <span class="v-hotkey__sequence-separator">
                  { formattedDisplay.value.sequenceSeparator }
                </span>
              )}

              {/* Key combination */}
              { sequence.keys.map((key, keyIndex) => (
                <span key={ keyIndex }>
                  {/* Combination separator */}
                  { keyIndex > 0 && formattedDisplay.value.combinationSeparator && (
                    <span class="v-hotkey__separator">
                      { formattedDisplay.value.combinationSeparator }
                    </span>
                  )}

                  {/* Individual key */}
                  <span class={`v-hotkey__key v-hotkey__key--${key.type}`}>
                    { key.display }
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      )
    })

    return {}
  },
})

export type VHotKey = InstanceType<typeof VHotKey>
```

### Data Structures

`VHotKey` relies on the shared `KeyBindingUtils.formatForDisplay()` function from `useKeyBindings` for consistent display formatting. This ensures perfect alignment between key binding parsing and display formatting across the ActionCore ecosystem.

## ActionCore Integration

### ActionCore Context Integration

```typescript
export function useActionCoreIntegration(
  actionId: Ref<string | null>,
  showWarning: Ref<boolean>
) {
  const actionCore = inject(ActionCoreKey, null)

  const effectiveHotkey = computed(() => {
    if (!actionId.value) return null

    if (!actionCore) {
      // Handle warnings based on environment and showWarning prop
      if (showWarning.value) {
        if (__DEV__) {
          console.error('[VHotKey] ActionCore not available but actionId provided')
        } else {
          // Emit capturable warning for production error logging systems
          console.warn('[VHotKey] ActionCore not available but actionId provided')
        }
      }
      return null
    }

    try {
      return actionCore.getEffectiveHotkey(actionId.value)
    } catch (error) {
      if (__DEV__) {
        console.warn(`[VHotKey] Failed to get effective hotkey for action "${actionId.value}":`, error)
      }
      return null
    }
  })

  return {
    effectiveHotkey
  }
}
```

## Visual Design and Styling

### Base Component Styles

```scss
.v-hotkey {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-family: var(--v-theme-code-font, 'Roboto Mono', monospace);
  user-select: none;

  // Density variants
  &--density-compact {
    gap: 1px;
    .v-hotkey__key {
      min-height: 18px;
      padding: 1px 4px;
      font-size: 0.75rem;
    }
  }

  &--density-comfortable {
    gap: 3px;
    .v-hotkey__key {
      min-height: 24px;
      padding: 2px 6px;
      font-size: 0.875rem;
    }
  }

  &--density-default {
    gap: 2px;
    .v-hotkey__key {
      min-height: 20px;
      padding: 1px 5px;
      font-size: 0.8125rem;
    }
  }
}

.v-hotkey__key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;

  // Key type styling
  &--modifier {
    font-weight: 600;
  }

  &--function {
    font-variant: small-caps;
  }

  // Variant styles
  &.v-hotkey--variant-elevated {
    background: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }

  &.v-hotkey--variant-tonal {
    background: rgb(var(--v-theme-secondary-container));
    color: rgb(var(--v-theme-on-secondary-container));
  }

  &.v-hotkey--variant-outlined {
    background: transparent;
    border: 1px solid rgb(var(--v-theme-outline));
    color: rgb(var(--v-theme-on-surface-variant));
  }

  &.v-hotkey--variant-flat {
    background: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
  }

  &.v-hotkey--variant-text {
    background: transparent;
    color: rgb(var(--v-theme-primary));
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  &.v-hotkey--variant-plain {
    background: transparent;
    color: rgb(var(--v-theme-on-surface));
  }
}

.v-hotkey__separator {
  color: rgb(var(--v-theme-on-surface-variant));
  opacity: 0.7;
  font-size: 0.875em;
  margin: 0 1px;
}

.v-hotkey__sequence-separator {
  color: rgb(var(--v-theme-on-surface-variant));
  opacity: 0.8;
  font-size: 0.875em;
  margin: 0 4px;
}

// Size variants
.v-hotkey--size-x-small .v-hotkey__key {
  min-height: 16px;
  padding: 1px 3px;
  font-size: 0.6875rem;
}

.v-hotkey--size-small .v-hotkey__key {
  min-height: 20px;
  padding: 1px 5px;
  font-size: 0.8125rem;
}

.v-hotkey--size-default .v-hotkey__key {
  min-height: 24px;
  padding: 2px 6px;
  font-size: 0.875rem;
}

.v-hotkey--size-large .v-hotkey__key {
  min-height: 28px;
  padding: 3px 8px;
  font-size: 1rem;
}

.v-hotkey--size-x-large .v-hotkey__key {
  min-height: 32px;
  padding: 4px 10px;
  font-size: 1.125rem;
}
```

## Integration Examples

### Standalone Usage

```tsx
import { VHotKey } from '@/labs/VActionCore'

export default function StandaloneExample() {
  return (
    <div>
      {/* Basic hotkey display */}
      <VHotKey hotkey="Ctrl+S" />

      {/* With custom styling */}
      <VHotKey
        hotkey="Shift+Alt+F12"
        variant="outlined"
        size="large"
        displayMode="text"
      />

      {/* Key sequence with custom separators */}
      <VHotKey
        hotkey="Ctrl+K Ctrl+S"
        combinationSeparator=" + "
        sequenceSeparator=" → "
      />

      {/* Different visual variants */}
      <VHotKey hotkey="F12" variant="elevated" />
      <VHotKey hotkey="Escape" variant="text" />
    </div>
  )
}
```

### ActionCore Integration

```tsx
import { VHotKey } from '@/labs/VActionCore'

export default function ActionCoreExample() {
  return (
    <div>
      {/* Display hotkey for specific action */}
      <VHotKey actionId="editor.save" />

      {/* With fallback hotkey if action not found */}
      <VHotKey
        actionId="editor.format"
        hotkey="Ctrl+Shift+I"
      />

      {/* Disable ActionCore warnings */}
      <VHotKey
        actionId="possibly.missing.action"
        showWarning={false}
      />
    </div>
  )
}
```

This design focuses on the core display functionality while maintaining simplicity and full alignment with the requirements document.
