// Utilities
import { computed, inject, provide, ref, shallowRef } from 'vue'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'

export interface CommandPaletteItem {
  id: string
  element: Ref<HTMLElement | undefined>
  data: any
}

export interface VCommandPaletteContext {
  registerItem: (id: string, element: Ref<HTMLElement | undefined>, data: any) => void
  unregisterItem: (id: string) => void
  selectedIndex: Ref<number>
  navigationMode: Ref<'list' | 'grid'>
  items: Ref<any[]>
  getItemProps: (item: any, index: number) => Record<string, any>
  rootProps: ComputedRef<Record<string, any>>
}

export const VCommandPaletteContextKey: InjectionKey<VCommandPaletteContext> = Symbol.for('vuetify:command-palette')

export function provideCommandPaletteContext (options: {
  items: Ref<any[]>
  selectedIndex: Ref<number>
  activeDescendantId: ComputedRef<string | undefined>
  onKeydown?: (event: KeyboardEvent) => void
  navigationMode?: Ref<'list' | 'grid'>
}) {
  const {
    items,
    selectedIndex,
    activeDescendantId,
    onKeydown,
    navigationMode = ref('list'),
  } = options

  const registeredItems = shallowRef<Map<string, CommandPaletteItem>>(new Map())

  function registerItem (id: string, element: Ref<HTMLElement | undefined>, data: any) {
    registeredItems.value.set(id, { id, element, data })
    // Trigger reactivity
    registeredItems.value = new Map(registeredItems.value)
  }

  function unregisterItem (id: string) {
    registeredItems.value.delete(id)
    // Trigger reactivity
    registeredItems.value = new Map(registeredItems.value)
  }

  function getItemProps (item: any, index: number) {
    const isSelected = selectedIndex.value === index
    const itemId = `command-palette-item-${index}`

    return {
      id: itemId,
      role: 'option',
      'aria-selected': isSelected,
      class: {
        'v-list-item--active': isSelected,
      },
      tabindex: -1,
    }
  }

  const rootProps = computed(() => {
    const baseProps: Record<string, any> = {
      role: navigationMode.value === 'grid' ? 'grid' : 'listbox',
      tabindex: 0,
    }

    if (activeDescendantId.value) {
      baseProps['aria-activedescendant'] = activeDescendantId.value
    }

    if (onKeydown) {
      baseProps.onKeydown = onKeydown
    }

    return baseProps
  })

  const context: VCommandPaletteContext = {
    registerItem,
    unregisterItem,
    selectedIndex,
    navigationMode,
    items,
    getItemProps,
    rootProps,
  }

  provide(VCommandPaletteContextKey, context)

  return context
}

export function useCommandPaletteContext () {
  const context = inject(VCommandPaletteContextKey)

  if (!context) {
    throw new Error('useCommandPaletteContext must be used within a VCommandPalette component')
  }

  return context
}
