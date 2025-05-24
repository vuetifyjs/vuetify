# VCommandPalette Test Plan

## Overview

This comprehensive test plan covers all functionality specified in `VCommandPaletteRequirements.md` and `VCommandPaletteDesign.md`. The test plan is organized into unit tests, integration tests, end-to-end tests, and specialized test categories.

## Dependencies and Prerequisites

### ActionCore ActionDefinition Interface
Several tests assume that ActionCore's `ActionDefinition` interface includes:
- `isNavigationAction?: boolean` - For filtering navigation actions from command palette
- `group?: string` - For result grouping (if primarily ActionCore-managed)
- `enabled?: boolean` - For filtering disabled actions

These properties should be explicitly defined in the ActionCore design documentation to support VCommandPalette's functionality.

## 1. Unit Tests

### 1.1. Component Properties and Props

#### 1.1.1. Model Value and Visibility
```typescript
describe('VCommandPalette - Model Value', () => {
  test('should accept modelValue prop of type Boolean', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true }
    })
    expect(wrapper.props('modelValue')).toBe(true)
  })

  test('should emit update:modelValue when visibility changes', async () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true }
    })
    await wrapper.find('.v-dialog').trigger('click.outside')
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  test('should implement proper v-model binding', async () => {
    const wrapper = mount({
      components: { VCommandPalette },
      template: '<VCommandPalette v-model="visible" />',
      data: () => ({ visible: false })
    })

    wrapper.vm.visible = true
    await wrapper.vm.$nextTick()
    expect(wrapper.findComponent(VCommandPalette).props('modelValue')).toBe(true)
  })
})
```

#### 1.1.2. Display Configuration Props
```typescript
describe('VCommandPalette - Display Configuration', () => {
  test('should have correct default values', () => {
    const wrapper = mount(VCommandPalette)
    expect(wrapper.props('placeholder')).toBe('Search commands...')
    expect(wrapper.props('title')).toBe('Command Palette')
    expect(wrapper.props('width')).toBe(600)
    expect(wrapper.props('closeOnExecute')).toBe(true)
  })

  test('should accept custom display configuration', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        placeholder: 'Custom placeholder',
        title: 'Custom Title',
        width: 800,
        closeOnExecute: false
      }
    })

    expect(wrapper.find('.v-text-field input').attributes('placeholder')).toBe('Custom placeholder')
    expect(wrapper.find('.v-card-title').text()).toBe('Custom Title')
    expect(wrapper.find('.v-dialog').attributes('width')).toBe('800')
  })
})
```

#### 1.1.3. Vuetify Integration Props
```typescript
describe('VCommandPalette - Vuetify Integration', () => {
  test('should accept makeComponentProps (class, style)', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        class: 'custom-class',
        style: 'color: red;'
      }
    })

    expect(wrapper.classes()).toContain('custom-class')
    expect(wrapper.attributes('style')).toContain('color: red')
  })

  test('should accept makeThemeProps', () => {
    const wrapper = mount(VCommandPalette, {
      props: { theme: 'dark' }
    })
    expect(wrapper.classes()).toContain('v-theme--dark')
  })

  test('should accept makeDensityProps', () => {
    const wrapper = mount(VCommandPalette, {
      props: { density: 'compact' }
    })
    expect(wrapper.classes()).toContain('v-command-palette--density-compact')
  })

  test('should accept makeTransitionProps', () => {
    const wrapper = mount(VCommandPalette, {
      props: { transition: 'slide-y-transition' }
    })
    expect(wrapper.findComponent(VDialog).props('transition')).toBe('slide-y-transition')
  })

  test('should accept makeFilterProps and makeVirtualProps', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        filterKeys: ['title', 'description'],
        itemHeight: 48
      }
    })
    // Test that filter and virtual props are properly passed through
    expect(wrapper.props('filterKeys')).toEqual(['title', 'description'])
    expect(wrapper.props('itemHeight')).toBe(48)
  })
})
```

#### 1.1.4. Standalone Action Management Props
```typescript
describe('VCommandPalette - Standalone Props', () => {
  const mockActions = [
    { id: 'save', title: 'Save File', hotkey: 'Ctrl+S' },
    { id: 'open', title: 'Open File', hotkey: 'Ctrl+O' }
  ]

  const mockSearchProviders = [
    {
      id: 'files',
      title: 'Files',
      search: vi.fn().mockResolvedValue([])
    }
  ]

  const mockOnExecuteAction = vi.fn()
  const mockApplicationContext = { currentFile: 'test.js' }

  test('should accept actions prop', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions
      }
    })
    expect(wrapper.props('actions')).toEqual(mockActions)
  })

  test('should accept searchProviders prop', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: mockSearchProviders
      }
    })
    expect(wrapper.props('searchProviders')).toEqual(mockSearchProviders)
  })

  test('should accept onExecuteAction prop', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        onExecuteAction: mockOnExecuteAction
      }
    })
    expect(wrapper.props('onExecuteAction')).toBe(mockOnExecuteAction)
  })

  test('should accept applicationContext prop', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        applicationContext: mockApplicationContext
      }
    })
    expect(wrapper.props('applicationContext')).toEqual(mockApplicationContext)
  })
})
```

#### 1.1.5. Configuration Props
```typescript
describe('VCommandPalette - Configuration Props', () => {
  test('should accept useActionCore prop with default true', () => {
    const wrapper = mount(VCommandPalette)
    expect(wrapper.props('useActionCore')).toBe(true)
  })

  test('should accept resultOrdering prop', () => {
    const ordering = {
      groupOrder: ['Files', 'Actions'],
      customOrderFn: (a, b) => a.title.localeCompare(b.title)
    }

    const wrapper = mount(VCommandPalette, {
      props: { resultOrdering: ordering }
    })
    expect(wrapper.props('resultOrdering')).toEqual(ordering)
  })

  test('should accept searchConfiguration prop', () => {
    const config = {
      timeout: 5000,
      customOrderFn: (a, b) => b.relevanceScore - a.relevanceScore
    }

    const wrapper = mount(VCommandPalette, {
      props: { searchConfiguration: config }
    })
    expect(wrapper.props('searchConfiguration')).toEqual(config)
  })
})
```

### 1.2. Vuetify Composable Integration

