import { VCommandPalette } from './VCommandPalette'

// Utilities
import { render, screen, userEvent } from '@test'
import { waitFor } from '@testing-library/vue'
import { computed, defineComponent, h, markRaw, nextTick, ref } from 'vue'
import { isPromise, log } from '../../utils'
import { ActionCore, ActionCoreSymbol } from '@/labs/VActionCore'

// Types
import type { Ref } from 'vue'
import type { ActionCorePublicAPI, ActionDefinition } from '@/labs/VActionCore'
// Removed direct Vuetify service imports (ThemeSymbol, etc.) as render from @test should handle Vuetify context

// Minimal mock icon component
const MockIconComponent = (props: { icon: string | any[], tag: string }) => {
  let iconName = ''
  if (typeof props.icon === 'string') {
    iconName = props.icon
  } else if (Array.isArray(props.icon) && props.icon.length > 0 && typeof props.icon[0] === 'string') {
    iconName = props.icon[0] // Handle cases where icon might be passed as an array by VIcon internals
  } else if (typeof (props.icon as any)?.icon === 'string') {
    iconName = (props.icon as any).icon
  }
  // Basic class, actual VIcon might apply more (e.g., 'mdi' prefix if not in iconName)
  // Ensure 'mdi-' prefix if it's a mdi icon and not already prefixed
  const finalIconName = iconName.startsWith('mdi-') ? iconName : `mdi-${iconName}`
  return h(props.tag || 'i', { class: `mock-icon ${finalIconName}` })
}

// const testIcons: { // Removed global testIcons
// ... existing code ...
// };

// const vuetifyInstance = createVuetify({ // Removed global vuetifyInstance
//   icons: testIcons,
// });

// Use a more complete mock or a real instance for robust testing
const createTestableActionCore = (initialActions: ActionDefinition[] = []) => {
  const core = new ActionCore({ verboseLogging: false })
  if (initialActions.length > 0) {
    const normalizedActions = initialActions.map(act => {
      if (!act.handler && !act.subItems) {
        return { ...act, handler: () => {} }
      }
      return act
    })
    core.registerActionsSource(normalizedActions)
  }
  return core
}

let testActionCoreInstance: ActionCorePublicAPI | null = null; // Type with ActionCorePublicAPI

// Helper to create a mock for ActionCore for tests that don't need full VActionCore behavior
const createMockActionCore = (initialActions: ActionDefinition[] = []): ActionCorePublicAPI => {
  const actionRegistry = new Map<symbol, ActionDefinition[]>()
  let nextSymbolId = 0
  const allActionsRef = ref<Readonly<ActionDefinition<any>[]>>([])

  const updateAllActionsRef = () => {
    allActionsRef.value = Array.from(actionRegistry.values()).flat().map(markRaw)
  }

  const actionCoreAPI: ActionCorePublicAPI = {
    isLoading: ref(false),
    allActions: computed(() => allActionsRef.value), // Ensure this is a computed
    activeProfile: ref(null) as Ref<string | null>,
    getAction: vi.fn(actionId => allActionsRef.value.find(a => a.id === actionId)),
    executeAction: vi.fn(async (actionId, invocationContext) => {
      const action = allActionsRef.value.find(a => a.id === actionId)
      if (action?.handler) {
        await action.handler(invocationContext || {})
      }
    }),
    registerActionsSource: vi.fn((source: any) => { // Changed 'actions' to 'source' to match ActionCore
      const key = Symbol(`test-source-${nextSymbolId++}`)
      let actionsToAdd: ActionDefinition[] = []
      if (Array.isArray(source)) {
        actionsToAdd = source
      } else if (typeof source === 'function') { // Handle function sources if necessary
        const result = source()
        if (isPromise(result)) { // Handle async function sources if necessary
          // This mock doesn't fully handle async sources, but acknowledges the type
          console.warn('[MockActionCore] Async function sources not fully mocked for registration.')
        } else {
          actionsToAdd = result
        }
      } else if (source && typeof source === 'object' && Array.isArray(source.actions)) { // Handle { id, name, actions }
        actionsToAdd = source.actions
      }

      actionRegistry.set(key, actionsToAdd)
      updateAllActionsRef()
      return key
    }),
    unregisterActionsSource: vi.fn((key: symbol) => {
      const success = actionRegistry.delete(key)
      if (success) updateAllActionsRef()
      return success
    }),
    setActiveProfile: vi.fn(),
    destroy: vi.fn(() => {
      actionRegistry.clear()
      updateAllActionsRef()
    }),
  }

  if (initialActions.length > 0) {
    actionCoreAPI.registerActionsSource(initialActions) // Register initial actions
  }

  return actionCoreAPI
}

// Helper function to check toBeDisplayed within a poll safely
async function isElementDisplayed (getElement: () => HTMLElement | null): Promise<boolean> {
  const element = getElement()
  if (!element) return false
  try {
    expect(element).toBeVisible()
    return true
  } catch (e) {
    return false
  }
}

const actionsWithSubitems: ActionDefinition[] = [
  { id: 'act1', title: 'Action One' },
  {
    id: 'act-parent',
    title: 'Parent Action',
    subItems: () => Promise.resolve<ActionDefinition[]>([
      { id: 'act-child1', title: 'Child Action 1' },
      { id: 'act-child2', title: 'Child Action 2' },
    ]),
  },
  { id: 'act3', title: 'Action Three' },
]

const singleActionForSlotTest: ActionDefinition[] = [
  { id: 'action-slot1', title: 'Action For Item Slot', keywords: 'slot, item', group: 'Test' },
]

const searchTestActions: ActionDefinition[] = [
  { id: 's_action1', title: 'Open Project', keywords: 'load, solution', group: 'File' },
  { id: 's_action2', title: 'Save Project', keywords: 'store, solution', group: 'File' },
  { id: 's_action3', title: 'Copy Selection', group: 'Edit' },
  { id: 's_action4', title: 'Find in Files', keywords: 'search, text', group: 'Edit' },
  { id: 's_action5', title: 'Open Document', group: 'Document' },
]

const listRenderTestActions: ActionDefinition[] = [
  { id: 'lr_action1', title: 'Open File With VHotKey', group: 'File', hotkey: 'ctrl+o' },
  { id: 'lr_action2', title: 'Save File Plain', group: 'File' },
  { id: 'lr_action_hidden', title: 'Hidden Action', meta: { paletteHidden: true } },
  { id: 'lr_action3', title: 'Copy Text with VHotKey', group: 'cmd+c' }, // Note: platform specific hotkey
]

const actionsForExecuteTest: ActionDefinition[] = [
  { id: 'exec_action1', title: 'Execute Me And Close', group: 'Test' },
  { id: 'exec_action2', title: 'Execute Me And Stay Open', group: 'Test' },
]

