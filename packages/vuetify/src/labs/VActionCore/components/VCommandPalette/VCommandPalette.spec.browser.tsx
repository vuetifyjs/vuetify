import { VCommandPalette } from './VCommandPalette'
import { render, screen, userEvent, waitFor } from '@test'
import { within } from '@testing-library/vue'; // Correct import for within
import { ActionCoreSymbol, type ActionDefinition, type ActionCorePublicAPI, createAppActionCore } from '@/labs/VActionCore'
import { computed, ref, markRaw, nextTick, h, type Ref, defineComponent, shallowRef } from 'vue'
import { createVuetify } from 'vuetify'
import type { IconAliases, IconSet } from 'vuetify'
// Removed direct Vuetify service imports (ThemeSymbol, etc.) as render from @test should handle Vuetify context

// Minimal mock icon component
const MockIconComponent = (props: { icon: string | any[], tag: string }) => {
  let iconName = '';
  if (typeof props.icon === 'string') {
    iconName = props.icon;
  } else if (Array.isArray(props.icon) && props.icon.length > 0 && typeof props.icon[0] === 'string') {
    iconName = props.icon[0]; // Handle cases where icon might be passed as an array by VIcon internals
  } else if (typeof (props.icon as any)?.icon === 'string') {
    iconName = (props.icon as any).icon;
  }
  // Basic class, actual VIcon might apply more (e.g., 'mdi' prefix if not in iconName)
  // Ensure 'mdi-' prefix if it's a mdi icon and not already prefixed
  const finalIconName = iconName.startsWith('mdi-') ? iconName : `mdi-${iconName}`;
  return h(props.tag || 'i', { class: `mock-icon ${finalIconName}` });
};

const testIcons: {
  defaultSet: string,
  aliases: Partial<IconAliases>,
  sets: Record<string, IconSet>
} = {
  defaultSet: 'mdi',
  aliases: {
    $search: 'mdi-magnify',
    $clear: 'mdi-close-circle', // Often used by VTextField
    $prev: 'mdi-arrow-left', // VCommandPalette uses $arrowLeft, let's match JSDOM mock
    $arrowLeft: 'mdi-arrow-left', // As per JSDOM mock
    // Add other common aliases if needed by VDialog or other internal components
    $close: 'mdi-close',
  },
  sets: {
    mdi: {
      component: MockIconComponent as any, // Use 'as any' to simplify type matching for test mock
    },
    svg: { // In case any icon resolves to an svg type
      component: MockIconComponent as any,
    }
  },
};

const vuetifyInstance = createVuetify({
  icons: testIcons,
});

// Use a more complete mock or a real instance for robust testing
const createTestableActionCore = (initialActions: ActionDefinition[] = []) => {
  // This creates a *real* ActionCore instance for testing interactions
  // It will listen to actual keydown events on document.body if not configured otherwise.
  const core = createAppActionCore({ initialActions: [], verboseLogging: false /* or true for debugging tests */ });
  const sourceKey = Symbol('test-initial-actions');
  if (initialActions.length > 0) {
    core.registerActionsSource(initialActions, sourceKey);
  }
  // Return a subset of the API or the full core, plus a way to add more actions for tests
  return {
    ...core, // Expose the full API
    addNewActions: (actions: ActionDefinition[]) => {
      const newKey = Symbol('test-dynamic-actions');
      core.registerActionsSource(actions, newKey);
      return newKey;
    },
    cleanup: () => {
      core.unregisterActionsSource(sourceKey);
      // Unregister other dynamic sources if keys are tracked
      core.destroy(); // Clean up global listeners
    }
  };
};

let testActionCoreInstance: ReturnType<typeof createTestableActionCore> | null = null;