#### 1.2.1. Essential Composables
```typescript
describe('VCommandPalette - Composable Integration', () => {
  test('should use useProxiedModel for v-model binding', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true }
    })

    // Test that internal isVisible reactive value is properly synced
    expect(wrapper.vm.isVisible).toBe(true)
  })

  test('should use useDefaults for configurable defaults', () => {
    // Mock global defaults
    const mockDefaults = {
      VCommandPalette: {
        placeholder: 'Global placeholder',
        closeOnExecute: false
      }
    }

    const wrapper = mount(VCommandPalette, {
      global: {
        provide: {
          defaults: mockDefaults
        }
      }
    })

    // Verify defaults are applied
    expect(wrapper.find('input').attributes('placeholder')).toBe('Global placeholder')
  })

  test('should use useLocale for internationalization', () => {
    const wrapper = mount(VCommandPalette, {
      props: { placeholder: '$vuetify.commandPalette.search' }
    })

    // Verify localization function is called
    expect(wrapper.vm.t).toBeDefined()
  })

  test('should use useSsrBoot for SSR compatibility', () => {
    const wrapper = mount(VCommandPalette)
    expect(wrapper.vm.ssrBootStyles).toBeDefined()
  })

  test('should use useStack for z-index management', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true }
    })
    expect(wrapper.vm.stackStyles).toBeDefined()
  })

  test('should use useFilter for search functionality', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ]
      }
    })

    await wrapper.find('input').setValue('save')
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Save File')
  })

  test('should use useVirtual for large lists', () => {
    const largeActionList = Array.from({ length: 1500 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeActionList
      }
    })

    expect(wrapper.vm.containerProps).toBeDefined()
    expect(wrapper.vm.markerProps).toBeDefined()
    expect(wrapper.vm.itemProps).toBeDefined()
  })
})
```

### 1.3. ActionCore Integration

#### 1.3.1. Optional Integration Logic
```typescript
describe('VCommandPalette - ActionCore Integration', () => {
  const mockActionCore = {
    getVisibleActions: vi.fn(() => [
      { id: 'save', title: 'Save', enabled: true, isNavigationAction: false },
      { id: 'navigate', title: 'Navigate', enabled: true, isNavigationAction: true }
    ]),
    getApplicationContext: vi.fn(() => ({ view: 'editor' })),
    executeAction: vi.fn(),
    getActiveSearchProviders: vi.fn(() => [])
  }

  test('should detect ActionCore availability', () => {
    const wrapper = mount(VCommandPalette, {
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    expect(wrapper.vm.isActionCoreAvailable).toBe(true)
  })

  test('should filter out navigation actions from ActionCore', () => {
    const wrapper = mount(VCommandPalette, {
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    const actions = wrapper.vm.actionCoreActions
    expect(actions).toHaveLength(1)
    expect(actions[0].id).toBe('save')
  })

  test('should use ActionCore context when available', () => {
    const wrapper = mount(VCommandPalette, {
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    expect(wrapper.vm.actionCoreContext).toEqual({ view: 'editor' })
  })

  test('should execute actions through ActionCore when available', async () => {
    const wrapper = mount(VCommandPalette, {
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    await wrapper.vm.executeAction({ id: 'save', title: 'Save' })
    expect(mockActionCore.executeAction).toHaveBeenCalledWith('save')
  })
})
```

#### 1.3.2. Standalone Operation
```typescript
describe('VCommandPalette - Standalone Operation', () => {
  test('should function without ActionCore', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }]
      }
    })

    expect(wrapper.vm.isActionCoreAvailable).toBe(false)
    expect(wrapper.vm.allActions).toHaveLength(1)
  })

  test('should use prop-provided actions when ActionCore unavailable', () => {
    const actions = [
      { id: 'save', title: 'Save File' },
      { id: 'open', title: 'Open File' }
    ]

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions
      }
    })

    expect(wrapper.vm.allActions).toEqual(actions)
  })

  test('should use prop-provided context in standalone mode', () => {
    const context = { currentFile: 'test.js', user: 'developer' }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        applicationContext: context
      }
    })

    expect(wrapper.vm.applicationContext).toEqual(context)
  })

  test('should execute actions via onExecuteAction prop', async () => {
    const onExecuteAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction
      }
    })

    await wrapper.vm.executeAction({ id: 'save', title: 'Save File' })
    expect(onExecuteAction).toHaveBeenCalledWith(
      { id: 'save', title: 'Save File' },
      {}
    )
  })

  test('should emit warnings in development when ActionCore features used without ActionCore', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    mount(VCommandPalette, {
      props: {
        useActionCore: true // Expects ActionCore but none provided
      }
    })

    // In development mode, should warn about ActionCore not being available
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('ActionCore')
    )

    consoleSpy.mockRestore()
  })
})
```

### 1.4. Search and Filtering

#### 1.4.1. Fuzzy Search Implementation
```typescript
describe('VCommandPalette - Search and Filtering', () => {
  const mockActions = [
    { id: 'save', title: 'Save File', description: 'Save the current file' },
    { id: 'open', title: 'Open File', description: 'Open a new file' },
    { id: 'format', title: 'Format Document', description: 'Format the code' }
  ]

  test('should implement case-insensitive fuzzy search', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('save')
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Save File')

    await wrapper.find('input').setValue('OPEN')
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Open File')
  })

  test('should search across titles and descriptions', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('code')
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Format Document')
  })

  test('should support partial matching', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('file')
    expect(wrapper.vm.filteredItems).toHaveLength(2)
  })

  test('should highlight matching portions', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('save')
    await wrapper.vm.$nextTick()

    const highlightedText = wrapper.find('.v-command-palette__highlight')
    expect(highlightedText.exists()).toBe(true)
    expect(highlightedText.text()).toBe('Save')
  })

  test('should perform real-time search', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.setValue('s')
    expect(wrapper.vm.filteredItems).toHaveLength(1)

    await input.setValue('sa')
    expect(wrapper.vm.filteredItems).toHaveLength(1)

    await input.setValue('sav')
    expect(wrapper.vm.filteredItems).toHaveLength(1)
  })

  test('should clear search and reset to full list', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('save')
    expect(wrapper.vm.filteredItems).toHaveLength(1)

    await wrapper.find('input').setValue('')
    expect(wrapper.vm.filteredItems).toHaveLength(3)
  })
})
```