// Re-defining sampleActions from JSDOM test for grouping/sorting test
const sampleActionsForGroupingTest: ActionDefinition[] = [
  { id: 'g_action1', title: 'Open File', keywords: 'load, document', group: 'File', order: 1 },
  { id: 'g_action2', title: 'Save File', hotkey: 'ctrl+s', group: 'File', order: 2 },
  { id: 'g_action3', title: 'Copy Text', group: 'Edit' }, // default order, sorts alphabetically
  { id: 'g_action4', title: 'Paste Text', group: 'Edit' }, // default order, sorts alphabetically
  {
    id: 'g_action5',
    title: 'User Profile', // Ungrouped, default order (after g_action7)
    subItems: () => Promise.resolve<ActionDefinition[]>([
      { id: 'g_action5-1', title: 'View Profile' },
      { id: 'g_action5-2', title: 'Edit Settings', hotkey: 'ctrl+,' },
    ]),
  },
  { id: 'g_action6', title: 'Logout', meta: { paletteHidden: true } }, // Hidden
  { id: 'g_action7', title: 'Go to Settings', order: 1 }, // Ungrouped, explicit order 1
  { id: 'g_action8', title: 'Print Document', group: 'File', order: 0 }, // File group, order 0
  {
    id: 'g_action9',
    title: 'Async SubItems with Loader', // Ungrouped, default order (before g_action5)
    subItems: () => new Promise(resolve => setTimeout(() => resolve([{ id: 'g_action9-1', title: 'Loaded Subitem' }]), 50)),
  },
]

const actionsForLoadingTest: ActionDefinition[] = [
  {
    id: 'async_loader_action',
    title: 'Load Subitems Slowly',
    subItems: () => new Promise(resolve =>
      setTimeout(() => resolve([{
        id: 'loaded_child_1',
        title: 'Slowly Loaded Child 1',
      }]), 100) // 100ms delay
    ),
  },
  { id: 'other_action', title: 'Another Action' },
]

// Actions for empty state test
const noActions: ActionDefinition[] = []

// Moved renderBackspaceTestPalette to a higher scope
const actionsWithParentAndChild: ActionDefinition[] = [
  {
    id: 'parent-for-backspace',
    title: 'Parent for Backspace',
    subItems: () => Promise.resolve<ActionDefinition[]>([
      { id: 'child-bs1', title: 'Child BS1' },
    ]),
  },
  { id: 'other-root-action', title: 'Other Root Action' },
];

// Helper to render VCommandPalette for backspace tests (and now general use if needed)
const renderGenericPaletteTest = (
  props: Partial<any> = {},
  coreActions: ActionDefinition[] = [],
  // Allow providing a specific ActionCore instance, otherwise, a mock is created
  providedActionCoreInstance?: ActionCorePublicAPI
) => {
  const actionCoreToUse = providedActionCoreInstance || createMockActionCore(coreActions);
  const renderResult = render(VCommandPalette, {
    props: {
      modelValue: true, // Default to open
      placeholder: 'Search...', // Default placeholder
      ...props, // Spread incoming props, allowing override
    },
    global: {
      provide: { [ActionCoreSymbol as symbol]: actionCoreToUse },
      // Do not provide vuetifyInstance here unless absolutely necessary and handled carefully
    },
    slots: props.slots, // Pass through slots if provided
  });
  // Return the action core instance that was actually used in provide
  return { ...renderResult, actionCoreInstance: actionCoreToUse };
};