// Helper to create a mock for ActionCore for tests that don't need full VActionCore behavior
const createMockActionCore = (actions: ActionDefinition[] = []): ActionCorePublicAPI => {
  const allActionsRef = ref<Readonly<ActionDefinition<any>[]>>(actions.map(markRaw))
  const actionCoreAPI: ActionCorePublicAPI = {
    isLoading: ref(false),
    allActions: computed(() => allActionsRef.value),
    activeProfile: ref(null) as Ref<string | null>,
    profiles: ref([]),
    getAction: vi.fn(actionId => allActionsRef.value.find(a => a.id === actionId)),
    executeAction: vi.fn(async (actionId, invocationContext) => {}),
    registerActionsSource: vi.fn(() => Symbol('test-source-key')),
    unregisterActionsSource: vi.fn(() => true),
    setActiveProfile: vi.fn(),
    getEffectiveAction: vi.fn(actionId => allActionsRef.value.find(a => a.id === actionId)),
    isComponentIntegrationEnabled: vi.fn(() => true),
    destroy: vi.fn(),
    // Add other methods if needed by the component, with basic mocks
    getClosestActionElement: () => null,
    getElementActionBindings: () => [],
    showSubItemsInUI: () => {},
    getGlobalLoadingIndicatorCount: () => ref(0),
    incrementGlobalLoadingIndicator: () => {},
    decrementGlobalLoadingIndicator: () => {},
    getHotkeysForAction: () => [],
    getFormattedHotkeys: () => '',
  };
  return actionCoreAPI;
}

// Helper function to check toBeDisplayed within a poll safely
async function isElementDisplayed(getElement: () => HTMLElement | null): Promise<boolean> {
  const element = getElement();
  if (!element) return false;
  try {
    expect(element).toBeVisible();
    return true;
  } catch (e) {
    return false;
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
];

const singleActionForSlotTest: ActionDefinition[] = [
  { id: 'action-slot1', title: 'Action For Item Slot', keywords: 'slot, item', group: 'Test' },
];

const searchTestActions: ActionDefinition[] = [
  { id: 's_action1', title: 'Open Project', keywords: 'load, solution', group: 'File' },
  { id: 's_action2', title: 'Save Project', keywords: 'store, solution', group: 'File' },
  { id: 's_action3', title: 'Copy Selection', group: 'Edit' },
  { id: 's_action4', title: 'Find in Files', keywords: 'search, text', group: 'Edit' },
  { id: 's_action5', title: 'Open Document', group: 'Document' },
];

const listRenderTestActions: ActionDefinition[] = [
  { id: 'lr_action1', title: 'Open File With VHotKey', group: 'File', hotkey: 'ctrl+o' },
  { id: 'lr_action2', title: 'Save File Plain', group: 'File' },
  { id: 'lr_action_hidden', title: 'Hidden Action', meta: { paletteHidden: true } },
  { id: 'lr_action3', title: 'Copy Text with VHotKey', group: 'cmd+c' }, // Note: platform specific hotkey
];

const actionsForExecuteTest: ActionDefinition[] = [
  { id: 'exec_action1', title: 'Execute Me And Close', group: 'Test' },
  { id: 'exec_action2', title: 'Execute Me And Stay Open', group: 'Test' },
];

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
    subItems: () => new Promise(resolve => setTimeout(() => resolve([{id: 'g_action9-1', title: 'Loaded Subitem'}]), 50))
  }
];

const actionsForLoadingTest: ActionDefinition[] = [
  {
    id: 'async_loader_action',
    title: 'Load Subitems Slowly',
    subItems: () => new Promise(resolve =>
      setTimeout(() => resolve([{
        id: 'loaded_child_1',
        title: 'Slowly Loaded Child 1'
      }]), 100) // 100ms delay
    )
  },
  { id: 'other_action', title: 'Another Action' }
];

// Actions for empty state test
const noActions: ActionDefinition[] = [];