#### 1.4.2. Search Input Handling
```typescript
describe('VCommandPalette - Search Input', () => {
  test('should maintain focus during navigation', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    // Simulate arrow down navigation
    await input.trigger('keydown', { key: 'ArrowDown' })

    // Input should still be focused
    expect(document.activeElement).toBe(input.element)
  })

  test('should support input context rules from useKeyBindings', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    // Verify that search input is registered as special context
    expect(wrapper.vm.registerContext).toHaveBeenCalledWith(
      'command-palette-search',
      expect.objectContaining({
        element: expect.any(Object),
        allowNavigation: true
      })
    )
  })
})
```

### 1.5. Navigation and Selection

#### 1.5.1. Keyboard Navigation
```typescript
describe('VCommandPalette - Keyboard Navigation', () => {
  const mockActions = [
    { id: 'save', title: 'Save File' },
    { id: 'open', title: 'Open File' },
    { id: 'close', title: 'Close File' }
  ]

  test('should support up/down arrow navigation', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Start at index 0
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Navigate down
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.vm.selectedIndex).toBe(1)

    // Navigate up
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.vm.selectedIndex).toBe(0)
  })

  test('should support page up/down navigation', async () => {
    const largeActionList = Array.from({ length: 50 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeActionList,
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Page down should jump by 10
    await input.trigger('keydown', { key: 'PageDown' })
    expect(wrapper.vm.selectedIndex).toBe(10)

    // Page up should jump back by 10
    await input.trigger('keydown', { key: 'PageUp' })
    expect(wrapper.vm.selectedIndex).toBe(0)
  })

  test('should support home/end navigation', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Navigate to middle
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.vm.selectedIndex).toBe(1)

    // End should go to last item
    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.vm.selectedIndex).toBe(2)

    // Home should go to first item
    await input.trigger('keydown', { key: 'Home' })
    expect(wrapper.vm.selectedIndex).toBe(0)
  })

  test('should visually indicate selected item', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.vm.$nextTick()

    const selectedItem = wrapper.find('.v-command-palette__item--selected')
    expect(selectedItem.exists()).toBe(true)
  })

  test('should emit navigation:change events', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: mockActions,
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })

    expect(wrapper.emitted('navigation:change')).toEqual([[1]])
  })
})
```

#### 1.5.2. Item Selection and Execution
```typescript
describe('VCommandPalette - Item Selection', () => {
  test('should execute action on Enter key', async () => {
    const onExecuteAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction,
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'Enter' })

    expect(onExecuteAction).toHaveBeenCalledWith(
      { id: 'save', title: 'Save File' },
      expect.any(Object)
    )
  })

  test('should execute action on mouse click', async () => {
    const onExecuteAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction,
        modelValue: true
      }
    })

    await wrapper.find('.v-command-palette__item').trigger('click')

    expect(onExecuteAction).toHaveBeenCalledWith(
      { id: 'save', title: 'Save File' },
      expect.any(Object)
    )
  })

  test('should handle synchronous action execution', async () => {
    const syncAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction: syncAction,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()
    expect(syncAction).toHaveBeenCalled()
  })

  test('should handle asynchronous action execution', async () => {
    const asyncAction = vi.fn().mockResolvedValue(undefined)
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction: asyncAction,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()
    expect(asyncAction).toHaveBeenCalled()
  })

  test('should close on successful execution when closeOnExecute is true', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction: vi.fn(),
        closeOnExecute: true,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  test('should not close when closeOnExecute is false', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction: vi.fn(),
        closeOnExecute: false,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  test('should emit action:execute events', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        onExecuteAction: vi.fn(),
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()
    expect(wrapper.emitted('action:execute')).toEqual([
      [{ id: 'save', title: 'Save File' }, expect.any(Object)]
    ])
  })
})
```

### 1.6. Error Handling and Edge Cases

#### 1.6.1. Action Execution Errors
```typescript
describe('VCommandPalette - Error Handling', () => {
  test('should handle action execution errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const failingAction = vi.fn().mockRejectedValue(new Error('Action failed'))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'fail', title: 'Failing Action' }],
        onExecuteAction: failingAction,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()

    // Component should remain responsive
    expect(wrapper.vm.isVisible).toBe(true)
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to execute item'),
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  test('should not close on failed action execution', async () => {
    const failingAction = vi.fn().mockRejectedValue(new Error('Action failed'))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'fail', title: 'Failing Action' }],
        onExecuteAction: failingAction,
        closeOnExecute: true,
        modelValue: true
      }
    })

    await wrapper.vm.executeSelectedItem()

    // Should not emit close event on error
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
```

#### 1.6.2. Loading States and Empty States
```typescript
describe('VCommandPalette - Loading and Empty States', () => {
  test('should display loading indicators during search', async () => {
    const slowSearchProvider = {
      id: 'slow',
      title: 'Slow Provider',
      search: () => new Promise(resolve => setTimeout(resolve, 1000))
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [slowSearchProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-command-palette__search-loader').exists()).toBe(true)
  })

  test('should display no results message when search yields no results', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('nonexistent')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-command-palette__no-results').exists()).toBe(true)
    expect(wrapper.find('.v-command-palette__no-results').text()).toContain('No results found')
  })

  test('should display appropriate content when no actions are registered', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [],
        modelValue: true
      }
    })

    expect(wrapper.find('.v-command-palette__no-results').exists()).toBe(true)
    expect(wrapper.find('.v-command-palette__no-results').text()).toContain('No actions available')
  })

  test('should handle search provider timeouts', async () => {
    const timeoutProvider = {
      id: 'timeout',
      title: 'Timeout Provider',
      search: () => new Promise(() => {}) // Never resolves
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [timeoutProvider],
        searchConfiguration: { timeout: 100 },
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')

    // Should handle timeout gracefully without blocking other providers
    await new Promise(resolve => setTimeout(resolve, 200))
    expect(wrapper.vm.isSearching).toBe(false)
  })
})
```

### 1.7. Search Highlighting Utility