describe('VCommandPalette.spec.browser.tsx', () => {
  afterEach(async () => {
    // Ensure testActionCoreInstance (if used by a test directly) is cleaned up
    if (testActionCoreInstance) {
      testActionCoreInstance.destroy();
      testActionCoreInstance = null;
    }
    // If a test used renderBackspaceTestPalette, its specific core should be cleaned up by the test itself.
  })

  it('v-model controls visibility', async () => {
    const mockActionCore = createMockActionCore()
    const { rerender, unmount } = render(VCommandPalette, {
      props: { modelValue: false, title: 'Test Palette' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
    })
    await nextTick() // Ensure initial render settles

    let dialog = screen.queryByRole('dialog', { name: 'Test Palette' })
    expect(dialog).toBeNull() // Should not be in DOM if modelValue is false

    await rerender({ modelValue: true, title: 'Test Palette' })
    await nextTick() // Ensure rerender settles
    dialog = await screen.findByRole('dialog', { name: 'Test Palette' })
    await expect(dialog).toBeVisible()

    await rerender({ modelValue: false, title: 'Test Palette' })
    await nextTick() // Ensure rerender settles
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Test Palette' })).toBeNull()
    })
    unmount()
  })

  it('Escape key (via VActionCore) closes the palette or navigates back', async () => {
    // For this test, we need a real VActionCore instance to process global key events
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems)

    const { unmount, emitted, rerender } = render(VCommandPalette, {
      props: {
        modelValue: true,
        placeholder: 'Search actions...',
        title: 'Escape Test Palette',
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
      },
    })
    await nextTick() // Ensure initial render settles

    const searchInput = await screen.findByPlaceholderText('Search actions...')
    await userEvent.click(searchInput) // Ensure focus for keyboard events

    // 1. Press Escape at root level - should close
    await userEvent.keyboard('{escape}')
    // Check for modelValue update event or dialog disappearance
    await waitFor(() => {
      expect(emitted()['update:modelValue'][0]).toEqual([false])
    })
    expect(screen.queryByRole('dialog', { name: 'Escape Test Palette' })).toBeNull()

    // Re-open for nesting test by updating props (simpler than full unmount/remount here)
    // Need to ensure component is reactive to modelValue changes for re-opening
    // This requires VCommandPalette to be wrapped or modelValue handled by a parent test component
    // For simplicity here, we'll unmount and remount with a new ActionCore instance if needed
    // unmount(); // Commenting out unmount, will try rerender
    // if (testActionCoreInstance) testActionCoreInstance.cleanup();
    // testActionCoreInstance = createTestableActionCore(actionsWithSubitems);

    // const { unmount: unmount2, emitted: emitted2 } = render(VCommandPalette, { // Original line
    await rerender({
      props: { // Rerender with new props, modelValue: true to reopen
        modelValue: true,
        placeholder: 'Search actions...',
        title: 'Escape Test Palette Nested',
        // We need to ensure the ActionCore instance is the same or re-provided if necessary.
        // For this test, testActionCoreInstance is defined in the outer scope and should persist.
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance }, // Re-provide if necessary
      },
    })
    await nextTick()

    const searchInputNested = await screen.findByPlaceholderText('Search actions...')
    await userEvent.click(searchInputNested) // Focus

    const parentActionItem = await screen.findByText('Parent Action')
    await userEvent.click(parentActionItem)
    await screen.findByText('Child Action 1') // Wait for sub-items to appear
    await expect(screen.findByText('Parent Action', { selector: '.v-command-palette__title' })).resolves.toBeVisible()

    // 2. Press Escape at nested level - should navigate back
    await userEvent.keyboard('{escape}')
    await screen.findByText('Commands', { selector: '.v-command-palette__title' }) // Back to root title
    expect(screen.queryByText('Child Action 1')).toBeNull()
    expect(screen.getByRole('dialog', { name: 'Escape Test Palette Nested' })).toBeVisible() // Still open

    // 3. Press Escape again at root level - should close
    await userEvent.keyboard('{escape}')
    await waitFor(() => {
      expect(emitted()['update:modelValue'].find(e => (e as any[])[0] === false)).toBeTruthy()
    })
    expect(screen.queryByRole('dialog', { name: 'Escape Test Palette Nested' })).toBeNull()

    unmount()
  })

  it('item slot renders custom item structure and receives scope', async () => {
    const mockActionCore = createMockActionCore(singleActionForSlotTest)
    let receivedScope: any = null

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Item Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
      slots: {
        item: (scope: any) => {
          receivedScope = { ...scope }
          return h('div', {
            class: 'custom-item-slot',
            'data-action-id': scope.action.id,
            'data-selected': scope.isSelected,
          }, `ITEM: ${scope.action.title} - Selected: ${String(scope.isSelected)}`)
        },
      },
    })

    const customItemElement = await screen.findByText(/ITEM: Action For Item Slot - Selected: true/i, { selector: '.custom-item-slot' })
    expect(customItemElement).toBeVisible()
    expect(customItemElement).toHaveAttribute('data-action-id', 'action-slot1')
    expect(customItemElement).toHaveAttribute('data-selected', 'true')

    expect(receivedScope).not.toBeNull()
    expect(receivedScope.action.id).toBe('action-slot1')
    expect(receivedScope.isSelected).toBe(true)
    expect(typeof receivedScope.getItemHtmlId).toBe('function')
    unmount()
  })

  it('header slot renders custom header and receives scope', async () => {
    const mockActionCore = createMockActionCore(actionsWithSubitems)
    let receivedScope: any = null

    // Reverted to rendering VCommandPalette directly for the header slot test
    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        title: 'Header Slot Direct Test',
        // VCommandPalette does not take a direct 'actions' prop.
        // Actions are made available via ActionCoreSymbol provide.
      },
      global: {
        provide: {
          [ActionCoreSymbol as symbol]: mockActionCore,
        },
      },
      slots: {
        header: (scope: any) => {
          receivedScope = { ...scope }
          return h('div', { class: 'custom-header-slot' }, [
                    `Custom Header: ${scope.title} ${scope.parentAction ? '(Sub)' : '(Root)'}`,
                    scope.parentAction && h('button', {
                      'data-testid': 'custom-back-button',
                      onClick: scope.navigateBack,
                    }, 'Back'),
          ])
        },
      },
    })

    await nextTick()

    // The console.log for provide options was here previously, it's fine to keep if needed for debugging locally
    // console.log('VCommandPalette.spec.browser.tsx - header slot - direct renderOptions for VCommandPalette:', JSON.stringify(renderOptions.global.provide));

    await screen.findByText(/Custom Header: Commands \(Root\)/i, { selector: '.custom-header-slot' })
    expect(receivedScope.title).toBe('Commands')
    await nextTick()

    const parentActionItem = await screen.findByText('Parent Action')
    await userEvent.click(parentActionItem)
    await nextTick()
    await screen.findByText(/Custom Header: Parent Action \(Sub\)/i, { selector: '.custom-header-slot' })
    expect(receivedScope.title).toBe('Parent Action')
    expect(receivedScope.parentAction.id).toBe('act-parent')
    await nextTick()

    const customBackButton = await screen.findByTestId('custom-back-button')
    await userEvent.click(customBackButton)
    await nextTick()
    await screen.findByText(/Custom Header: Commands \(Root\)/i, { selector: '.custom-header-slot' })
    expect(receivedScope.parentAction).toBeUndefined()

    unmount()
  })

  it('searchControls slot replaces search area and receives scope', async () => {
    const mockActionCore = createMockActionCore(searchTestActions)
    let receivedSearchScope: any = null
    const placeholderText = 'Custom Search Area'

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Search Slot Test Unique', placeholder: 'Original Placeholder' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
      slots: {
        searchControls: (scope: any) => {
          receivedSearchScope = { ...scope }

          // Directly return the h('input', ...) VNode
          // Assign scope.inputRef.value to a mock that points to this input element
          // This is a simplified mock of what VTextField might expose on its instance
          const onInput = (e: Event) => { scope.searchText.value = (e.target as HTMLInputElement).value }
          const onFocus = (e: Event) => { console.log('[CustomInput FOCUS IN SLOT]', e.target) }
          const onBlur = (e: Event) => { console.log('[CustomInput BLUR IN SLOT]', e.target) }

          // Create a ref for the input element itself
          let actualInputEl: HTMLInputElement | null = null

          // Mock the VTextField instance structure for inputRef
          // $el should be the root of the (mocked) component, which is the input itself here.
          scope.inputRef.value = {
            focus: () => actualInputEl?.focus(),
            get $el () { return actualInputEl },
          } as any

          return h('input', {
            type: 'text',
            ref: (el) => { actualInputEl = el as HTMLInputElement }, // Capture the actual input element
            value: scope.searchText.value,
            onInput,
            onFocus, // Added for debugging
            onBlur,  // Added for debugging
            placeholder: placeholderText,
            class: 'custom-search-input-direct', // New class for clarity
            id: 'custom-search-input-for-test-direct', // New ID
          })
        },
      },
    })
    await nextTick()

    const customInput = await waitFor(() => screen.getByPlaceholderText(placeholderText))
    expect(customInput).toBeVisible()
    // Ensure the input is considered focusable by userEvent before typing
    await userEvent.click(customInput)

    expect(screen.queryByPlaceholderText('Original Placeholder')).toBeNull()

    expect(receivedSearchScope).not.toBeNull()
    expect(receivedSearchScope.searchText).toBeDefined()
    expect(receivedSearchScope.placeholder).toBe('Original Placeholder') // Prop is still passed
    expect(receivedSearchScope.inputRef).toBeDefined()
    expect(receivedSearchScope.listId).toBeDefined()

    await userEvent.type(customInput, 'Project')
    await nextTick() // Ensure filtering applies
    expect(receivedSearchScope.searchText.value).toBe('Project')
    // Check if filtering works with custom input (relies on core logic reacting to searchText)
    await screen.findByText('Open Project')
    expect(screen.queryByText('Copy Selection')).toBeNull()

    unmount()
  })

  it('listWrapper slot replaces list area and receives scope', async () => {
    const mockActionCore = createMockActionCore(searchTestActions.slice(0, 2)) // Use 2 actions
    let receivedListScope: any = null

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'List Wrapper Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
      slots: {
        listWrapper: (scope: any) => {
          receivedListScope = { ...scope }
          return h('div', { class: 'custom-list-wrapper', id: scope.listId, ref: el => scope.listRef.value = el as any },
            scope.actions.map((action: any, index: number) =>
              h('div', {
                class: 'custom-list-item',
                'data-action-id': action.isHeader ? action.id : action.id,
                onClick: () => !action.isHeader && scope.handleItemActivated(action),
              }, action.title)
            )
          )
        },
      },
    })

    await screen.findByText('Open Project', { selector: '.custom-list-item' })
    await screen.findByText('Save Project', { selector: '.custom-list-item' })
    expect(screen.queryByRole('listbox')).toBeNull() // Default listbox shouldn't be there

    expect(receivedListScope).not.toBeNull()
    expect(receivedListScope.actions.length).toBeGreaterThanOrEqual(2) // Group header + 2 actions
    expect(receivedListScope.selectedIndex).toBeDefined()
    expect(receivedListScope.listId).toBeDefined()
    expect(receivedListScope.listRef).toBeDefined()
    expect(typeof receivedListScope.handleItemActivated).toBe('function')

    // Test interaction (click)
    const openProjectCustomItem = await screen.findByText('Open Project', { selector: '.custom-list-item' })
    await userEvent.click(openProjectCustomItem)
    expect(mockActionCore.executeAction).toHaveBeenCalledWith('s_action1', expect.anything())

    unmount()
  })

  it('loader slot replaces default loader', async () => {
    const mockActionCore = createMockActionCore(actionsForLoadingTest)
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Loader Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
      slots: {
        loader: (scope: { isLoading: Ref<boolean> }) => {
          return scope.isLoading.value ? h('div', { class: 'custom-loader' }, 'Custom Loading...') : null
        },
      },
    })

    const asyncActionItem = await screen.findByText('Load Subitems Slowly')
    await userEvent.click(asyncActionItem)

    const customLoader = await screen.findByText('Custom Loading...', { selector: '.custom-loader' })
    expect(customLoader).toBeVisible()
    expect(screen.queryByRole('progressbar')).toBeNull() // Default loader not present

    await screen.findByText('Slowly Loaded Child 1') // Wait for loading to finish
    expect(screen.queryByText('Custom Loading...')).toBeNull() // Custom loader also gone

    unmount()
  })

  it('footer slot renders custom content and receives navigation actions', async () => {
    // Use real ActionCore for navigation actions to be registered correctly
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems)
    let receivedFooterScope: any = null

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Footer Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
      slots: {
        footer: (scope: any) => {
          receivedFooterScope = { ...scope }
          return h('div', { class: 'custom-footer' },
            scope.navigationActions.map((action: ActionDefinition) =>
              h('span', { key: action.id, class: 'footer-nav-action' }, `${action.title}: ${action.hotkey}`)
            ).join(', ')
          )
        },
      },
    })

    const customFooter = await screen.findByText(/Navigate Down: arrowdown/, { selector: '.custom-footer' })
    expect(customFooter).toBeVisible()
    expect(receivedFooterScope).not.toBeNull()
    expect(receivedFooterScope.navigationActions.length).toBeGreaterThan(0)
    expect(receivedFooterScope.actionCoreInstance).toBe(testActionCoreInstance)
    expect(receivedFooterScope.core).toBeDefined()
    // Check one of the default hotkeys
    expect(customFooter.textContent).toContain('Select Item: enter')

    unmount()
  })

  it('empty-state slot renders when no actions are available', async () => {
    const mockActionCore = createMockActionCore(noActions) // No actions registered
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Empty State Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
      slots: {
        'empty-state': (scope: any) => {
          return h('div', { class: 'custom-empty-state' }, 'No commands available right now.')
        },
      },
    })

    const emptyStateContent = await screen.findByText('No commands available right now.', { selector: '.custom-empty-state' })
    expect(emptyStateContent).toBeVisible()
    // Ensure default parts like search or list are not rendered
    expect(screen.queryByRole('searchbox')).toBeNull() // Default VCommandPaletteSearch
    expect(screen.queryByRole('listbox')).toBeNull() // Default VCommandPaletteList

    unmount()
  })

  it('ArrowDown/ArrowUp changes selectedIndex and aria-activedescendant (VActionCore)', async () => {
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems) // Real AC
    const placeholderText = 'Search actions...'

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, placeholder: placeholderText, title: 'Nav Test Palette' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
    })

    const searchInput = await screen.findByPlaceholderText(placeholderText)
    await userEvent.click(searchInput) // Focus input

    let selectableItems: HTMLElement[] = []
    await waitFor(() => {
      selectableItems = screen.queryAllByRole('option').filter(el => el instanceof HTMLElement && el.offsetParent !== null) as HTMLElement[]
      expect(selectableItems.length).toBeGreaterThanOrEqual(2)
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[0].id)
    })

    // ArrowDown
    await userEvent.keyboard('{arrowdown}')
    await waitFor(() => {
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[1].id)
    })
    expect(selectableItems[1]).toHaveClass('v-command-palette__item--selected')

    // ArrowUp
    await userEvent.keyboard('{arrowup}')
    await waitFor(() => {
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[0].id)
    })
    expect(selectableItems[0]).toHaveClass('v-command-palette__item--selected')
    expect(selectableItems[1]).not.toHaveClass('v-command-palette__item--selected')

    unmount()
  })

  it('Enter key executes the selected action (VActionCore)', async () => {
    const executeSpy = vi.fn()
    const firstAction = { ...actionsWithSubitems[0], handler: executeSpy } // Add a handler to spy on
    testActionCoreInstance = createTestableActionCore([firstAction, ...actionsWithSubitems.slice(1)])
    const placeholderText = 'Search actions...'

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, placeholder: placeholderText, title: 'Enter Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
    })

    const searchInput = await screen.findByPlaceholderText(placeholderText)
    await userEvent.click(searchInput)

    await waitFor(() => {
      const items = screen.queryAllByRole('option').filter(el => el instanceof HTMLElement && el.offsetParent !== null) as HTMLElement[]
      expect(items.length).toBeGreaterThan(0)
      expect(searchInput).toHaveAttribute('aria-activedescendant', items[0].id)
      expect(items[0].textContent).toContain(firstAction.title)
    })

    await userEvent.keyboard('{enter}')
    await waitFor(() => {
      // The executeAction on the *mock* ActionCore won't be called directly by the *real* ActionCore
      // Instead, the *handler* of the action itself (if defined) will be called.
      // Or, if no handler, the subItems function or other default behavior.
      // Here, we added a handler to the action definition passed to the real ActionCore.
      expect(executeSpy).toHaveBeenCalled()
    })
    unmount()
  })

  it('verifies actions are grouped with VListSubheader and sorted correctly (unchanged)', async () => {
    const mockActionCore = createMockActionCore(sampleActionsForGroupingTest)
    const paletteTitle = 'Grouping Test Unique' // This title will be used for aria-label and listbox name
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: paletteTitle, hotkeyDisplayMode: 'text' as const },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
    })
    await nextTick() // Ensure palette and list render

    const listContainer = await screen.findByRole('listbox', { name: paletteTitle })
    await waitFor(() => expect(listContainer.children.length).toBeGreaterThan(0))

    const renderedElements = Array.from(listContainer.querySelectorAll('.v-list-subheader, .v-list-item[role="option"]'))
    const visibleTexts = renderedElements.map(el => el.textContent?.trim())

    // Expected sequence based on sampleActionsForGroupingTest, adjusted for VHotKey rendering
    const expectedSequenceTexts = [
      'File',
      'Print Document',
      'Open File',
      expect.stringMatching(/Save File Ctrl\+S/i), // Match literal string
      'Edit',
      'Copy Text',
      'Paste Text',
      'Go to Settings',
      'Async SubItems with Loader',
      'User Profile',
    ]

    expect(visibleTexts).toHaveLength(expectedSequenceTexts.length)
    visibleTexts.forEach((text, i) => {
      if (typeof expectedSequenceTexts[i] === 'string') {
        expect(text).toBe(expectedSequenceTexts[i])
      } else { // RegExp
        expect(text).toMatch(expectedSequenceTexts[i] as RegExp)
      }
    })
    unmount()
  })

  it('checks for correct ARIA roles and attributes', async () => {
    const basicMockActionCore = createMockActionCore([]) // Minimal mock
    const paletteTitle = 'ARIA Test Palette Unique'

    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        title: paletteTitle,
        // placeholder prop will use VCommandPalette's default
      },
      global: {
        provide: {
          [ActionCoreSymbol as symbol]: basicMockActionCore,
        },
      },
    })
    await nextTick() // Initial render

    // 1. Test Dialog presence and basic ARIA
    const dialogElement = await screen.findByRole('dialog', { name: paletteTitle })
    expect(dialogElement).toBeVisible()
    expect(dialogElement).toHaveAttribute('aria-modal', 'true')

    // 2. Test for Search Input (using default placeholder)
    const defaultPlaceholder = 'Type a command or search...' // Default from VCommandPalette props
    // Use waitFor with getByPlaceholderText for the default input
    const searchInput = await waitFor(() => screen.getByPlaceholderText(defaultPlaceholder), { timeout: 3000 })
    expect(searchInput).toBeVisible()

    const comboboxElement = searchInput.closest('[role="combobox"].v-text-field')
    expect(comboboxElement).not.toBeNull()
    if (comboboxElement) { // Type guard for TypeScript
      expect(comboboxElement).toHaveAttribute('aria-haspopup', 'listbox')
      // aria-expanded might be true or false depending on whether items are present and list is open
      // For this basic test, we'll just check it exists.
      expect(comboboxElement.hasAttribute('aria-expanded')).toBe(true)
      const listId = comboboxElement.getAttribute('aria-controls')
      expect(listId).toBeDefined()

      // 3. Test for Listbox (basic presence, might be empty)
      if (listId) { // listId might be null if something went wrong
        const listboxElement = await screen.findByRole('listbox', { name: paletteTitle }) // Listbox should be labelled by palette title
        await nextTick()
        expect(listboxElement).toBeVisible()
        expect(listboxElement).toHaveAttribute('id', listId)
        // The listbox is labelled by the VCommandPaletteHeader's title span.
        // VCommandPaletteHeader creates an ID like `${props.listId}-title`
        // The VCommandPalette passes its internal listId to VCommandPaletteHeader.
        // The VCommandPalette's main div aria-label is props.title.
        // VDialog has no direct label by default in this setup.
        // The listbox is labelled by the title element *within* the header.
        // So, its accessible name should correspond to the VCommandPalette's title.
        expect(listboxElement).toHaveAttribute('aria-labelledby', `${listId}-title`)
        expect(comboboxElement).toHaveAttribute('aria-labelledby', `${listId}-title`)
      }
    }

    // More detailed checks (like aria-activedescendant and item selection) are omitted for this basic render test.

    unmount()
  })

  it('no-results slot renders custom content when no actions match', async () => {
    // Provide an empty list of actions to easily trigger no-results
    const mockActionCore = createMockActionCore([])
    const placeholderText = 'Search actions...' // This is the default placeholder of VCommandPaletteSearch
    const customNoResultsText = 'Custom: Nothing found here!'

    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        placeholder: placeholderText, // Matching VCommandPaletteSearch's default
        title: 'No Results Slot Test Unique Title', // Added unique title
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
      slots: {
        'no-results': (scope: any) => (
          h('div', { class: 'custom-no-results-slot' }, [
            `${customNoResultsText} (Query: ${scope.searchText})`,
          ])
        ),
      },
    })
    await nextTick() // Ensure palette renders

    const searchInput = await screen.findByPlaceholderText(placeholderText)
    await nextTick() // Ensure focusability
    await userEvent.click(searchInput)
    expect(document.activeElement === searchInput).toBe(true)

    await userEvent.type(searchInput, 'abc')
    await nextTick() // Ensure slot content updates

    // Verify the custom no-results slot content
    const customSlotElement = await screen.findByText(new RegExp(customNoResultsText, 'i'))
    expect(customSlotElement).toBeVisible()
    expect(customSlotElement).toHaveClass('custom-no-results-slot')
    expect(customSlotElement.textContent).toContain('(Query: abc)') // Check scope was passed

    // Verify default no-results message is not present
    expect(screen.queryByText('No results found.')).toBeNull()

    unmount()
  })

  it('shows VProgressLinear when subItems are loading and hides it after', async () => {
    const mockActionCore = createMockActionCore(actionsForLoadingTest)

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Loader Progress Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        // plugins: [vuetifyInstance], // Removed vuetifyInstance plugin
      },
    })
    await nextTick() // Ensure palette renders

    const asyncActionItem = await screen.findByText('Load Subitems Slowly')
    await nextTick() // Ensure item is actionable
    await userEvent.click(asyncActionItem)
    await nextTick() // Allow state to update for loader visibility

    // Check for VProgressLinear to appear (by role, no specific name needed for VProgressLinear)
    const progressBar = await screen.findByRole('progressbar', {}, { timeout: 1000 })
    expect(progressBar).toBeVisible()
    expect(progressBar.closest('.v-command-palette__loader')).not.toBeNull()

    // Wait for sub-items to load and loader to disappear
    await screen.findByText('Slowly Loaded Child 1', {}, { timeout: 2000 })

    // Check that VProgressLinear is gone
    expect(screen.queryByRole('progressbar')).toBeNull()
    expect(document.querySelector('.v-command-palette__loader .v-progress-linear')).toBeNull()

    unmount()
  })

  it('breadcrumbMode=\'placeholder\' updates search placeholder on navigation', async () => {
    // Use a real ActionCore instance so that Escape key navigation works via registered nav actions
    const localCoreInstance = createTestableActionCore(actionsWithSubitems)
    const initialPlaceholder = 'Search here...'
    const { unmount, wrapper } = render(VCommandPalette, {
      props: {
        modelValue: true,
        title: 'Placeholder Mode Test',
        placeholder: initialPlaceholder,
        breadcrumbMode: 'placeholder' as const,
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: localCoreInstance },
      },
    })
    await nextTick()

    let searchInput = await screen.findByPlaceholderText(initialPlaceholder)
    expect(searchInput).toBeVisible()

    // Navigate into sub-items
    const parentActionItem = await screen.findByText('Parent Action')
    await userEvent.click(parentActionItem)
    await nextTick()
    await screen.findByText('Child Action 1') // Wait for sub-items to appear

    // Placeholder should now be the parent action's title
    searchInput = await screen.findByPlaceholderText('Parent Action')
    expect(searchInput).toBeVisible()
    expect(screen.queryByText('Parent Action', { selector: '.v-command-palette__title' })).toBeNull() // Header title should not show parent

    // Navigate back
    await userEvent.keyboard('{escape}') // Assuming Escape navigates back
    await nextTick() // Allow stack to update in useCommandPaletteCore

    const core = (wrapper.vm as any)?.core
    expect(core).toBeDefined()

    try {
      await waitFor(async () => { // Make waitFor callback async
        await nextTick(); // Add nextTick inside waitFor
        const rootItems = core.groupedAndSortedActions.value;
        // console.log('[TEST DEBUG] Inside waitFor, groupedAndSortedActions:', JSON.stringify(rootItems));
        expect(rootItems.some((item: any) => item.title === 'Action One')).toBe(true);
      }, { timeout: 3000 }); // Increased timeout slightly
    } catch (e) {
      // Log will still use the last known value from core, which nextTick might not affect if error is immediate
      console.log('[TEST DEBUG] waitFor failed. Last known groupedAndSortedActions directly from core:', JSON.stringify(core.groupedAndSortedActions.value));
      throw e;
    }

    await screen.findByText('Action One', {}, { timeout: 3000 })

    // Placeholder should revert to initial
    searchInput = await screen.findByPlaceholderText(initialPlaceholder)
    expect(searchInput).toBeVisible()
    unmount()
    localCoreInstance.destroy()
  })

  it('breadcrumbMode=\'custom\' renders breadcrumbs slot with scope', async () => {
    const mockActionCore = createMockActionCore(actionsWithSubitems)
    let receivedBreadcrumbsScope: any = null
    const customBreadcrumbText = 'My Custom Breadcrumbs:'

    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        title: 'Custom Breadcrumbs Test',
        breadcrumbMode: 'custom' as const,
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
      slots: {
        breadcrumbs: (scope: any) => {
          receivedBreadcrumbsScope = { ...scope }
          return h('div', { class: 'custom-breadcrumbs-slot' }, `${customBreadcrumbText} ${scope.currentLevelTitle}`)
        },
      },
    })
    await nextTick()

    let customBreadcrumbs = await screen.findByText(`${customBreadcrumbText} Commands`, { selector: '.custom-breadcrumbs-slot' })
    expect(customBreadcrumbs).toBeVisible()
    expect(receivedBreadcrumbsScope.isRootLevel).toBe(true)
    expect(receivedBreadcrumbsScope.currentLevelTitle).toBe('Commands')
    expect(screen.queryByRole('heading', { name: /Parent Action/i })).toBeNull() // Default header title shouldn't render

    // Navigate into sub-items
    const parentActionItem = await screen.findByText('Parent Action')
    await userEvent.click(parentActionItem)
    await nextTick()
    await screen.findByText('Child Action 1')

    customBreadcrumbs = await screen.findByText(`${customBreadcrumbText} Parent Action`, { selector: '.custom-breadcrumbs-slot' })
    expect(customBreadcrumbs).toBeVisible()
    expect(receivedBreadcrumbsScope.isRootLevel).toBe(false)
    expect(receivedBreadcrumbsScope.currentLevelTitle).toBe('Parent Action')
    expect(receivedBreadcrumbsScope.parentAction.id).toBe('act-parent')

    unmount()
  })

  it('breadcrumbMode=\'none\' hides header title and does not change placeholder for sub-levels', async () => {
    const mockActionCore = createMockActionCore(actionsWithSubitems)
    const initialPlaceholder = 'Search (None Mode)'
    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        title: 'None Mode Test',
        placeholder: initialPlaceholder,
        breadcrumbMode: 'none' as const,
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
      },
    })
    await nextTick()

    const searchInput = await screen.findByPlaceholderText(initialPlaceholder)
    expect(searchInput).toBeVisible()
    // Check that the main palette title is still used for the dialog aria-label, but not in header for context
    expect(screen.getByRole('dialog', { name: 'None Mode Test' })).toBeVisible()
    // Specifically check that the .v-command-palette__title element (where parent action title would go) is NOT present or empty
    const headerTitleElement = document.querySelector('.v-command-palette__header .v-command-palette__title')
    expect(headerTitleElement).toBeNull() // Stricter check for absence

    // Navigate into sub-items
    const parentActionItem = await screen.findByText('Parent Action')
    await userEvent.click(parentActionItem)
    await nextTick()
    await screen.findByText('Child Action 1')

    // Placeholder should remain initial, header title should still be absent for parent context
    expect(screen.getByPlaceholderText(initialPlaceholder)).toBeVisible()
    expect(document.querySelector('.v-command-palette__header .v-command-palette__title')).toBeNull()

    unmount()
  })

  // --- START: Focus Behavior Tests ---
  describe('Initial Focus and List Navigation from Search', () => {
    // Simplified actions for these tests to remove complexity of headers/groups initially
    const focusTestActions: ActionDefinition[] = [
      { id: 'item-a1', title: 'Item A1', handler: () => {} },
      { id: 'item-a2', title: 'Item A2', handler: () => {} },
      { id: 'item-b1', title: 'Item B1', handler: () => {} },
    ];

    // Simple test for ActionCore itself
    it('[ActionCore Direct Test] should have initial actions from constructor', async () => {
      const directCore = createTestableActionCore(focusTestActions);
      await nextTick(); // Allow computed properties like allActions to settle
      console.log('[AC Direct Test] directCore.allActions after nextTick:', JSON.stringify(directCore.allActions.value));
      const hasItemA1 = directCore.allActions.value.some(a => a.id === 'item-a1');
      expect(hasItemA1).toBe(true);
      expect(directCore.allActions.value.length).toBeGreaterThanOrEqual(focusTestActions.length);
    });

    it('initial focus is on search input, no item selected', async () => {
      const { unmount, wrapper } = renderGenericPaletteTest({ title: 'Initial Focus Test' }, focusTestActions);
      await nextTick();

      const searchInput = await screen.findByPlaceholderText('Search...');
      expect(document.activeElement?.isSameNode(searchInput)).toBe(true);
      expect(searchInput.hasAttribute('aria-activedescendant')).toBe(false);

      // Verify selectedIndex in core is -1
      const core = (wrapper.vm as InstanceType<typeof VCommandPalette>).core;
      expect(core).toBeDefined();
      expect(core.selectedIndex.value).toBe(-1);

      unmount();
    });

    it('ArrowDown from search input selects the first non-header item', async () => {
      testActionCoreInstance = createTestableActionCore(focusTestActions);
      const { unmount, wrapper } = render(VCommandPalette, {
        props: {
          modelValue: true,
          title: 'ArrowDown from Search Test',
          placeholder: 'Search...',
        },
        global: { provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance } },
      });
      await nextTick();

      // Wait for ActionCore instance to process and expose the actions
      await waitFor(() => {
        const currentActions = testActionCoreInstance!.allActions.value;
        console.log('[TEST DEBUG] testActionCoreInstance.allActions.value directly:', JSON.stringify(currentActions));
        // Check if item-a1 is present
        const hasItemA1 = currentActions.some(a => a.id === 'item-a1');
        console.log('[TEST DEBUG] hasItemA1 in testActionCoreInstance.allActions:', hasItemA1);
        expect(hasItemA1).toBe(true); // This is the assertion that was failing
        expect(currentActions.length).toBeGreaterThanOrEqual(focusTestActions.length);
      });

      const core = (wrapper.vm as InstanceType<typeof VCommandPalette>).core;
      expect(core).toBeDefined();

      // Wait for useCommandPaletteCore to pick up actions
      await waitFor(() => {
        console.log('[TEST DEBUG] testActionCoreInstance.allActions:', JSON.stringify(testActionCoreInstance!.allActions.value));
        console.log('[TEST DEBUG] core.currentRootItems:', JSON.stringify(core.currentRootItems.value));
        console.log('[TEST DEBUG] core.groupedAndSortedActions:', JSON.stringify(core.groupedAndSortedActions.value));
        console.log('[TEST DEBUG] core.isRootLevel:', core.isRootLevel.value);
        console.log('[TEST DEBUG] core.currentParentAction:', JSON.stringify(core.currentParentAction.value));
        expect(core.groupedAndSortedActions.value.length).toBeGreaterThan(0);
        const itemA1 = core.groupedAndSortedActions.value.find((item: any) => item.id === 'item-a1');
        expect(itemA1).toBeDefined();
      });

      const searchInput = await screen.findByPlaceholderText('Search...');
      await userEvent.click(searchInput); // Ensure search input is focused
      expect(document.activeElement?.isSameNode(searchInput)).toBe(true); // Use isSameNode

      await userEvent.keyboard('{arrowdown}');
      await nextTick();

      await waitFor(() => {
        const itemA1Index = core.groupedAndSortedActions.value.findIndex((item: any) => item.id === 'item-a1');
        expect(itemA1Index).toBe(0);
        const itemA1HtmlId = `${core.listId.value}-item-item-a1-${itemA1Index}`;
        expect(searchInput).toHaveAttribute('aria-activedescendant', itemA1HtmlId);
        expect(core.selectedIndex.value).toBe(itemA1Index);
      });

      const itemA1IndexAfter = core.groupedAndSortedActions.value.findIndex((item: any) => item.id === 'item-a1');
      expect(itemA1IndexAfter).not.toBe(-1);
      expect(core.selectedIndex.value).toBe(itemA1IndexAfter);

      const itemA1Element = await screen.findByText('Item A1');
      expect(itemA1Element.closest('.v-list-item')).toHaveClass('v-command-palette__item--selected');

      unmount();
    });

    it('ArrowUp from search input with no selection does nothing to selection', async () => {
      testActionCoreInstance = createTestableActionCore(focusTestActions);
      const { unmount, wrapper } = render(VCommandPalette, {
        props: { modelValue: true, title: 'ArrowUp No Selection Test', placeholder: 'Search...' },
        global: { provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance } },
      });
      await nextTick();
      const core = (wrapper.vm as InstanceType<typeof VCommandPalette>).core;
      expect(core).toBeDefined();

      // Wait for actions to be populated
      await waitFor(() => {
        expect(core.groupedAndSortedActions.value.length).toBeGreaterThan(0);
      });

      const searchInput = await screen.findByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      expect(document.activeElement?.isSameNode(searchInput)).toBe(true);
      expect(searchInput.hasAttribute('aria-activedescendant')).toBe(false);

      await userEvent.keyboard('{arrowup}');
      await nextTick();

      expect(searchInput.hasAttribute('aria-activedescendant')).toBe(false);
      expect(core.selectedIndex.value).toBe(-1);

      unmount();
    });

    it('ArrowUp from first selected item navigates to previous (wraps around or to search)', async () => {
      testActionCoreInstance = createTestableActionCore(focusTestActions);
      const { unmount, wrapper } = render(VCommandPalette, {
        props: { modelValue: true, title: 'ArrowUp From First Test', placeholder: 'Search...'},
        global: { provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance } },
      });
      await nextTick();

      // Wait for ActionCore instance to process and expose the actions
      await waitFor(() => {
        expect(testActionCoreInstance!.allActions.value.length).toBeGreaterThanOrEqual(focusTestActions.length);
        expect(testActionCoreInstance!.allActions.value.some(a => a.id === 'item-a1')).toBe(true);
      });

      const core = (wrapper.vm as InstanceType<typeof VCommandPalette>).core;
      expect(core).toBeDefined();

      // Wait for actions to be populated
      await waitFor(() => {
        expect(core.groupedAndSortedActions.value.length).toBeGreaterThan(0);
        const itemA1Check = core.groupedAndSortedActions.value.find((item: any) => item.id === 'item-a1');
        expect(itemA1Check).toBeDefined();
      });

      const searchInput = await screen.findByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      await userEvent.keyboard('{arrowdown}');
      await nextTick();

      let itemA1Index = -1;
      let itemA1HtmlId: string | undefined;

      await waitFor(() => {
        itemA1Index = core.groupedAndSortedActions.value.findIndex((item: any) => item.id === 'item-a1');
        expect(itemA1Index).not.toBe(-1);
        itemA1HtmlId = `${core.listId.value}-item-item-a1-${itemA1Index}`;
        expect(searchInput).toHaveAttribute('aria-activedescendant', itemA1HtmlId);
        expect(core.selectedIndex.value).toBe(itemA1Index);
      });

      await userEvent.keyboard('{arrowup}');
      await nextTick(); // Added for state update after arrowup

      let itemB1Index = -1;
      let expectedIdForB1: string | undefined;

      await waitFor(() => {
        itemB1Index = core.groupedAndSortedActions.value.findIndex((item: any) => item.id === 'item-b1');
        expect(itemB1Index).not.toBe(-1);
        expectedIdForB1 = `${core.listId.value}-item-item-b1-${itemB1Index}`;
        expect(searchInput).toHaveAttribute('aria-activedescendant', expectedIdForB1);
        expect(core.selectedIndex.value).toBe(itemB1Index);
      }, { timeout: 2000 });

      unmount();
    });
  });
  // --- END: Focus Behavior Tests ---

  // --- START: Backspace Navigation Tests ---
  describe('enableBackspaceNavigation', () => {
    const renderBackspaceTestPalette = (props: Partial<any> = {}) => {
      // Backspace tests often need to inspect/ensure VActionCore behavior, so use a testable one.
      const coreForTest = props.actionCoreInstance || createTestableActionCore(actionsWithParentAndChild);
      const genericRenderOutput = renderGenericPaletteTest(
        { enableBackspaceNavigation: true, title: 'Backspace Nav Test', ...props },
        actionsWithParentAndChild, // Pass actions for consistency, though createTestableActionCore uses its own
        coreForTest
      );
      return {
         ...genericRenderOutput,
         // Explicitly return the instance that needs cleanup if created here.
         // If props.actionCoreInstance was passed, the test should manage its lifecycle.
         createdActionCoreInstance: props.actionCoreInstance ? undefined : coreForTest,
      };
    };

    it('navigates back if Backspace is pressed in an empty search input when not at root', async () => {
      const { unmount, createdActionCoreInstance } = renderBackspaceTestPalette();
      await nextTick();
      const parentItem = await screen.findByText('Parent for Backspace');
      await userEvent.click(parentItem);
      await screen.findByText('Child BS1');
      const searchInput = screen.getByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      expect(searchInput).toHaveValue('');
      await userEvent.keyboard('{Backspace}');
      await waitFor(() => expect(screen.queryByText('Child BS1')).toBeNull());
      expect(await screen.findByText('Parent for Backspace')).toBeVisible();
      expect(screen.getByRole('dialog', { name: 'Backspace Nav Test' })).toBeVisible();
      unmount();
      createdActionCoreInstance?.destroy();
    });

    it('navigates back if Backspace is pressed in search input with cursor at start when not at root', async () => {
      const { unmount, createdActionCoreInstance } = renderBackspaceTestPalette();
      await nextTick();
      const parentItem = await screen.findByText('Parent for Backspace');
      await userEvent.click(parentItem);
      await screen.findByText('Child BS1');
      const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      await userEvent.type(searchInput, 'abc');
      searchInput.setSelectionRange(0, 0);
      expect(searchInput.selectionStart).toBe(0);
      await userEvent.keyboard('{Backspace}');
      await waitFor(() => expect(screen.queryByText('Child BS1')).toBeNull());
      expect(await screen.findByText('Parent for Backspace')).toBeVisible();
      unmount();
      createdActionCoreInstance?.destroy();
    });

    it('does NOT navigate back if Backspace is pressed in search input with text and cursor NOT at start', async () => {
      const { unmount, wrapper, createdActionCoreInstance } = renderBackspaceTestPalette();
      await nextTick();
      const parentItem = await screen.findByText('Parent for Backspace');
      await userEvent.click(parentItem);
      await screen.findByText('Child BS1');
      const searchInput = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      await userEvent.type(searchInput, 'abc');
      await nextTick();
      const vm = wrapper.vm as any;
      const core = vm.core;
      await waitFor(() => expect(core.searchText.value).toBe('abc'));
      searchInput.setSelectionRange(1, 1);
      await userEvent.keyboard('{Backspace}');
      await nextTick();
      expect(searchInput).toHaveValue('bc');
      await waitFor(() => expect(core.searchText.value).toBe('bc'));
      expect(core.isRootLevel.value).toBe(false);
      expect(core.currentParentAction.value?.id).toBe('parent-for-backspace');
      expect(await screen.findByText('No results found.')).toBeVisible();
      expect(screen.queryByText('Child BS1')).toBeNull();
      unmount();
      createdActionCoreInstance?.destroy();
    });

    it('navigates back if Backspace is pressed when a list item is selected (active descendant) and not at root', async () => {
      const localTestActionCore = createTestableActionCore(actionsWithParentAndChild);
      const { unmount, wrapper } = render(VCommandPalette, {
        props: {
          modelValue: true, title: 'Backspace Item Focus Test', enableBackspaceNavigation: true,
          placeholder: 'Search...',
        },
        global: { provide: { [ActionCoreSymbol as symbol]: localTestActionCore } },
      });
      await nextTick();

      // Wait for ActionCore instance to process and expose the actions
      await waitFor(() => {
        expect(localTestActionCore.allActions.value.length).toBeGreaterThanOrEqual(actionsWithParentAndChild.length);
        expect(localTestActionCore.allActions.value.some(a => a.id === 'parent-for-backspace')).toBe(true);
      });

      const core = (wrapper.vm as InstanceType<typeof VCommandPalette>).core;
      expect(core).toBeDefined();

      // Wait for actions to be populated
      await waitFor(() => {
        expect(core.groupedAndSortedActions.value.length).toBeGreaterThan(0);
        const parentItemCheck = core.groupedAndSortedActions.value.find((item: any) => item.id === 'parent-for-backspace');
        expect(parentItemCheck).toBeDefined();
      });

      const parentItem = await screen.findByText('Parent for Backspace');
      await userEvent.click(parentItem);
      await screen.findByText('Child BS1');
      const searchInput = screen.getByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      await userEvent.keyboard('{arrowdown}');
      await waitFor(() => expect(searchInput).toHaveAttribute('aria-activedescendant', expect.stringContaining('child-bs1')));
      await userEvent.keyboard('{Backspace}');
      await waitFor(() => expect(screen.queryByText('Child BS1')).toBeNull());
      expect(await screen.findByText('Parent for Backspace')).toBeVisible();
      unmount();
      localTestActionCore.destroy();
    });

    it('does NOT navigate back if enableBackspaceNavigation is false', async () => {
      const { unmount, createdActionCoreInstance } = renderBackspaceTestPalette({ enableBackspaceNavigation: false });
      await nextTick();
      const parentItem = await screen.findByText('Parent for Backspace');
      await userEvent.click(parentItem);
      await screen.findByText('Child BS1');
      const searchInput = screen.getByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      await userEvent.keyboard('{Backspace}');
      await nextTick();
      expect(await screen.findByText('Child BS1')).toBeVisible();
      unmount();
      createdActionCoreInstance?.destroy();
    });

    it('does NOT navigate back or close if Backspace is pressed at the root level', async () => {
      const { unmount, emitted, createdActionCoreInstance } = renderBackspaceTestPalette();
      await nextTick();
      expect(await screen.findByText('Parent for Backspace')).toBeVisible();
      const searchInput = screen.getByPlaceholderText('Search...');
      await userEvent.click(searchInput);
      await userEvent.keyboard('{Backspace}');
      await nextTick();
      expect(await screen.findByText('Parent for Backspace')).toBeVisible();
      expect(screen.getByRole('dialog', { name: 'Backspace Nav Test' })).toBeVisible();
      expect(emitted()['update:modelValue']).toBeUndefined();
      unmount();
      createdActionCoreInstance?.destroy();
    });
  });
  // --- END: Backspace Navigation Tests ---

  // --- START: Deferred Cleanup Test ---
  it('keeps items rendered during close animation until VDialog afterLeave', async () => {
    // ... existing code ...
  });
  // --- END: Deferred Cleanup Test ---
})