describe('VCommandPalette.spec.browser.tsx', () => {
  afterEach(() => {
    if (testActionCoreInstance) {
      testActionCoreInstance.cleanup();
      testActionCoreInstance = null;
    }
    // document.body.innerHTML = ''; // render from @test should handle cleanup
  });

  it('v-model controls visibility', async () => {
    const mockActionCore = createMockActionCore()
    const { rerender, unmount } = render(VCommandPalette, {
      props: { modelValue: false, title: 'Test Palette' }, // Added title for aria query
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore, },
        plugins: [vuetifyInstance],
      },
    });

    // Use queryByRole for elements that might not be present
    let dialog = screen.queryByRole('dialog', { name: 'Test Palette' });
    expect(dialog).toBeNull(); // Should not be in DOM if modelValue is false

    await rerender({ modelValue: true, title: 'Test Palette' });
    dialog = await screen.findByRole('dialog', { name: 'Test Palette' });
    await expect(dialog).toBeVisible();

    await rerender({ modelValue: false, title: 'Test Palette' });
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Test Palette' })).toBeNull();
    });
    unmount();
  });

  it('Escape key (via VActionCore) closes the palette or navigates back', async () => {
    // For this test, we need a real VActionCore instance to process global key events
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems);

    const { unmount, emitted } = render(VCommandPalette, {
      props: {
        modelValue: true,
        placeholder: 'Search actions...',
        title: 'Escape Test Palette'
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        plugins: [vuetifyInstance],
      },
    });

    const searchInput = await screen.findByPlaceholderText('Search actions...');
    await userEvent.click(searchInput); // Ensure focus for keyboard events

    // 1. Press Escape at root level - should close
    await userEvent.keyboard('{escape}');
    // Check for modelValue update event or dialog disappearance
    await waitFor(() => {
      expect(emitted()['update:modelValue'][0]).toEqual([false]);
    });
    expect(screen.queryByRole('dialog', { name: 'Escape Test Palette' })).toBeNull();

    // Re-open for nesting test by updating props (simpler than full unmount/remount here)
    // Need to ensure component is reactive to modelValue changes for re-opening
    // This requires VCommandPalette to be wrapped or modelValue handled by a parent test component
    // For simplicity here, we'll unmount and remount with a new ActionCore instance if needed
    unmount();
    if (testActionCoreInstance) testActionCoreInstance.cleanup();
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems);

    const { unmount: unmount2, emitted: emitted2 } = render(VCommandPalette, {
      props: {
        modelValue: true,
        placeholder: 'Search actions...',
        title: 'Escape Test Palette Nested'
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        plugins: [vuetifyInstance],
      },
    });

    const searchInputNested = await screen.findByPlaceholderText('Search actions...');
    await userEvent.click(searchInputNested); // Focus

    const parentActionItem = await screen.findByText('Parent Action');
    await userEvent.click(parentActionItem);
    await screen.findByText('Child Action 1'); // Wait for sub-items to appear
    expect(await screen.findByText('Parent Action', { selector: '.v-command-palette__title' })).toBeVisible();

    // 2. Press Escape at nested level - should navigate back
    await userEvent.keyboard('{escape}');
    await screen.findByText('Commands', { selector: '.v-command-palette__title' }); // Back to root title
    expect(screen.queryByText('Child Action 1')).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Escape Test Palette Nested' })).toBeVisible(); // Still open

    // 3. Press Escape again at root level - should close
    await userEvent.keyboard('{escape}');
    await waitFor(() => {
       expect(emitted2()['update:modelValue'].find(e => e[0] === false)).toBeTruthy();
    });
    expect(screen.queryByRole('dialog', { name: 'Escape Test Palette Nested' })).toBeNull();

    unmount2();
  });

  it('item slot renders custom item structure and receives scope', async () => {
    const mockActionCore = createMockActionCore(singleActionForSlotTest);
    let receivedScope: any = null;

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Item Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        item: (scope: any) => {
          receivedScope = { ...scope };
          return h('div', {
            class: 'custom-item-slot',
            'data-action-id': scope.action.id,
            'data-selected': scope.isSelected,
          }, `ITEM: ${scope.action.title} - Selected: ${String(scope.isSelected)}`);
        },
      },
    });

    const customItemElement = await screen.findByText(/ITEM: Action For Item Slot - Selected: true/i, { selector: '.custom-item-slot' });
    expect(customItemElement).toBeVisible();
    expect(customItemElement).toHaveAttribute('data-action-id', 'action-slot1');
    expect(customItemElement).toHaveAttribute('data-selected', 'true');

    expect(receivedScope).not.toBeNull();
    expect(receivedScope.action.id).toBe('action-slot1');
    expect(receivedScope.isSelected).toBe(true);
    expect(typeof receivedScope.getItemHtmlId).toBe('function');
    unmount();
  });

  it('header slot renders custom header and receives scope', async () => {
    const mockActionCore = createMockActionCore(actionsWithSubitems);
    let receivedScope: any = null;

    const TestComponent = defineComponent({
        setup() {
            const modelValue = ref(true);
            const paletteTitle = ref('Header Slot Test');
            const currentActionCore = shallowRef(mockActionCore);
            return { modelValue, paletteTitle, currentActionCore };
        },
        render() {
            return h(VCommandPalette, {
                modelValue: this.modelValue,
                title: this.paletteTitle,
                ref: 'paletteRef',
                global: {
                    provide: { [ActionCoreSymbol as symbol]: this.currentActionCore },
                    plugins: [vuetifyInstance],
                },
                slots: {
                    header: (scope: any) => {
                        receivedScope = { ...scope };
                        return h('div', { class: 'custom-header-slot' }, [
                            `Custom Header: ${scope.title} ${scope.parentAction ? '(Sub)' : '(Root)'}`,
                            scope.parentAction && h('button', {
                                'data-testid': 'custom-back-button',
                                onClick: scope.navigateBack
                            }, 'Back')
                        ]);
                    },
                },
            });
        }
    });

    const { unmount } = render(TestComponent);

    await screen.findByText(/Custom Header: Commands \(Root\)/i, { selector: '.custom-header-slot' });
    expect(receivedScope.title).toBe('Commands');

    const parentActionItem = await screen.findByText('Parent Action');
    await userEvent.click(parentActionItem);
    await screen.findByText(/Custom Header: Parent Action \(Sub\)/i, { selector: '.custom-header-slot' });
    expect(receivedScope.title).toBe('Parent Action');
    expect(receivedScope.parentAction.id).toBe('act-parent');

    const customBackButton = await screen.findByTestId('custom-back-button');
    await userEvent.click(customBackButton);
    await screen.findByText(/Custom Header: Commands \(Root\)/i, { selector: '.custom-header-slot' });
    expect(receivedScope.parentAction).toBeUndefined();

    unmount();
  });

  it('searchControls slot replaces search area and receives scope', async () => {
    const mockActionCore = createMockActionCore(searchTestActions);
    let receivedSearchScope: any = null;
    const placeholderText = "Custom Search Area";

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Search Slot Test', placeholder: 'Original Placeholder' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        searchControls: (scope: any) => {
          receivedSearchScope = { ...scope };
          // Simulate VTextField structure for inputRef assignment if needed by core
          const CustomSearchInput = defineComponent({
            setup() {
              return () => h('input', {
                type: 'text',
                ref: el => scope.inputRef.value = { focus: () => (el as HTMLInputElement)?.focus() } as any, // Mock VTextField instance structure
                value: scope.searchText.value,
                onInput: (e: Event) => scope.searchText.value = (e.target as HTMLInputElement).value,
                placeholder: placeholderText,
                'aria-controls': scope.listId,
                'aria-activedescendant': scope.activeDescendantId,
                class: 'custom-search-input'
              });
            }
          });
          return h('div', { class: 'custom-search-controls' }, [h(CustomSearchInput)]);
        },
      },
    });

    const customInput = await screen.findByPlaceholderText(placeholderText, { selector: '.custom-search-input' });
    expect(customInput).toBeVisible();
    expect(screen.queryByPlaceholderText('Original Placeholder')).toBeNull(); // Default search not rendered

    expect(receivedSearchScope).not.toBeNull();
    expect(receivedSearchScope.searchText).toBeDefined();
    expect(receivedSearchScope.placeholder).toBe('Original Placeholder'); // Prop is still passed
    expect(receivedSearchScope.inputRef).toBeDefined();
    expect(receivedSearchScope.listId).toBeDefined();

    await userEvent.type(customInput, 'Project');
    expect(receivedSearchScope.searchText.value).toBe('Project');
    // Check if filtering works with custom input (relies on core logic reacting to searchText)
    await screen.findByText('Open Project');
    expect(screen.queryByText('Copy Selection')).toBeNull();

    unmount();
  });

  it('listWrapper slot replaces list area and receives scope', async () => {
    const mockActionCore = createMockActionCore(searchTestActions.slice(0, 2)); // Use 2 actions
    let receivedListScope: any = null;

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'List Wrapper Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        listWrapper: (scope: any) => {
          receivedListScope = { ...scope };
          return h('div', { class: 'custom-list-wrapper', id: scope.listId, ref: el => scope.listRef.value = el as any },
            scope.actions.map((action: any, index: number) =>
              h('div', {
                class: 'custom-list-item',
                'data-action-id': action.isHeader ? action.id : action.id,
                onClick: () => !action.isHeader && scope.handleItemActivated(action)
              }, action.title)
            )
          );
        },
      },
    });

    await screen.findByText('Open Project', { selector: '.custom-list-item' });
    await screen.findByText('Save Project', { selector: '.custom-list-item' });
    expect(screen.queryByRole('listbox')).toBeNull(); // Default listbox shouldn't be there

    expect(receivedListScope).not.toBeNull();
    expect(receivedListScope.actions.length).toBeGreaterThanOrEqual(2); // Group header + 2 actions
    expect(receivedListScope.selectedIndex).toBeDefined();
    expect(receivedListScope.listId).toBeDefined();
    expect(receivedListScope.listRef).toBeDefined();
    expect(typeof receivedListScope.handleItemActivated).toBe('function');

    // Test interaction (click)
    const openProjectCustomItem = await screen.findByText('Open Project', { selector: '.custom-list-item' });
    await userEvent.click(openProjectCustomItem);
    expect(mockActionCore.executeAction).toHaveBeenCalledWith('s_action1', expect.anything());

    unmount();
  });

  it('loader slot replaces default loader', async () => {
    const mockActionCore = createMockActionCore(actionsForLoadingTest);
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Loader Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        loader: (scope: { isLoading: Ref<boolean> }) => {
          return scope.isLoading.value ? h('div', { class: 'custom-loader' }, 'Custom Loading...') : null;
        },
      },
    });

    const asyncActionItem = await screen.findByText('Load Subitems Slowly');
    await userEvent.click(asyncActionItem);

    const customLoader = await screen.findByText('Custom Loading...', { selector: '.custom-loader'});
    expect(customLoader).toBeVisible();
    expect(screen.queryByRole('progressbar')).toBeNull(); // Default loader not present

    await screen.findByText('Slowly Loaded Child 1'); // Wait for loading to finish
    expect(screen.queryByText('Custom Loading...')).toBeNull(); // Custom loader also gone

    unmount();
  });

  it('footer slot renders custom content and receives navigation actions', async () => {
    // Use real ActionCore for navigation actions to be registered correctly
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems);
    let receivedFooterScope: any = null;

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Footer Slot Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        plugins: [vuetifyInstance],
      },
      slots: {
        footer: (scope: any) => {
          receivedFooterScope = { ...scope };
          return h('div', { class: 'custom-footer' },
            scope.navigationActions.map((action: ActionDefinition) =>
              h('span', { key: action.id, class: 'footer-nav-action' }, `${action.title}: ${action.hotkey}`)
            ).join(', ')
          );
        },
      },
    });

    const customFooter = await screen.findByText(/Navigate Down: arrowdown/, { selector: '.custom-footer'});
    expect(customFooter).toBeVisible();
    expect(receivedFooterScope).not.toBeNull();
    expect(receivedFooterScope.navigationActions.length).toBeGreaterThan(0);
    expect(receivedFooterScope.actionCoreInstance).toBe(testActionCoreInstance);
    expect(receivedFooterScope.core).toBeDefined();
    // Check one of the default hotkeys
    expect(customFooter.textContent).toContain('Select Item: enter');

    unmount();
  });

  it('empty-state slot renders when no actions are available', async () => {
    const mockActionCore = createMockActionCore(noActions); // No actions registered
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Empty State Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        'empty-state': (scope: any) => {
          return h('div', { class: 'custom-empty-state' }, 'No commands available right now.');
        },
      },
    });

    const emptyStateContent = await screen.findByText('No commands available right now.', { selector: '.custom-empty-state' });
    expect(emptyStateContent).toBeVisible();
    // Ensure default parts like search or list are not rendered
    expect(screen.queryByRole('searchbox')).toBeNull(); // Default VCommandPaletteSearch
    expect(screen.queryByRole('listbox')).toBeNull(); // Default VCommandPaletteList

    unmount();
  });

  it('ArrowDown/ArrowUp changes selectedIndex and aria-activedescendant (VActionCore)', async () => {
    testActionCoreInstance = createTestableActionCore(actionsWithSubitems); // Real AC
    const placeholderText = 'Search actions...';

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, placeholder: placeholderText, title: 'Nav Test Palette' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        plugins: [vuetifyInstance],
      },
    });

    const searchInput = await screen.findByPlaceholderText(placeholderText);
    await userEvent.click(searchInput); // Focus input

    let selectableItems: HTMLElement[] = [];
    await waitFor(() => {
      selectableItems = screen.queryAllByRole('option').filter(el => (el as HTMLElement).offsetParent !== null);
      expect(selectableItems.length).toBeGreaterThanOrEqual(2);
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[0].id);
    });

    // ArrowDown
    await userEvent.keyboard('{arrowdown}');
    await waitFor(() => {
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[1].id);
    });
    expect(selectableItems[1]).toHaveClass('v-command-palette__item--selected');

    // ArrowUp
    await userEvent.keyboard('{arrowup}');
    await waitFor(() => {
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[0].id);
    });
    expect(selectableItems[0]).toHaveClass('v-command-palette__item--selected');
    expect(selectableItems[1]).not.toHaveClass('v-command-palette__item--selected');

    unmount();
  });

  it('Enter key executes the selected action (VActionCore)', async () => {
    const executeSpy = vi.fn();
    const firstAction = { ...actionsWithSubitems[0], handler: executeSpy }; // Add a handler to spy on
    testActionCoreInstance = createTestableActionCore([firstAction, ...actionsWithSubitems.slice(1)]);
    const placeholderText = 'Search actions...';

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, placeholder: placeholderText, title: 'Enter Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: testActionCoreInstance },
        plugins: [vuetifyInstance],
      },
    });

    const searchInput = await screen.findByPlaceholderText(placeholderText);
    await userEvent.click(searchInput);

    await waitFor(() => {
      const selectableItems = screen.queryAllByRole('option').filter(el => (el as HTMLElement).offsetParent !== null);
      expect(selectableItems.length).toBeGreaterThan(0);
      expect(searchInput).toHaveAttribute('aria-activedescendant', selectableItems[0].id);
      expect(selectableItems[0].textContent).toContain(firstAction.title);
    });

    await userEvent.keyboard('{enter}');
    await waitFor(() => {
      // The executeAction on the *mock* ActionCore won't be called directly by the *real* ActionCore
      // Instead, the *handler* of the action itself (if defined) will be called.
      // Or, if no handler, the subItems function or other default behavior.
      // Here, we added a handler to the action definition passed to the real ActionCore.
      expect(executeSpy).toHaveBeenCalled();
    });
    unmount();
  });

  it('verifies actions are grouped with VListSubheader and sorted correctly (unchanged)', async () => {
    const mockActionCore = createMockActionCore(sampleActionsForGroupingTest);
    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true, title: 'Grouping Test' },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
    });

    const listContainer = await screen.findByRole('listbox', { name: /Commands/i }); // Title for default listbox
    await waitFor(() => expect(listContainer.children.length).toBeGreaterThan(0));

    const renderedElements = Array.from(listContainer.querySelectorAll('.v-list-subheader, .v-list-item[role="option"]'));
    const visibleTexts = renderedElements.map(el => el.textContent?.trim());

    // Expected sequence based on sampleActionsForGroupingTest, adjusted for VHotKey rendering
    const expectedSequenceTexts = [
      'File',
      'Print Document',
      'Open File',
      expect.stringMatching(/Save File( |.\+.)*Ctrl\+S/i), // VHotKey can add chars
      'Edit',
      'Copy Text',
      'Paste Text',
      'Other Actions',
      'Go to Settings',
      'Async SubItems with Loader',
      'User Profile',
    ];

    expect(visibleTexts.length).toBe(expectedSequenceTexts.length);
    visibleTexts.forEach((text, i) => {
      if (typeof expectedSequenceTexts[i] === 'string') {
        expect(text).toBe(expectedSequenceTexts[i]);
      } else { // RegExp
        expect(text).toMatch(expectedSequenceTexts[i] as RegExp);
      }
    });
    unmount();
  });

  // ... (Keep other existing relevant tests, refactoring them for VActionCore navigation if needed)
  // For example, ARIA, grouping, simple search, execute action tests should still be relevant
  // but keyboard navigation parts within them need review.

  it('checks for correct ARIA roles and attributes', async () => {
    const mockActionCore = createMockActionCore(sampleActionsForGroupingTest);
    const placeholderText = 'Search commands...'; // Default placeholder

    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        // placeholder: placeholderText, // Use default placeholder for this test
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
    });

    // Dialog attributes
    const dialogElement = await screen.findByRole('dialog', { name: /Command Palette Dialog/i });
    expect(dialogElement).toHaveAttribute('aria-modal', 'true');

    // Search input (VTextField) attributes
    // The input itself might not have role=combobox, but its wrapping VTextField structure does.
    // We query by placeholder to get the input, then find its controlling combobox element.
    const searchInput = await screen.findByPlaceholderText(placeholderText);
    const comboboxElement = searchInput.closest('[role="combobox"].v-text-field');
    expect(comboboxElement).not.toBeNull();
    expect(comboboxElement).toHaveAttribute('aria-haspopup', 'listbox');
    expect(comboboxElement).toHaveAttribute('aria-expanded', 'true'); // List is open by default
    const listId = comboboxElement!.getAttribute('aria-controls');
    expect(listId).toBeDefined();

    // Listbox attributes
    const listboxElement = await screen.findByRole('listbox', { name: /Commands/i });
    expect(listboxElement).toHaveAttribute('id', listId);

    // Title and labelling - VCommandPaletteHeader is used by default
    const titleElement = listboxElement.querySelector('.v-command-palette__title');
    // In default header, title is not directly a heading role, but used for labelling.
    // VCommandPalette itself has aria-label="Command Palette Dialog"
    // VTextField and VListbox are labelled by the title span in VCommandPaletteHeader
    // This requires VCommandPaletteHeader to correctly set an ID on its title span.
    // Let's assume the internal structure provides an ID on the title for aria-labelledby.
    // The listbox should be labelled by the title. The VTextField is also labelled by it.
    // We need to ensure VCommandPaletteHeader applies an id like `listId + '-title'` or similar.
    // For now, let's assume the component internally links them correctly via aria-labelledby if a title is present.
    // A more robust check might involve inspecting specific IDs if they are stable.
    // The JSDOM test checked: expect(listElement!.getAttribute('aria-labelledby')).toBe(titleId);
    //                        expect(textFieldWrapper.attributes('aria-labelledby')).toBe(titleId);
    // This implies VCommandPaletteHeader must put an ID on its title, and VCommandPaletteSearch and VCommandPaletteList use it.
    // Let's find the title element by its default text if no slot is used.
    const defaultTitleElement = await screen.findByText('Commands', { selector: '.v-command-palette__title' });
    const defaultTitleId = defaultTitleElement.id;
    expect(defaultTitleId).toBeTruthy();
    expect(listboxElement).toHaveAttribute('aria-labelledby', defaultTitleId);
    expect(comboboxElement).toHaveAttribute('aria-labelledby', defaultTitleId);

    // First item selection (aria-activedescendant and aria-selected)
    // Wait for items to be available
    await screen.findByText('Print Document', {}, {timeout: 2000}); // First item from sampleActionsForGroupingTest

    const selectableItems = screen.queryAllByRole('option').filter(el =>
      el.closest('.v-list-item') &&
      !el.classList.contains('v-list-subheader') &&
      !el.classList.contains('v-command-palette__no-results') &&
      el.getAttribute('aria-disabled') !== 'true'
    );
    expect(selectableItems.length).toBeGreaterThan(0);
    const firstActionItem = selectableItems[0];

    expect(searchInput).toHaveAttribute('aria-activedescendant', firstActionItem.id);
    expect(firstActionItem).toHaveAttribute('aria-selected', 'true');

    if (selectableItems.length > 1) {
      expect(selectableItems[1]).toHaveAttribute('aria-selected', 'false');
    }

    unmount();
  });

  it('no-results slot renders custom content when no actions match', async () => {
    // Provide an empty list of actions to easily trigger no-results
    const mockActionCore = createMockActionCore([]);
    const placeholderText = 'Search actions...';
    const customNoResultsText = 'Custom: Nothing found here!';

    const { unmount } = render(VCommandPalette, {
      props: {
        modelValue: true,
        placeholder: placeholderText,
      },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
      slots: {
        'no-results': (scope: any) => (
          <div class="custom-no-results-slot">
            {customNoResultsText} (Query: {scope.searchText})
          </div>
        ),
      },
    });

    const searchInput = await screen.findByPlaceholderText(placeholderText);
    await expect.poll(() => document.activeElement === searchInput, { timeout: 2000 }).toBe(true);

    // Type something to ensure search is attempted, though list is already empty
    await userEvent.type(searchInput, 'abc');
    await nextTick();

    // Verify the custom no-results slot content
    const customSlotElement = await screen.findByText(new RegExp(customNoResultsText, 'i'));
    expect(customSlotElement).toBeVisible();
    expect(customSlotElement).toHaveClass('custom-no-results-slot');
    expect(customSlotElement.textContent).toContain('(Query: abc)'); // Check scope was passed

    // Verify default no-results message is not present
    expect(screen.queryByText('No results found.')).toBeNull();

    unmount();
  });

  it('shows VProgressLinear when subItems are loading and hides it after', async () => {
    const mockActionCore = createMockActionCore(actionsForLoadingTest);

    const { unmount } = render(VCommandPalette, {
      props: { modelValue: true },
      global: {
        provide: { [ActionCoreSymbol as symbol]: mockActionCore },
        plugins: [vuetifyInstance],
      },
    });

    const asyncActionItem = await screen.findByText('Load Subitems Slowly');
    await userEvent.click(asyncActionItem); // Await the click
    await nextTick(); // Allow state to update for loader visibility

    // Check for VProgressLinear to appear (by role, no specific name needed for VProgressLinear)
    const progressBar = await screen.findByRole('progressbar', {}, { timeout: 1000 });
    expect(progressBar).toBeVisible();
    expect(progressBar.closest('.v-command-palette__loader')).not.toBeNull();

    // Wait for sub-items to load and loader to disappear
    await screen.findByText('Load Subitems Slowly', { selector: '.v-command-palette__title' }, { timeout: 2000 });
    await screen.findByText('Slowly Loaded Child 1', {}, { timeout: 2000 });

    // Check that VProgressLinear is gone
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(document.querySelector('.v-command-palette__loader .v-progress-linear')).toBeNull();

    unmount();
  });
})