#### 1.7.1. highlightMatch Function
```typescript
describe('VCommandPalette - highlightMatch Utility', () => {
  test('should highlight exact matches', () => {
    const result = highlightMatch('Save File', 'save')
    expect(result).toEqual([
      { text: 'Save', highlight: true },
      { text: ' File', highlight: false }
    ])
  })

  test('should handle case-insensitive matches', () => {
    const result = highlightMatch('Open File', 'OPEN')
    expect(result).toEqual([
      { text: 'Open', highlight: true },
      { text: ' File', highlight: false }
    ])
  })

  test('should highlight multiple matches', () => {
    const result = highlightMatch('Save File and Save Document', 'save')
    expect(result).toEqual([
      { text: 'Save', highlight: true },
      { text: ' File and ', highlight: false },
      { text: 'Save', highlight: true },
      { text: ' Document', highlight: false }
    ])
  })

  test('should handle partial word matches', () => {
    const result = highlightMatch('Format Document', 'form')
    expect(result).toEqual([
      { text: 'Form', highlight: true },
      { text: 'at Document', highlight: false }
    ])
  })

  test('should handle no matches', () => {
    const result = highlightMatch('Save File', 'xyz')
    expect(result).toEqual([
      { text: 'Save File', highlight: false }
    ])
  })

  test('should handle empty search query', () => {
    const result = highlightMatch('Save File', '')
    expect(result).toEqual([
      { text: 'Save File', highlight: false }
    ])
  })

  test('should handle special regex characters in query', () => {
    const result = highlightMatch('File (test)', '(test)')
    expect(result).toEqual([
      { text: 'File ', highlight: false },
      { text: '(test)', highlight: true }
    ])
  })

  test('should handle overlapping matches gracefully', () => {
    const result = highlightMatch('JavaScript', 'script')
    expect(result).toEqual([
      { text: 'Java', highlight: false },
      { text: 'Script', highlight: true }
    ])
  })
})
```

### 1.8. Customization and Extensibility

#### 1.8.1. Slot System
```typescript
describe('VCommandPalette - Slot System', () => {
  test('should support header slot', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true },
      slots: {
        header: '<div class="custom-header">Custom Header</div>'
      }
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').text()).toBe('Custom Header')
  })

  test('should support searchControls slot with scope', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true },
      slots: {
        searchControls: `
          <template #searchControls="{ searchQuery, onSearch, placeholder, loading }">
            <input
              class="custom-search"
              :value="searchQuery"
              :placeholder="placeholder"
              @input="onSearch($event.target.value)"
            />
            <span v-if="loading">Loading...</span>
          </template>
        `
      }
    })

    expect(wrapper.find('.custom-search').exists()).toBe(true)
  })

  test('should support item slot with scope', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      },
      slots: {
        item: `
          <template #item="{ item, selected, onExecute }">
            <div class="custom-item" :class="{ selected }" @click="onExecute">
              {{ item.title }}
            </div>
          </template>
        `
      }
    })

    expect(wrapper.find('.custom-item').exists()).toBe(true)
    expect(wrapper.find('.custom-item').text()).toBe('Save File')
  })

  test('should support no-results slot', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [],
        modelValue: true
      },
      slots: {
        'no-results': '<div class="custom-empty">No actions found</div>'
      }
    })

    expect(wrapper.find('.custom-empty').exists()).toBe(true)
    expect(wrapper.find('.custom-empty').text()).toBe('No actions found')
  })

  test('should support loader slot', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [{
          id: 'slow',
          search: () => new Promise(resolve => setTimeout(resolve, 1000))
        }],
        modelValue: true
      },
      slots: {
        loader: '<div class="custom-loader">Custom Loading...</div>'
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.custom-loader').exists()).toBe(true)
  })

  test('should support footer slot', () => {
    const wrapper = mount(VCommandPalette, {
      props: { modelValue: true },
      slots: {
        footer: '<div class="custom-footer">Footer Content</div>'
      }
    })

    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  test('should maintain accessibility in custom slots', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      },
      slots: {
        item: `
          <template #item="{ item, selected }">
            <div
              class="custom-item"
              role="option"
              :aria-selected="selected"
            >
              {{ item.title }}
            </div>
          </template>
        `
      }
    })

    const customItem = wrapper.find('.custom-item')
    expect(customItem.attributes('role')).toBe('option')
    expect(customItem.attributes('aria-selected')).toBeDefined()
  })
})
```

## 2. Integration Tests

### 2.1. Search Provider Integration

#### 2.1.1. External Search Providers
```typescript
describe('VCommandPalette - Search Provider Integration', () => {
  const mockFileProvider = {
    id: 'files',
    title: 'Files',
    search: vi.fn().mockResolvedValue([
      {
        id: 'file1',
        title: 'test.js',
        description: 'JavaScript file',
        group: 'Files',
        type: 'file'
      }
    ])
  }

  const mockUserProvider = {
    id: 'users',
    title: 'Users',
    search: vi.fn().mockResolvedValue([
      {
        id: 'user1',
        title: 'John Doe',
        description: 'Developer',
        group: 'Team',
        type: 'user'
      }
    ])
  }

  test('should query multiple search providers simultaneously', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [mockFileProvider, mockUserProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(mockFileProvider.search).toHaveBeenCalledWith('test', {})
    expect(mockUserProvider.search).toHaveBeenCalledWith('test', {})
  })

  test('should merge results from multiple providers', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [mockFileProvider, mockUserProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredItems).toHaveLength(2)
    expect(wrapper.vm.filteredItems.find(item => item.title === 'test.js')).toBeDefined()
    expect(wrapper.vm.filteredItems.find(item => item.title === 'John Doe')).toBeDefined()
  })

  test('should handle search provider errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const failingProvider = {
      id: 'failing',
      title: 'Failing Provider',
      search: vi.fn().mockRejectedValue(new Error('Provider failed'))
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [mockFileProvider, failingProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    // Should still show results from working provider
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('test.js')

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Search provider "failing" failed'),
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  test('should pass application context to search providers', async () => {
    const context = { currentProject: 'myapp', user: 'developer' }
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [mockFileProvider],
        applicationContext: context,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(mockFileProvider.search).toHaveBeenCalledWith('test', context)
  })

  test('should use prop-provided applicationContext in standalone mode', async () => {
    const propContext = { currentProject: 'standalone-app', user: 'standalone-user' }
    const standaloneProvider = {
      id: 'standalone',
      title: 'Standalone Provider',
      search: vi.fn().mockResolvedValue([])
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false, // Explicit standalone mode
        searchProviders: [standaloneProvider],
        applicationContext: propContext,
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    // Verify prop-based context is passed to provider, not ActionCore context
    expect(standaloneProvider.search).toHaveBeenCalledWith('test', propContext)
  })

  test('should support context filtering of providers', () => {
    const contextFilterProvider = {
      id: 'conditional',
      title: 'Conditional Provider',
      search: vi.fn().mockResolvedValue([]),
      contextFilter: (context) => context.userRole === 'admin'
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [contextFilterProvider],
        applicationContext: { userRole: 'user' },
        modelValue: true
      }
    })

    // Provider should be filtered out
    expect(wrapper.vm.activeSearchProviders).toHaveLength(0)
  })
})
```

#### 2.1.2. ActionCore Search Provider Integration
```typescript
describe('VCommandPalette - ActionCore Search Provider Integration', () => {
  const mockActionCoreProvider = {
    id: 'actioncore-files',
    title: 'ActionCore Files',
    search: vi.fn().mockResolvedValue([])
  }

  const mockActionCore = {
    getVisibleActions: vi.fn(() => []),
    getApplicationContext: vi.fn(() => ({ view: 'editor' })),
    executeAction: vi.fn(),
    getActiveSearchProviders: vi.fn(() => [mockActionCoreProvider])
  }

  test('should integrate ActionCore search providers with prop-provided ones', async () => {
    const propProvider = {
      id: 'prop-provider',
      title: 'Prop Provider',
      search: vi.fn().mockResolvedValue([])
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: true,
        searchProviders: [propProvider],
        modelValue: true
      },
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    // Should query both ActionCore and prop providers
    expect(mockActionCoreProvider.search).toHaveBeenCalled()
    expect(propProvider.search).toHaveBeenCalled()
  })

  test('should re-query providers when ActionCore context changes', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: true,
        searchProviders: [mockActionCoreProvider],
        modelValue: true
      },
      global: {
        provide: {
          [ActionCoreKey as symbol]: mockActionCore
        }
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    const initialCallCount = mockActionCoreProvider.search.mock.calls.length

    // Simulate context change
    mockActionCore.getApplicationContext.mockReturnValue({ view: 'dashboard' })
    wrapper.vm.actionCoreContext = { view: 'dashboard' }
    await wrapper.vm.$nextTick()

    expect(mockActionCoreProvider.search.mock.calls.length).toBeGreaterThan(initialCallCount)
  })
})
```

### 2.2. Context Management Integration

#### 2.2.1. Context Updates and Re-queries
```typescript
describe('VCommandPalette - Context Management', () => {
  test('should watch application context changes in standalone mode', async () => {
    const searchProvider = {
      id: 'context-aware',
      title: 'Context Aware',
      search: vi.fn().mockResolvedValue([])
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        applicationContext: { view: 'editor' },
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    const initialCallCount = searchProvider.search.mock.calls.length

    // Change context
    await wrapper.setProps({
      applicationContext: { view: 'dashboard' }
    })

    expect(searchProvider.search.mock.calls.length).toBeGreaterThan(initialCallCount)
  })

  test('should detect significant context changes', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        modelValue: true
      }
    })

    const oldContext = { view: 'editor', selectedItems: [] }
    const newContext = { view: 'dashboard', selectedItems: [] }

    expect(wrapper.vm.hasSignificantContextChange(newContext, oldContext)).toBe(true)
  })

  test('should ignore insignificant context changes', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        modelValue: true
      }
    })

    const oldContext = { view: 'editor', lastSaved: '2023-01-01' }
    const newContext = { view: 'editor', lastSaved: '2023-01-02' }

    expect(wrapper.vm.hasSignificantContextChange(newContext, oldContext)).toBe(false)
  })
})
```

### 2.3. Result Ordering and Grouping

#### 2.3.1. Custom Result Ordering
```typescript
describe('VCommandPalette - Result Ordering', () => {
  test('should apply custom ordering from resultOrdering prop', async () => {
    const results = [
      { id: '1', title: 'Zebra', relevanceScore: 0.8, group: 'Animals' },
      { id: '2', title: 'Apple', relevanceScore: 0.9, group: 'Fruits' },
      { id: '3', title: 'Bear', relevanceScore: 0.7, group: 'Animals' }
    ]

    const searchProvider = {
      id: 'test',
      search: vi.fn().mockResolvedValue(results)
    }

    const customOrderFn = (a, b) => a.title.localeCompare(b.title)

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        resultOrdering: { customOrderFn },
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    const orderedTitles = wrapper.vm.filteredItems.map(item => item.title)
    expect(orderedTitles).toEqual(['Apple', 'Bear', 'Zebra'])
  })

  test('should fall back to searchConfiguration.customOrderFn when resultOrdering.customOrderFn not provided', async () => {
    const results = [
      { id: '1', title: 'Zebra', relevanceScore: 0.8 },
      { id: '2', title: 'Apple', relevanceScore: 0.9 },
      { id: '3', title: 'Bear', relevanceScore: 0.7 }
    ]

    const searchProvider = {
      id: 'test',
      search: vi.fn().mockResolvedValue(results)
    }

    const fallbackOrderFn = (a, b) => a.title.localeCompare(b.title)

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        searchConfiguration: { customOrderFn: fallbackOrderFn },
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    const orderedTitles = wrapper.vm.filteredItems.map(item => item.title)
    expect(orderedTitles).toEqual(['Apple', 'Bear', 'Zebra'])
  })

  test('should apply group ordering', async () => {
    const results = [
      { id: '1', title: 'Item 1', group: 'Group B' },
      { id: '2', title: 'Item 2', group: 'Group A' },
      { id: '3', title: 'Item 3', group: 'Group C' }
    ]

    const searchProvider = {
      id: 'test',
      search: vi.fn().mockResolvedValue(results)
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        resultOrdering: {
          groupOrder: ['Group A', 'Group C', 'Group B']
        },
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    const orderedGroups = wrapper.vm.filteredItems.map(item => item.group)
    expect(orderedGroups).toEqual(['Group A', 'Group C', 'Group B'])
  })

  test('should fall back to default ordering', async () => {
    const results = [
      { id: '1', title: 'Beta', relevanceScore: 0.8 },
      { id: '2', title: 'Alpha', relevanceScore: 0.9 },
      { id: '3', title: 'Gamma', relevanceScore: 0.7 }
    ]

    const searchProvider = {
      id: 'test',
      search: vi.fn().mockResolvedValue(results)
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    // Should order by relevance score (descending), then alphabetically
    const orderedTitles = wrapper.vm.filteredItems.map(item => item.title)
    expect(orderedTitles).toEqual(['Alpha', 'Beta', 'Gamma'])
  })
})
```

#### 2.3.2. Group Rendering
```typescript
describe('VCommandPalette - Group Rendering', () => {
  test('should render group dividers', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: '1', title: 'Save', group: 'File' },
          { id: '2', title: 'Copy', group: 'Edit' },
          { id: '3', title: 'Open', group: 'File' }
        ],
        modelValue: true
      }
    })

    await wrapper.vm.$nextTick()

    const groupDividers = wrapper.findAll('.v-command-palette__group-divider')
    expect(groupDividers).toHaveLength(2) // File and Edit groups
  })

  test('should not render duplicate group dividers', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: '1', title: 'Save', group: 'File' },
          { id: '2', title: 'Open', group: 'File' },
          { id: '3', title: 'Close', group: 'File' }
        ],
        modelValue: true
      }
    })

    await wrapper.vm.$nextTick()

    const groupDividers = wrapper.findAll('.v-command-palette__group-divider')
    expect(groupDividers).toHaveLength(1) // Only one File group
  })
})
```

## 3. End-to-End Tests

### 3.1. Complete User Workflows

#### 3.1.1. Basic Search and Execute Workflow
```typescript
describe('VCommandPalette - E2E User Workflows', () => {
  test('complete search and execute workflow', async () => {
    const onExecuteAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File', hotkey: 'Ctrl+S' },
          { id: 'open', title: 'Open File', hotkey: 'Ctrl+O' },
          { id: 'format', title: 'Format Document', hotkey: 'Shift+Alt+F' }
        ],
        onExecuteAction,
        modelValue: true
      }
    })

    // User opens command palette (already open via modelValue)
    expect(wrapper.find('.v-command-palette').exists()).toBe(true)

    // User types search query
    const input = wrapper.find('input')
    await input.setValue('save')

    // Results are filtered
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Save File')

    // User navigates (already on first item)
    expect(wrapper.vm.selectedIndex).toBe(0)

    // User executes action
    await input.trigger('keydown', { key: 'Enter' })

    // Action is executed
    expect(onExecuteAction).toHaveBeenCalledWith(
      { id: 'save', title: 'Save File', hotkey: 'Ctrl+S' },
      expect.any(Object)
    )

    // Palette closes (closeOnExecute: true by default)
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  test('search with no results workflow', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' }
        ],
        modelValue: true
      }
    })

    // User searches for non-existent action
    await wrapper.find('input').setValue('nonexistent')

    // No results shown
    expect(wrapper.vm.filteredItems).toHaveLength(0)
    expect(wrapper.find('.v-command-palette__no-results').exists()).toBe(true)

    // User clears search
    await wrapper.find('input').setValue('')

    // All actions shown again
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.find('.v-command-palette__no-results').exists()).toBe(false)
  })

  test('navigation through large list workflow', async () => {
    const largeActionList = Array.from({ length: 100 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeActionList,
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Start at beginning
    expect(wrapper.vm.selectedIndex).toBe(0)

    // Page down multiple times
    await input.trigger('keydown', { key: 'PageDown' })
    expect(wrapper.vm.selectedIndex).toBe(10)

    await input.trigger('keydown', { key: 'PageDown' })
    expect(wrapper.vm.selectedIndex).toBe(20)

    // Jump to end
    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.vm.selectedIndex).toBe(99)

    // Jump to beginning
    await input.trigger('keydown', { key: 'Home' })
    expect(wrapper.vm.selectedIndex).toBe(0)
  })
})
```

#### 3.1.2. Search Provider Workflows
```typescript
describe('VCommandPalette - E2E Search Provider Workflows', () => {
  test('multi-provider search workflow', async () => {
    const fileProvider = {
      id: 'files',
      title: 'Files',
      search: vi.fn().mockResolvedValue([
        { id: 'file1', title: 'config.js', group: 'Files', type: 'file' }
      ])
    }

    const userProvider = {
      id: 'users',
      title: 'Users',
      search: vi.fn().mockResolvedValue([
        { id: 'user1', title: 'John Smith', group: 'Team', type: 'user' }
      ])
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [fileProvider, userProvider],
        modelValue: true
      }
    })

    // User searches
    await wrapper.find('input').setValue('config')
    await wrapper.vm.$nextTick()

    // Both providers are queried
    expect(fileProvider.search).toHaveBeenCalledWith('config', {})
    expect(userProvider.search).toHaveBeenCalledWith('config', {})

    // Results are merged and grouped
    expect(wrapper.vm.filteredItems).toHaveLength(2)
    expect(wrapper.findAll('.v-command-palette__group-divider')).toHaveLength(2)
  })

  test('context-aware search workflow', async () => {
    const contextProvider = {
      id: 'context',
      title: 'Context Provider',
      search: vi.fn().mockImplementation((query, context) => {
        if (context.userRole === 'admin') {
          return Promise.resolve([
            { id: 'admin1', title: 'Admin Action', type: 'admin' }
          ])
        }
        return Promise.resolve([])
      })
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [contextProvider],
        applicationContext: { userRole: 'user' },
        modelValue: true
      }
    })

    // Search as regular user
    await wrapper.find('input').setValue('admin')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredItems).toHaveLength(0)

    // Change to admin role
    await wrapper.setProps({
      applicationContext: { userRole: 'admin' }
    })

    // Results should update automatically
    expect(wrapper.vm.filteredItems).toHaveLength(1)
    expect(wrapper.vm.filteredItems[0].title).toBe('Admin Action')
  })
})
```

### 3.2. Performance Tests

#### 3.2.1. Large Dataset Performance
```typescript
describe('VCommandPalette - Performance', () => {
  test('should remain responsive with large action lists', async () => {
    const largeActionList = Array.from({ length: 5000 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`,
      description: `Description for action ${i}`
    }))

    const startTime = performance.now()

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeActionList,
        modelValue: true
      }
    })

    const mountTime = performance.now() - startTime
    expect(mountTime).toBeLessThan(100) // Should mount quickly

    // Search should be responsive
    const searchStart = performance.now()
    await wrapper.find('input').setValue('Action 1000')
    const searchTime = performance.now() - searchStart

    expect(searchTime).toBeLessThan(50) // Search should be fast
    expect(wrapper.vm.filteredItems).toHaveLength(1)
  })

  test('should implement virtual scrolling for large lists', () => {
    const largeActionList = Array.from({ length: 2000 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeActionList,
        modelValue: true
      }
    })

    // Virtual scrolling should be enabled
    expect(wrapper.vm.containerProps).toBeDefined()
    expect(wrapper.vm.markerProps).toBeDefined()
    expect(wrapper.vm.itemProps).toBeDefined()

    // Only visible items should be rendered
    const renderedItems = wrapper.findAll('.v-command-palette__item')
    expect(renderedItems.length).toBeLessThan(largeActionList.length)
  })

  test('should debounce search input', async () => {
    const searchProvider = {
      id: 'test',
      search: vi.fn().mockResolvedValue([])
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [searchProvider],
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Rapid typing
    await input.setValue('a')
    await input.setValue('ab')
    await input.setValue('abc')

    // Should only call search once after debounce
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(searchProvider.search).toHaveBeenCalledTimes(1)
    expect(searchProvider.search).toHaveBeenLastCalledWith('abc', {})
  })
})
```

### 3.3. Accessibility Tests

#### 3.3.1. ARIA Implementation Tests
```typescript
describe('VCommandPalette - Accessibility', () => {
  test('should implement proper ARIA attributes', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        modelValue: true
      }
    })

    // Dialog attributes
    const dialog = wrapper.find('.v-dialog')
    expect(dialog.attributes('role')).toBe('dialog')
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-labelledby')).toBeDefined()

    // Search input attributes
    const input = wrapper.find('input')
    expect(input.attributes('role')).toBe('combobox')
    expect(input.attributes('aria-expanded')).toBeDefined()
    expect(input.attributes('aria-controls')).toBeDefined()
    expect(input.attributes('aria-activedescendant')).toBeDefined()

    // Results list attributes
    const list = wrapper.find('.v-list')
    expect(list.attributes('role')).toBe('listbox')
    expect(list.attributes('aria-label')).toBe('Search results')

    // Item attributes
    const items = wrapper.findAll('.v-command-palette__item')
    items.forEach((item, index) => {
      expect(item.attributes('role')).toBe('option')
      expect(item.attributes('aria-selected')).toBeDefined()
      expect(item.attributes('id')).toBeDefined()
    })
  })

  test('should update aria-activedescendant on navigation', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    const initialActivedescendant = input.attributes('aria-activedescendant')

    // Navigate down
    await input.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.vm.$nextTick()

    const newActivedescendant = input.attributes('aria-activedescendant')
    expect(newActivedescendant).not.toBe(initialActivedescendant)
  })

  test('should announce search result count', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        modelValue: true
      }
    })

    // Search to filter results
    await wrapper.find('input').setValue('save')
    await wrapper.vm.$nextTick()

    // Should have live region for announcements
    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.exists()).toBe(true)
    expect(liveRegion.text()).toContain('1 result')
  })

  test('should announce empty states via live region', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    // Search for non-existent item
    await wrapper.find('input').setValue('nonexistent')
    await wrapper.vm.$nextTick()

    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.exists()).toBe(true)
    expect(liveRegion.text()).toMatch(/(No results found|0 results)/)
  })

  test('should announce "no actions available" state', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [], // No actions provided
        modelValue: true
      }
    })

    const liveRegion = wrapper.find('[aria-live="polite"]')
    expect(liveRegion.exists()).toBe(true)
    expect(liveRegion.text()).toMatch(/(No actions available|No commands available)/)
  })

  test('should support screen reader navigation', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File', description: 'Save current file' },
          { id: 'open', title: 'Open File', description: 'Open a file' }
        ],
        modelValue: true
      }
    })

    // Items should have proper descriptions
    const items = wrapper.findAll('.v-command-palette__item')
    items.forEach(item => {
      expect(item.attributes('aria-describedby')).toBeDefined()
    })

    // Focus should remain on input during navigation
    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })

    expect(document.activeElement).toBe(input.element)
  })
})
```

#### 3.3.2. Keyboard Navigation Accessibility
```typescript
describe('VCommandPalette - Keyboard Accessibility', () => {
  test('should support all functionality via keyboard', async () => {
    const onExecuteAction = vi.fn()
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        onExecuteAction,
        modelValue: true
      }
    })

    const input = wrapper.find('input')

    // Navigate and execute via keyboard only
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.vm.selectedIndex).toBe(1)

    await input.trigger('keydown', { key: 'Enter' })
    expect(onExecuteAction).toHaveBeenCalledWith(
      { id: 'open', title: 'Open File' },
      expect.any(Object)
    )
  })

  test('should maintain focus appropriately', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    // Focus should remain on input during all interactions
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(document.activeElement).toBe(input.element)

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(document.activeElement).toBe(input.element)
  })

  test('should handle escape key to close', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })
})
```

## 4. Visual and Regression Tests

### 4.1. Component Appearance Tests

#### 4.1.1. Theme Integration
```typescript
describe('VCommandPalette - Visual Theme Tests', () => {
  test('should apply theme classes correctly', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        theme: 'dark',
        modelValue: true
      }
    })

    expect(wrapper.classes()).toContain('v-theme--dark')
  })

  test('should apply density variants', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        density: 'compact',
        modelValue: true
      }
    })

    expect(wrapper.classes()).toContain('v-command-palette--density-compact')
  })

  test('should respect custom styling', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        class: 'custom-palette',
        style: 'border: 2px solid red;',
        modelValue: true
      }
    })

    expect(wrapper.classes()).toContain('custom-palette')
    expect(wrapper.attributes('style')).toContain('border: 2px solid red')
  })
})
```

#### 4.1.2. Visual State Tests
```typescript
describe('VCommandPalette - Visual States', () => {
  test('should show loading state during search', async () => {
    const slowProvider = {
      id: 'slow',
      search: () => new Promise(resolve => setTimeout(resolve, 1000))
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [slowProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.v-command-palette__search-loader').exists()).toBe(true)
    expect(wrapper.find('.v-progress-circular').exists()).toBe(true)
  })

  test('should highlight selected item visually', async () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File' },
          { id: 'open', title: 'Open File' }
        ],
        modelValue: true
      }
    })

    // First item should be selected by default
    let selectedItem = wrapper.find('.v-command-palette__item--selected')
    expect(selectedItem.exists()).toBe(true)

    // Navigate and check selection highlight moves
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.vm.$nextTick()

    const selectedItems = wrapper.findAll('.v-command-palette__item--selected')
    expect(selectedItems).toHaveLength(1) // Only one item should be selected
  })

  test('should display hotkeys correctly', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [
          { id: 'save', title: 'Save File', hotkey: 'Ctrl+S' }
        ],
        modelValue: true
      }
    })

    const hotkeyDisplay = wrapper.find('.v-command-palette__item-hotkey')
    expect(hotkeyDisplay.exists()).toBe(true)
    expect(hotkeyDisplay.findComponent(VHotKey).props('hotkey')).toBe('Ctrl+S')
  })
})
```

## 5. Error Scenario Tests

### 5.1. Edge Cases and Error Conditions

```typescript
describe('VCommandPalette - Error Scenarios', () => {
  test('should handle malformed action data gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const malformedActions = [
      { title: 'No ID Action' }, // Missing required id
      { id: 'no-title' }, // Missing required title
      null, // Invalid action
      undefined // Invalid action
    ]

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: malformedActions,
        modelValue: true
      }
    })

    // Should filter out invalid actions and continue working
    expect(wrapper.vm.allActions.length).toBeLessThan(malformedActions.length)

    consoleSpy.mockRestore()
  })

  test('should handle search provider exceptions', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const explodingProvider = {
      id: 'exploding',
      search: () => {
        throw new Error('Provider exploded')
      }
    }

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        searchProviders: [explodingProvider],
        modelValue: true
      }
    })

    await wrapper.find('input').setValue('test')
    await wrapper.vm.$nextTick()

    // Component should remain functional
    expect(wrapper.vm.isVisible).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Search provider "exploding" failed'),
      expect.any(Error)
    )

    consoleSpy.mockRestore()
  })

  test('should handle memory cleanup on unmount', () => {
    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: [{ id: 'save', title: 'Save File' }],
        modelValue: true
      }
    })

    // Verify cleanup functions exist
    expect(wrapper.vm.unregisterContext).toBeDefined()

    // Unmount should not throw
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
```

## 6. Performance Benchmarks

### 6.1. Performance Metrics

```typescript
describe('VCommandPalette - Performance Benchmarks', () => {
  test('search performance with 10k actions', async () => {
    const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`,
      description: `Description for action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeDataset,
        modelValue: true
      }
    })

    const searchStart = performance.now()
    await wrapper.find('input').setValue('Action 5000')
    const searchEnd = performance.now()

    expect(searchEnd - searchStart).toBeLessThan(100) // Should complete quickly
    expect(wrapper.vm.filteredItems).toHaveLength(1)
  })

  test('memory usage with large datasets', () => {
    const memoryBefore = (performance as any).memory?.usedJSHeapSize || 0

    const largeDataset = Array.from({ length: 5000 }, (_, i) => ({
      id: `action-${i}`,
      title: `Action ${i}`
    }))

    const wrapper = mount(VCommandPalette, {
      props: {
        useActionCore: false,
        actions: largeDataset,
        modelValue: true
      }
    })

    const memoryAfter = (performance as any).memory?.usedJSHeapSize || 0

    // Memory increase should be reasonable
    if (memoryBefore > 0 && memoryAfter > 0) {
      const memoryIncrease = memoryAfter - memoryBefore
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024) // Less than 50MB
    }

    wrapper.unmount()
  })
})
```

## Test Setup and Configuration

### Testing Utilities

```typescript
// test-utils/VCommandPaletteTestUtils.ts
import { highlightMatch } from '@/labs/VActionCore/components/VCommandPalette/utils'

export const createMockActionCore = (overrides = {}) => ({
  getVisibleActions: vi.fn(() => []),
  getApplicationContext: vi.fn(() => ({})),
  executeAction: vi.fn(),
  getActiveSearchProviders: vi.fn(() => []),
  ...overrides
})

export const createMockSearchProvider = (id: string, results = []) => ({
  id,
  title: `${id} Provider`,
  search: vi.fn().mockResolvedValue(results)
})

export const createMockActions = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: `action-${i}`,
    title: `Action ${i}`,
    description: `Description ${i}`,
    hotkey: i % 2 === 0 ? `Ctrl+${i}` : undefined
  }))

export const mountCommandPalette = (props = {}, options = {}) =>
  mount(VCommandPalette, {
    props: {
      useActionCore: false,
      modelValue: true,
      ...props
    },
    ...options
  })

// Export highlightMatch for direct unit testing
export { highlightMatch }
```

### Test Configuration

```typescript
// vitest.config.ts additions for VCommandPalette
export default defineConfig({
  test: {
    setupFiles: ['./test-setup/command-palette-setup.ts'],
    environment: 'jsdom',
    globals: true
  }
})

// test-setup/command-palette-setup.ts
import { vi } from 'vitest'

// Mock useKeyBindings for testing
vi.mock('@/composables/key-bindings', () => ({
  useKeyBindings: () => ({
    registerBinding: vi.fn(),
    unregisterBinding: vi.fn(),
    registerContext: vi.fn(),
    unregisterContext: vi.fn()
  }),
  KeyBindingUtils: {
    formatForDisplay: vi.fn().mockReturnValue({
      sequences: [{
        keys: [{ display: 'Ctrl', type: 'modifier' }, { display: 'S', type: 'key' }]
      }],
      sequenceSeparator: ' then ',
      combinationSeparator: '+'
    })
  }
}))

// Mock VHotKey component
vi.mock('@/labs/VActionCore/VHotKey', () => ({
  VHotKey: {
    name: 'VHotKey',
    template: '<span class="v-hotkey">{{ hotkey }}</span>',
    props: ['hotkey', 'size', 'variant']
  }
}))
```

This comprehensive test plan covers all requirements and design specifications for VCommandPalette, ensuring robust testing across unit, integration, end-to-end, and accessibility scenarios.
