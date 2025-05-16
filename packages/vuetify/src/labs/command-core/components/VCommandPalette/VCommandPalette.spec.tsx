// VCommandPalette.spec.tsx

import { mount } from '@vue/test-utils'
import { VCommandPalette } from './VCommandPalette'
import { VDialog } from '@/components/VDialog'
import { CommandCoreSymbol, type ActionDefinition, type CommandCorePublicAPI, type ActionContext } from '@/labs/command-core'
import { ref, markRaw, nextTick, computed, type Ref, type ComputedRef, type DeepReadonly } from 'vue'
import { ThemeSymbol, type ThemeInstance } from '@/composables/theme' // InternalThemeDefinition is not exported
import { DefaultsSymbol, type DefaultsInstance } from '@/composables/defaults'
import { LocaleSymbol, type LocaleInstance, type RtlInstance } from '@/composables/locale'
import { DisplaySymbol, type DisplayInstance, type DisplayPlatform, type DisplayThresholds, type DisplayBreakpoint } from '@/composables/display'
import { IconSymbol, type InternalIconOptions, type IconAliases, type IconSet, VSvgIcon, VComponentIcon } from '@/composables/icons'
import { VTextField } from '@/components/VTextField'
import { VList, VListItem, VListSubheader } from '@/components/VList'
import { VHotKey } from '../VHotKey/VHotKey'
import { VProgressLinear } from '@/components/VProgressLinear'

// Local type for mocking purposes as InternalThemeDefinition is not directly importable
interface MockInternalThemeDefinition {
  dark: boolean;
  colors: Record<string, string>;
  variables: Record<string, string | number>;
}

// Helper to create a Vitest mock for CommandCore
const createMockCommandCore = (actions: ActionDefinition[] = []): CommandCorePublicAPI => {
  const allActionsRef = ref<Readonly<ActionDefinition<any>[]>>(actions.map(markRaw))
  return {
    isLoading: ref(false),
    allActions: computed(() => allActionsRef.value),
    registerActionsSource: vi.fn(() => Symbol('test-source-key')),
    unregisterActionsSource: vi.fn(() => true),
    getAction: vi.fn(actionId => allActionsRef.value.find(a => a.id === actionId)),
    executeAction: vi.fn(async (actionId, invocationContext) => {}),
    isComponentIntegrationEnabled: vi.fn(() => true),
    destroy: vi.fn(),
  }
}

// Test actions
const sampleActions: ActionDefinition[] = [
  { id: 'action1', title: 'Open File', keywords: 'load, document', group: 'File', order: 1 },
  { id: 'action2', title: 'Save File', hotkey: 'ctrl+s', group: 'File', order: 2 },
  { id: 'action3', title: 'Copy Text', group: 'Edit' },
  { id: 'action4', title: 'Paste Text', group: 'Edit' },
  {
    id: 'action5',
    title: 'User Profile',
    subItems: () => Promise.resolve<ActionDefinition[]>([
      { id: 'action5-1', title: 'View Profile' },
      { id: 'action5-2', title: 'Edit Settings', hotkey: 'ctrl+,' },
    ]),
  },
  { id: 'action6', title: 'Logout', meta: { paletteHidden: true } },
  { id: 'action7', title: 'Go to Settings', order: 1 }, // Ungrouped
  { id: 'action8', title: 'Print Document', group: 'File', order: 0 },
  {
    id: 'action9',
    title: 'Async SubItems with Loader',
    subItems: () => new Promise(resolve => setTimeout(() => resolve([{id: 'action9-1', title: 'Loaded Subitem'}]), 50))
  }
];

const mockDefaultLightColors: MockInternalThemeDefinition['colors'] = {
  'background': '#FFFFFF', 'surface': '#FFFFFF', 'primary': '#1867C0', 'secondary': '#48A9A6',
  'success': '#4CAF50', 'warning': '#FB8C00', 'error': '#B00020', 'info': '#2196F3',
  'on-background': '#000000', 'on-surface': '#000000', 'on-primary': '#FFFFFF',
  'on-secondary': '#FFFFFF', 'on-success': '#FFFFFF', 'on-warning': '#FFFFFF',
  'on-error': '#FFFFFF', 'on-info': '#FFFFFF',
};
const mockDefaultLightVariables: MockInternalThemeDefinition['variables'] = {
  'border-color': '#000000', 'border-opacity': 0.12, 'high-emphasis-opacity': 0.87,
  'medium-emphasis-opacity': 0.60, 'disabled-opacity': 0.38,
};

const createMockTheme = (): ThemeInstance => {
  const name = ref('light');
  const themesData = ref<Record<string, MockInternalThemeDefinition>>({
    light: {
      dark: false,
      colors: mockDefaultLightColors,
      variables: mockDefaultLightVariables,
    },
    dark: {
      dark: true,
      colors: { ...mockDefaultLightColors, 'background': '#121212', 'surface': '#212121', 'on-background': '#FFFFFF', 'on-surface': '#FFFFFF' },
      variables: { ...mockDefaultLightVariables, 'border-color': '#FFFFFF' },
    }
  });
  const current = computed(() => themesData.value[name.value] || themesData.value.light);

  // Construct the object matching ThemeInstance structure
  return {
    isDisabled: false,
    name: name as Readonly<Ref<string>>, // Cast to satisfy Readonly if needed, ref is already Ref<string>
    themes: themesData as Ref<Record<string, any>>, // Using MockInternalThemeDefinition internally
    current: current as DeepReadonly<Ref<any>>, // Using MockInternalThemeDefinition internally
    computedThemes: computed(() => themesData.value) as DeepReadonly<Ref<Record<string, any>>>, // Cast as DeepReadonly<Ref<Record<string, any>>>
    themeClasses: computed(() => `v-theme--${name.value}`) as Readonly<Ref<string | undefined>>,
    styles: ref('') as Readonly<Ref<string>>,
    global: {
      name: name as Readonly<Ref<string>>,
      current: current as DeepReadonly<Ref<any>>,
    },
  };
}

const createMockLocale = (): LocaleInstance & RtlInstance => {
  const isRtl = ref(false);
  return {
    isRtl,
    rtl: ref({}), // Basic Ref for rtl config
    rtlClasses: computed(() => isRtl.value ? 'v-locale--is-rtl' : 'v-locale--is-ltr'),
    // Basic i18n functions to prevent errors if called by underlying components
    t: (key: string, ...params: unknown[]) => {
      let message = key;
      params.forEach((param, index) => {
        message = message.replace(`{${index}}`, String(param));
      });
      return message;
    },
    n: (value: number) => String(value),
    current: ref('en'),
    fallback: ref('en'),
    messages: ref({ en: {} }), // Provide some basic messages structure
    provide: (props: any) => createMockLocale(), // Simplistic provide for chaining, might need more if used deeply
    name: 'vuetify', // Mock adapter name
  };
};

const createMockDisplay = (): DisplayInstance => {
  const platformMock: DisplayPlatform = {
    android: false, ios: false, cordova: false, electron: false, chrome: true,
    edge: false, firefox: false, opera: false, win: true, mac: false, linux: false,
    touch: false, ssr: false,
  };
  const thresholdsMock: DisplayThresholds = {
    xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920, xxl: 2560,
  };
  const name = ref<DisplayBreakpoint>('md');
  const width = ref(1920);
  const mobile = computed(() => width.value < thresholdsMock.sm);

  return {
    xs: computed(() => name.value === 'xs'),
    sm: computed(() => name.value === 'sm'),
    md: computed(() => name.value === 'md'),
    lg: computed(() => name.value === 'lg'),
    xl: computed(() => name.value === 'xl'),
    xxl: computed(() => name.value === 'xxl'),
    smAndUp: computed(() => !mobile.value), // Simplified logic
    mdAndUp: computed(() => width.value >= thresholdsMock.md),
    lgAndUp: computed(() => width.value >= thresholdsMock.lg),
    xlAndUp: computed(() => width.value >= thresholdsMock.xl),
    smAndDown: computed(() => width.value < thresholdsMock.md),
    mdAndDown: computed(() => width.value < thresholdsMock.lg),
    lgAndDown: computed(() => width.value < thresholdsMock.xl),
    xlAndDown: computed(() => width.value < thresholdsMock.xxl),
    name,
    height: ref(1080),
    width,
    mobile,
    mobileBreakpoint: ref(thresholdsMock.sm),
    platform: ref(platformMock),
    thresholds: ref(thresholdsMock),
    ssr: false,
    update: vi.fn(),
  };
};

const createMockIcons = (): InternalIconOptions => {
  const mockIconAliases: Partial<IconAliases> = {
    // Provide common aliases that might be used by VBtn, VTextField, VIcon directly or indirectly
    '$vuetify': 'mdi-vuetify', // Example, actual icons used might vary
    '$prev': 'mdi-chevron-left',
    '$next': 'mdi-chevron-right',
    '$close': 'mdi-close',
    '$cancel': 'mdi-close-circle',
    '$delimiter': 'mdi-circle-small',
    '$subgroup': 'mdi-menu-down',
    '$expand': 'mdi-chevron-down',
    // Specific aliases used in VCommandPalette template
    '$arrowLeft': 'mdi-arrow-left', // For the back button
    '$search': 'mdi-magnify',      // For the VTextField prependInnerIcon
    // Default set icons if any component falls back to them without an alias
    checkboxOn: 'mdi-checkbox-marked',
    checkboxOff: 'mdi-checkbox-blank-outline',
    checkboxIndeterminate: 'mdi-minus-box',
    // ... other common aliases if needed
  };

  const mdiSet: IconSet = {
    // VComponentIcon is simpler as it doesn't require actual SVG paths for icons
    // that are only resolved by name for testing purposes.
    component: VComponentIcon as any,
  };

  return {
    defaultSet: 'mdi',
    aliases: mockIconAliases,
    sets: {
      mdi: mdiSet,
      svg: mdiSet, // If any alias points to an svg icon like 'svg:path'
    },
  };
};

describe('VCommandPalette.tsx', () => {
  let mockCommandCore: CommandCorePublicAPI
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = (props: any = {}, actions: ActionDefinition[] = sampleActions, slots?: any) => {
    mockCommandCore = createMockCommandCore(actions)
    const mockTheme = createMockTheme();
    const mockDefaults = ref<DefaultsInstance>({
      global: {},
      VDialog: { // Attempt to disable VDialog transitions
        transition: false,
      }
    });
    const mockLocale = createMockLocale();
    const mockDisplay = createMockDisplay();
    const mockIcons = createMockIcons();

    return mount(VCommandPalette, {
      attachTo: document.body,
      props: {
        modelValue: true,
        ...props,
      },
      slots,
      global: {
        provide: {
          [CommandCoreSymbol as symbol]: mockCommandCore,
          [ThemeSymbol as symbol]: mockTheme,
          [DefaultsSymbol as symbol]: mockDefaults,
          [LocaleSymbol as symbol]: mockLocale,
          [DisplaySymbol as symbol]: mockDisplay,
          [IconSymbol as symbol]: mockIcons,
        },
        stubs: {
          // Stubs can be enabled for shallower tests if needed
          // VDialog: true, VTextField: true, VList: true, VListItem: true, VListSubheader: true,
          // VProgressLinear: true, VHotKey: true, VIcon: true, VBtn: true,
        }
      },
    })
  }

  afterEach(() => {
    wrapper?.unmount()
    // Clean up teleported elements from document.body
    document.body.innerHTML = '';
    vi.clearAllMocks();
  })

  it('v-model controls visibility', async () => {
    // Specific local mount for this test with VDialog stubbed
    const localMockCommandCore = createMockCommandCore();
    const localMockTheme = createMockTheme();
    const localMockDefaults = ref<DefaultsInstance>({ global: {} });
    const localMockLocale = createMockLocale();
    const localMockDisplay = createMockDisplay();
    const localMockIcons = createMockIcons();

    const localWrapper = mount(VCommandPalette, {
      attachTo: document.body,
      props: { modelValue: false }, // Start with modelValue: false
      global: {
        provide: {
          [CommandCoreSymbol as symbol]: localMockCommandCore,
          [ThemeSymbol as symbol]: localMockTheme,
          [DefaultsSymbol as symbol]: localMockDefaults,
          [LocaleSymbol as symbol]: localMockLocale,
          [DisplaySymbol as symbol]: localMockDisplay,
          [IconSymbol as symbol]: localMockIcons,
        },
        stubs: {
          VDialog: {
            // A simple stub that renders its default slot based on modelValue
            // and mimics the modelValue prop update emit for two-way binding.
            props: ['modelValue'],
            emits: ['update:modelValue'],
            render() {
              if (this.modelValue) {
                return this.$slots.default ? this.$slots.default() : null;
              }
              return null;
            },
          },
        },
      },
    });

    // VDialog is stubbed, so we check the direct presence of .v-command-palette
    // which should be controlled by the stub based on modelValue.
    expect(localWrapper.find('.v-command-palette').exists()).toBe(false);

    await localWrapper.setProps({ modelValue: true });
    await nextTick(); // Allow VCommandPalette's proxiedModel and watchers to react
    await nextTick(); // Additional tick for reactivity propagation

    expect(localWrapper.find('.v-command-palette').exists()).toBe(true); // This is the assertion that was failing

    // Test closing
    await localWrapper.setProps({ modelValue: false });
    await nextTick();
    await nextTick();
    expect(localWrapper.find('.v-command-palette').exists()).toBe(false);

    localWrapper.unmount();
  })

  it('search input filters actions by title and keywords', async () => {
    wrapper = mountComponent() // modelValue: true by default

    // Wait for VDialog to be open and content rendered (teleported)
    await new Promise(r => setTimeout(r, 50)); // Small delay for dialog to open and initial render

    const paletteInBody = document.body.querySelector('.v-command-palette');
    expect(paletteInBody).not.toBeNull();

    const vTextFieldWrapper = wrapper.findComponent(VTextField);
    expect(vTextFieldWrapper.exists()).toBe(true);

    // Test 1: Search for "File"
    let currentUpdateListEvents = wrapper.emitted('update:list') || [];
    let previousUpdateListCount = currentUpdateListEvents.length;
    await vTextFieldWrapper.setValue('File');
    await nextTick(); // Allow VCommandPalette's watcher on groupedAndSortedActions to fire its nextTick(emit)

    currentUpdateListEvents = wrapper.emitted('update:list') || [];
    expect(currentUpdateListEvents.length).toBe(previousUpdateListCount + 1);
    previousUpdateListCount = currentUpdateListEvents.length;

    // Wait for the DOM to update after searching for "File"
    // "File" query matches "Open File", "Save File", and "User Profile" (due to "file" in "Profile")
    await vi.waitUntil(() => {
      const listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      const visibleListItems = listItemsElements.filter(el => {
        const classList = el.classList;
        return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
      });
      return visibleListItems.length === 3; // EXPECT 3 ITEMS NOW
    }, { timeout: 2000, interval: 50 });

    let listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
    let visibleListItems = listItemsElements.filter(el => {
      const classList = el.classList;
      return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
    });

    expect(visibleListItems.length).toBe(3); // EXPECT 3 ITEMS
    expect(visibleListItems.some(item => item.textContent?.includes('Open File'))).toBe(true);
    expect(visibleListItems.some(item => item.textContent?.includes('Save File'))).toBe(true);
    expect(visibleListItems.some(item => item.textContent?.includes('User Profile'))).toBe(true);
    expect(visibleListItems.some(item => item.textContent?.includes('Print Document'))).toBe(false);

    // Test 2: Search for "document"
    await vTextFieldWrapper.setValue('document');
    await nextTick(); // Wait for emit

    currentUpdateListEvents = wrapper.emitted('update:list') || [];
    expect(currentUpdateListEvents.length).toBe(previousUpdateListCount + 1);
    previousUpdateListCount = currentUpdateListEvents.length;

    // Wait for the DOM to update after searching for "document"
    await vi.waitUntil(() => {
      const listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      const visibleListItems = listItemsElements.filter(el => {
        const classList = el.classList;
        return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
      });
      // Expect "Open File" and "Print Document" for "document" search
      return visibleListItems.length === 2;
    }, { timeout: 2000, interval: 50 });

    listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
    visibleListItems = listItemsElements.filter(el => {
      const classList = el.classList;
      return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
    });
    expect(visibleListItems.length).toBe(2);
    expect(visibleListItems.some(item => item.textContent?.includes('Open File'))).toBe(true);
    expect(visibleListItems.some(item => item.textContent?.includes('Print Document'))).toBe(true);

    // Test 3: Search for "nonexistent"
    await vTextFieldWrapper.setValue('nonexistent');
    await nextTick(); // Wait for emit

    currentUpdateListEvents = wrapper.emitted('update:list') || [];
    expect(currentUpdateListEvents.length).toBe(previousUpdateListCount + 1);

    // Wait for the DOM to update after searching for "nonexistent"
    await vi.waitUntil(() => {
      const listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      const visibleListItems = listItemsElements.filter(el => {
        const classList = el.classList;
        return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
      });
      return visibleListItems.length === 0;
    }, { timeout: 2000, interval: 50 });

    listItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
    visibleListItems = listItemsElements.filter(el => {
      const classList = el.classList;
      return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
    });
    expect(visibleListItems.length).toBe(0);

    const noResultsElement = document.body.querySelector('.v-command-palette__no-results');
    expect(noResultsElement).not.toBeNull();
    expect(noResultsElement?.textContent).toBe('No results found.');
  })

  it('actions are listed and rendered with titles and hotkeys', async () => {
    wrapper = mountComponent()
    await nextTick()

    const listItems = wrapper.findAllComponents(VListItem);
    const visibleActions = sampleActions.filter(a => !a.meta?.paletteHidden);
    const actionItems = listItems.filter(item => !item.classes('v-command-palette__no-results') && !item.props('disabled'));
    expect(actionItems.length).toBe(visibleActions.length);

    const saveFileActionItem = actionItems.find(item => item.text().includes('Save File'));
    expect(saveFileActionItem).toBeDefined();
    expect(saveFileActionItem!.findComponent(VHotKey).exists()).toBe(true);
    expect(saveFileActionItem!.findComponent(VHotKey).props('hotkey')).toBe('ctrl+s');

    const openFileActionItem = actionItems.find(item => item.text().includes('Open File'));
    expect(openFileActionItem).toBeDefined();
    expect(openFileActionItem!.findComponent(VHotKey).exists()).toBe(false);
  })

  it('clicking an action executes it and closes palette if closeOnExecute is true', async () => {
    wrapper = mountComponent({ closeOnExecute: true })
    await new Promise(r => setTimeout(r, 50)); // Wait for dialog to open and teleport

    let openFileElement: HTMLElement | undefined | null;
    await vi.waitUntil(() => {
      const listItems = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      openFileElement = listItems.find(item => item.textContent?.includes('Open File')) as HTMLElement | undefined;
      return !!openFileElement;
    }, { timeout: 1000 });

    expect(openFileElement).toBeDefined();
    openFileElement!.click();
    await nextTick(); // Allow click handler and subsequent effects to process

    expect(mockCommandCore.executeAction).toHaveBeenCalledWith('action1', { trigger: 'command-palette' })
    expect(wrapper.emitted('update:modelValue')![0][0]).toBe(false)
  })

  it('clicking an action executes it and stays open if closeOnExecute is false', async () => {
    wrapper = mountComponent({ closeOnExecute: false })
    await new Promise(r => setTimeout(r, 50)); // Wait for dialog to open and teleport

    let saveFileElement: HTMLElement | undefined | null;
    await vi.waitUntil(() => {
      const listItems = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      saveFileElement = listItems.find(item => item.textContent?.includes('Save File')) as HTMLElement | undefined;
      return !!saveFileElement;
    }, { timeout: 1000 });

    expect(saveFileElement).toBeDefined();
    saveFileElement!.click();
    await nextTick();

    expect(mockCommandCore.executeAction).toHaveBeenCalledWith('action2', { trigger: 'command-palette' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  describe('Nesting', () => {
    it('clicking an action with subItems loads new list and updates header', async () => {
      wrapper = mountComponent()
      await new Promise(r => setTimeout(r, 50)); // Wait for dialog

      const initialEmittedCount = (wrapper.emitted('update:list') || []).length; // Get current count, might be 0 or more if prev events fired

      // Find and click the "User Profile" DOM element
      let userActionElement: HTMLElement | undefined | null;
      await vi.waitUntil(() => {
        const listItems = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
        userActionElement = listItems.find(item => item.textContent?.includes('User Profile')) as HTMLElement | undefined;
        return !!userActionElement;
      }, { timeout: 1000 });
      expect(userActionElement).toBeDefined();
      userActionElement!.click();

      // Wait for subItems promise, actionStack update, and the subsequent 'update:list' event
      await vi.waitUntil(() => (wrapper.emitted('update:list') || []).length > initialEmittedCount, {
        timeout: 2000, // subItems might have a delay (e.g. action9)
        interval: 50
      });

      const titleElement = document.body.querySelector('.v-command-palette__title');
      expect(titleElement?.textContent).toBe('User Profile');
      const backButton = document.body.querySelector('button[aria-label="Go back"]');
      expect(backButton).not.toBeNull();

      const subItemsElements = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      const visibleSubItems = subItemsElements.filter(el => {
        const classList = el.classList;
        return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
      });
      expect(visibleSubItems.length).toBe(2);
      expect(visibleSubItems.some(item => item.textContent?.includes('View Profile'))).toBe(true);
      const editSettingsSubItemText = visibleSubItems.find(item => item.textContent?.includes('Edit Settings'))?.textContent;
      expect(editSettingsSubItemText).toBeDefined();
      // VHotKey renders its content, so it should be part of textContent
      expect(editSettingsSubItemText).toContain('Ctrl+,');
    })

    it('navigating back from nested view works', async () => {
      wrapper = mountComponent();
      await new Promise(r => setTimeout(r, 50)); // Wait for dialog

      // 1. Navigate to sub-items (User Profile)
      let userActionElement: HTMLElement | undefined | null;
      await vi.waitUntil(() => {
        const listItems = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
        userActionElement = listItems.find(item => item.textContent?.includes('User Profile')) as HTMLElement | undefined;
        return !!userActionElement;
      }, { timeout: 1000 });
      expect(userActionElement).toBeDefined();

      let emittedUpdateListCount = (wrapper.emitted('update:list') || []).length;
      userActionElement!.click();

      await vi.waitUntil(() => (wrapper.emitted('update:list') || []).length > emittedUpdateListCount, {
        timeout: 2000, interval: 50
      });
      emittedUpdateListCount = (wrapper.emitted('update:list') || []).length; // Update count

      // Sanity check: we are in the nested view
      let titleElement = document.body.querySelector('.v-command-palette__title');
      expect(titleElement?.textContent).toBe('User Profile');

      // 2. Find and click the back button
      const backButtonElement = document.body.querySelector('button[aria-label="Go back"]');
      expect(backButtonElement).not.toBeNull();
      (backButtonElement as HTMLElement).click();

      // Wait for navigation back and list update
      await vi.waitUntil(() => (wrapper.emitted('update:list') || []).length > emittedUpdateListCount, {
        timeout: 2000, interval: 50
      });

      // 3. Verify we are back at the root
      titleElement = document.body.querySelector('.v-command-palette__title');
      expect(titleElement?.textContent).toBe('Commands');

      const originalActionCount = sampleActions.filter(a => !a.meta?.paletteHidden).length;
      const listItemsAfterBack = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
      const visibleItemsAfterBack = listItemsAfterBack.filter(el => {
        const classList = el.classList;
        return !classList.contains('v-list-subheader') && !classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled');
      });
      expect(visibleItemsAfterBack.length).toBe(originalActionCount);
    })

    it('executing actions from a nested level works', async () => {
      wrapper = mountComponent()
      await nextTick()
      const userAction = wrapper.findAllComponents(VListItem).find(item => item.text().includes('User Profile'))
      await userAction!.trigger('click')
      await nextTick(); await nextTick()

      const viewProfileSubItem = wrapper.findAllComponents(VListItem).find(item => item.text().includes('View Profile'))
      await viewProfileSubItem!.trigger('click')
      expect(mockCommandCore.executeAction).toHaveBeenCalledWith('action5-1', { trigger: 'command-palette' })
    })
  })

  describe('Keyboard Navigation', () => {
    let searchInputElement: HTMLInputElement | null;

    beforeEach(async () => {
      if (expect.getState().currentTestName?.includes('focus management')) return;

      // Ensure a fresh wrapper and component instance for each keyboard test (excluding focus management)
      if (wrapper) {
        wrapper.unmount();
        document.body.innerHTML = ''; // Clean up from previous mount
      }
      wrapper = mountComponent(); // modelValue: true by default, should open dialog

      // 1. Wait for the search input to exist in the document body
      await vi.waitUntil(() => {
        searchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
        return !!searchInputElement;
      }, { timeout: 1500, interval: 20 });
      expect(searchInputElement, 'Search input element should exist').not.toBeNull();

      // Explicitly focus the element after it's found
      searchInputElement!.focus();
      await nextTick(); // Allow focus to apply

      // 2. Wait for the search input to become the active element
      await vi.waitUntil(() => {
        return document.activeElement === searchInputElement;
      }, { timeout: 1500, interval: 20 });
      expect(document.activeElement, 'Search input should be focused').toBe(searchInputElement);

      // 3. Wait for aria-activedescendant to be initialized (list items are rendered and selection is set)
      await vi.waitUntil(() => {
        const items = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item:not(.v-list-subheader)'));
        // Ensure there are items and the attribute is set (not null/undefined)
        return items.length > 0 && searchInputElement!.hasAttribute('aria-activedescendant') && searchInputElement!.getAttribute('aria-activedescendant') !== '';
      }, { timeout: 1500, interval: 20 });
    });

    it('ArrowDown/ArrowUp changes selectedIndex and aria-activedescendant', async () => {
      // Get all actual, selectable, rendered list item DOM elements
      const getSelectableItems = () => Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'))
        .filter(el => !el.classList.contains('v-list-subheader') && !el.classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled'));

      let selectableItems = getSelectableItems();
      expect(selectableItems.length).toBeGreaterThan(1); // Ensure there's something to navigate

      const initialItemId = selectableItems[0]?.id;
      expect(searchInputElement!.getAttribute('aria-activedescendant')).toBe(initialItemId);

      // ArrowDown
      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await nextTick(); // Allow selectedIndex and computed activeDescendantId to update

      selectableItems = getSelectableItems(); // Re-query if DOM could change, though not expected here
      const secondItemId = selectableItems[1]?.id;
      expect(searchInputElement!.getAttribute('aria-activedescendant')).toBe(secondItemId);

      // ArrowUp
      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      await nextTick();
      expect(searchInputElement!.getAttribute('aria-activedescendant')).toBe(initialItemId);
    })

    it('Enter key executes the selected action', async () => {
      // Initial selection (Print Document because of order: 0 within File group which comes first)
      // Need to ensure list is ready before dispatching Enter
      await vi.waitUntil(() => {
        const items = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
        const selectable = items.filter(el => !el.classList.contains('v-list-subheader') && !el.classList.contains('v-command-palette__no-results') && !el.hasAttribute('disabled'));
        return selectable.length > 0 && searchInputElement!.getAttribute('aria-activedescendant') === selectable[0]?.id;
      }, { timeout: 1000});

      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await nextTick(); // Allow action execution
      expect(mockCommandCore.executeAction).toHaveBeenCalledWith('action8', { trigger: 'command-palette' });
    })

    it('Escape key closes the palette (or navigates back if nested)', async () => {
      // Initial state: wrapper is mounted by general beforeEach, input is focused.
      // searchInputElement is available from the general beforeEach.
      expect(searchInputElement).not.toBeNull();
      expect(document.activeElement).toBe(searchInputElement);

      // 1. Press Escape at root level - should close
      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await nextTick(); // Allow modelValue update from component

      let modelValueEmissions = wrapper.emitted('update:modelValue');
      expect(modelValueEmissions).toHaveLength(1);
      expect(modelValueEmissions![0][0]).toBe(false);

      // 2. Re-open the palette for nesting test
      await wrapper.setProps({ modelValue: true });
      // Wait for it to re-open and search input to be re-focused
      await vi.waitUntil(() => {
        searchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
        return searchInputElement && document.activeElement === searchInputElement;
      }, { timeout: 1500 });
      // Also wait for list to be ready for click
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette .v-list-item'), { timeout: 1000 });

      let emittedUpdateListCount = (wrapper.emitted('update:list') || []).length;

      // 3. Navigate to nested view ("User Profile")
      let userActionElement: HTMLElement | undefined | null;
      await vi.waitUntil(() => {
        const listItems = Array.from(document.body.querySelectorAll('.v-command-palette .v-list-item'));
        userActionElement = listItems.find(item => item.textContent?.includes('User Profile')) as HTMLElement | undefined;
        return !!userActionElement;
      }, { timeout: 1000 });
      expect(userActionElement).toBeDefined();
      userActionElement!.click();
      await vi.waitUntil(() => (wrapper.emitted('update:list') || []).length > emittedUpdateListCount, { timeout: 2000 });

      // Sanity check: we are in nested view, search input should still be the active one (or a new one if re-rendered)
      searchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
      expect(searchInputElement).not.toBeNull();
      expect(document.activeElement).toBe(searchInputElement); // Focus should be maintained or returned to search input
      expect(document.body.querySelector('.v-command-palette__title')?.textContent).toBe('User Profile');

      // 4. Press Escape in nested view - should navigate back, not close yet
      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await nextTick(); // Allow navigateBack logic

      expect(document.body.querySelector('.v-command-palette__title')?.textContent).toBe('Commands');
      modelValueEmissions = wrapper.emitted('update:modelValue');
      expect(modelValueEmissions).toHaveLength(1); // Still 1, from the first close. No new close emission.

      // 5. Press Escape again at root level - should close now
      // Ensure search input is still valid and focused for the event dispatch
      searchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
      expect(searchInputElement).not.toBeNull();
      // Focus might be lost and need to be reset if the component doesn't manage it perfectly on navigateBack.
      // Forcing focus here to ensure the keydown event is captured by the intended element.
      searchInputElement!.focus();
      await nextTick(); // allow focus to apply
      expect(document.activeElement).toBe(searchInputElement);

      searchInputElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await nextTick(); // Allow modelValue update

      modelValueEmissions = wrapper.emitted('update:modelValue');
      expect(modelValueEmissions).toHaveLength(2); // Now it should be 2 emissions
      expect(modelValueEmissions![1][0]).toBe(false); // The second emission should also be false
    })

    it('focus management: search input focused on open', async () => {
      // This test uses its own localWrapper to test initial opening and focus.
      const localMockCommandCore = createMockCommandCore();
      const localMockTheme = createMockTheme();
      const localMockDefaults = ref<DefaultsInstance>({ global: {}, VDialog: { transition: false } });
      const localMockLocale = createMockLocale();
      const localMockDisplay = createMockDisplay();
      const localMockIcons = createMockIcons();

      const localWrapper = mount(VCommandPalette, {
        attachTo: document.body, // Required for activeElement to work reliably in JSDOM
        props: { modelValue: false }, // Start with dialog closed
        global: {
          provide: {
            [CommandCoreSymbol as symbol]: localMockCommandCore,
            [ThemeSymbol as symbol]: localMockTheme,
            [DefaultsSymbol as symbol]: localMockDefaults,
            [LocaleSymbol as symbol]: localMockLocale,
            [DisplaySymbol as symbol]: localMockDisplay,
            [IconSymbol as symbol]: localMockIcons,
          }
        }
      })

      // Dialog is initially closed. No input should be focused yet from the palette.
      const initialActiveElement = document.activeElement;

      await localWrapper.setProps({ modelValue: true });

      // Wait for VDialog to open (which involves a nextTick internally for its own modelValue)
      // and for VCommandPalette's watcher on isActive to fire its nextTick to call focus().
      let paletteSearchInputElement: HTMLInputElement | null = null;
      await vi.waitUntil(() => {
        paletteSearchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
        return paletteSearchInputElement && document.activeElement === paletteSearchInputElement;
      }, { timeout: 2000, interval: 50 }); // Increased timeout, focus can take a moment

      expect(document.activeElement).toBe(paletteSearchInputElement);
      expect(paletteSearchInputElement).not.toBe(initialActiveElement);

      localWrapper.unmount();
      // Restore body content if needed, though afterEach should handle it.
      document.body.innerHTML = '';
    })
  })

  describe('Grouping & Sorting', () => {
    it('verifies actions are grouped with VListSubheader and sorted correctly', async () => {
      wrapper = mountComponent();
      // Wait for the dialog to open and content to be teleported and rendered
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette__list .v-list-item'), { timeout: 1000 });

      const paletteElement = document.body.querySelector('.v-command-palette');
      expect(paletteElement).not.toBeNull();

      const renderedItems = Array.from(paletteElement!.querySelectorAll('.v-command-palette__list > *'));
      const groupHeaders = Array.from(paletteElement!.querySelectorAll('.v-list-subheader.v-command-palette__subheader'));

      // Expect 3 groups: File, Edit, Other Actions (based on sampleActions)
      // Ungrouped 'Go to Settings' (order 1), 'Async SubItems', 'User Profile' form 'Other Actions'
      // 'Logout' is hidden.
      expect(groupHeaders.length).toBe(3);
      expect(groupHeaders.find(h => h.textContent?.includes('File'))).toBeDefined();
      expect(groupHeaders.find(h => h.textContent?.includes('Edit'))).toBeDefined();
      expect(groupHeaders.find(h => h.textContent?.includes('Other Actions'))).toBeDefined();

      // Ensure order of headers if necessary (e.g. File before Edit)
      const headerTexts = groupHeaders.map(h => h.textContent);
      expect(headerTexts.indexOf('File')).toBeLessThan(headerTexts.indexOf('Edit'));
      expect(headerTexts.indexOf('Edit')).toBeLessThan(headerTexts.indexOf('Other Actions'));


      const getListItemTextsUnderHeader = (headerText: string) => {
        const headerEl = groupHeaders.find(h => h.textContent?.includes(headerText));
        if (!headerEl) return [];
        const texts: string[] = [];
        let nextEl = headerEl.nextElementSibling;
        while (nextEl && !nextEl.classList.contains('v-list-subheader')) {
          if (nextEl.classList.contains('v-list-item') && !nextEl.classList.contains('v-command-palette__no-results') && !nextEl.hasAttribute('disabled')) {
            texts.push(nextEl.textContent?.trim() || '');
          }
          nextEl = nextEl.nextElementSibling;
        }
        return texts;
      };

      const fileItems = getListItemTextsUnderHeader('File');
      // Original sampleActions:
      // { id: 'action1', title: 'Open File', group: 'File', order: 1 },
      // { id: 'action2', title: 'Save File', hotkey: 'ctrl+s', group: 'File', order: 2 },
      // { id: 'action8', title: 'Print Document', group: 'File', order: 0 },
      expect(fileItems.length).toBe(3);
      // Adjust to check for text containment to avoid issues with VHotKey rendering
      expect(fileItems[0]).toContain('Print Document');
      expect(fileItems[1]).toContain('Open File');
      expect(fileItems[2]).toContain('Save File');
      // Check order if exact text is an issue due to hotkeys
      expect(fileItems.map(t => t.startsWith('Print'))).toBeTruthy();
      expect(fileItems.map(t => t.startsWith('Open'))).toBeTruthy();
      expect(fileItems.map(t => t.startsWith('Save'))).toBeTruthy();
      // Further check order more robustly
      const printIndex = fileItems.findIndex(t => t.includes('Print Document'));
      const openIndex = fileItems.findIndex(t => t.includes('Open File'));
      const saveIndex = fileItems.findIndex(t => t.includes('Save File'));
      expect(printIndex).toBeLessThan(openIndex);
      expect(openIndex).toBeLessThan(saveIndex);

      const editItems = getListItemTextsUnderHeader('Edit');
      // { id: 'action3', title: 'Copy Text', group: 'Edit' }, (order Infinity, then alpha)
      // { id: 'action4', title: 'Paste Text', group: 'Edit' }, (order Infinity, then alpha)
      expect(editItems.length).toBe(2);
      expect(editItems).toEqual(['Copy Text', 'Paste Text']); // Sorted alphabetically as no order prop

      const otherItems = getListItemTextsUnderHeader('Other Actions');
      // { id: 'action7', title: 'Go to Settings', order: 1 }, (Ungrouped)
      // { id: 'action5', title: 'User Profile', subItems: ... }, (Ungrouped, no order)
      // { id: 'action9', title: 'Async SubItems with Loader', subItems: ... } (Ungrouped, no order)
      // Expected: Go to Settings (order 1), then Async SubItems, then User Profile (alpha for no order)
      expect(otherItems.length).toBe(3);
      expect(otherItems).toEqual(['Go to Settings', 'Async SubItems with Loader', 'User Profile']);
    })
  })

  describe('ARIA Attributes', () => {
    it('checks for correct roles and aria attributes', async () => {
      wrapper = mountComponent()
      // Wait for the dialog to open and content to be teleported and rendered
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette'), { timeout: 1000 });

      const dialogElement = document.body.querySelector('.v-command-palette');
      expect(dialogElement).not.toBeNull();
      expect(dialogElement!.getAttribute('role')).toBe('dialog');
      expect(dialogElement!.getAttribute('aria-modal')).toBe('true');

      // Corrected selector: removed trailing underscore
      const searchInputElement = document.body.querySelector('.v-command-palette__search input[type="text"]');
      expect(searchInputElement).not.toBeNull();
      // The VTextField itself is a combobox container, its input has the direct aria roles.
      // We also need to find the VTextField's root to check its attributes if the test intends to check the component not just the input.
      const textFieldWrapper = wrapper.findComponent(VTextField);
      expect(textFieldWrapper.exists()).toBe(true);
      // Try checking the attribute on the component's root DOM element directly
      expect(textFieldWrapper.element.getAttribute('role')).toBe('combobox');
      expect(textFieldWrapper.attributes('aria-haspopup')).toBe('listbox');
      expect(textFieldWrapper.attributes('aria-expanded')).toBe('true');
      const listId = textFieldWrapper.attributes('aria-controls');
      expect(listId).toBeDefined();

      const listElement = document.body.querySelector('.v-command-palette__list');
      expect(listElement).not.toBeNull();
      expect(listElement!.getAttribute('role')).toBe('listbox');
      expect(listElement!.getAttribute('id')).toBe(listId);

      const titleElement = document.body.querySelector('.v-command-palette__title');
      expect(titleElement).not.toBeNull();
      const titleId = titleElement!.getAttribute('id');
      expect(titleId).toBeDefined();
      expect(listElement!.getAttribute('aria-labelledby')).toBe(titleId);
      expect(textFieldWrapper.attributes('aria-labelledby')).toBe(titleId);

      // Wait for list items to be populated for active descendant check
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette__list .v-list-item[role="option"]'), { timeout: 1000 });

      const actionItemElements = Array.from(document.body.querySelectorAll('.v-command-palette__list .v-list-item[role="option"]'));
      const selectableActionItems = actionItemElements.filter(el => !el.hasAttribute('disabled') && !el.classList.contains('v-command-palette__no-results'));

      expect(selectableActionItems.length).toBeGreaterThan(0);
      const firstActionItem = selectableActionItems[0];
      expect(firstActionItem.getAttribute('aria-selected')).toBe('true');
      expect(searchInputElement!.getAttribute('aria-activedescendant')).toBe(firstActionItem.getAttribute('id'));

      if (selectableActionItems.length > 1) {
        const secondActionItem = selectableActionItems[1];
        expect(secondActionItem.getAttribute('aria-selected')).toBe('false');
      }
    })
  })

  describe('Slots', () => {
    it('no-results slot renders custom content', async () => {
      wrapper = mountComponent({}, sampleActions, {
        'no-results': '<div class="custom-no-results">Nothing here!</div>',
      })
      // Wait for the dialog to open and content to be teleported
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette'), { timeout: 1000 });

      const textFieldWrapper = wrapper.findComponent(VTextField);
      expect(textFieldWrapper.exists()).toBe(true);
      await textFieldWrapper.setValue('nonexistentsearchquery');
      // Wait for the list to update and potentially show no-results
      await vi.waitUntil(() => {
        const noResultsInBody = document.body.querySelector('.custom-no-results');
        const defaultNoResultsInBody = document.body.querySelector('.v-command-palette__no-results');
        return !!noResultsInBody || !!defaultNoResultsInBody; // Wait for either to appear
      }, { timeout: 1000 });

      const customNoResults = document.body.querySelector('.custom-no-results');
      expect(customNoResults).not.toBeNull();
      expect(customNoResults!.textContent).toBe('Nothing here!');

      // Default should not be present if custom is
      const defaultNoResults = document.body.querySelector('.v-command-palette__no-results');
      expect(defaultNoResults).toBeNull();
    })

    it('item slot renders custom item structure and receives scope', async () => {
      let slotScopeData: any = null
      const singleAction = [sampleActions.find(a => a.id === 'action1')!]; // Ensure 'action1' is Open File
      wrapper = mountComponent({}, singleAction, {
        item: (scope: any) => {
          slotScopeData = scope
          return `<div class="custom-item" id="custom-${scope.action.id}">ITEM: ${scope.action.title} - Selected: ${scope.isSelected}</div>`
        },
      })
      // Wait for the dialog and custom item to be rendered in the body
      await vi.waitUntil(() => document.body.querySelector('.custom-item'), { timeout: 1000 });

      const customItem = document.body.querySelector('.custom-item');
      expect(customItem).not.toBeNull();
      // Initial selection is the first item.
      expect(customItem!.textContent).toBe(`ITEM: ${singleAction[0].title} - Selected: true`)
      expect(slotScopeData).not.toBeNull()
      expect(slotScopeData.action.id).toBe(singleAction[0].id)
      // The index in the rendered list (groupedAndSortedActions) will be 0 if no headers, or more if headers exist.
      // For a single action with no group, it should be the first actual item, so index 0 unless a default header appears.
      // Given it's one ungrouped action, it might be under "Other Actions" if other groups exist or directly if no groups.
      // For robustness with single item, we expect it to be the first *actual* action.
      const firstActionIndexInComponent = wrapper.vm.groupedAndSortedActions.findIndex((item: any) => !item.isHeader && item.id === singleAction[0].id);
      expect(slotScopeData.index).toBe(firstActionIndexInComponent);
      expect(slotScopeData.isSelected).toBe(true)
      expect(typeof slotScopeData.select).toBe('function')

      const mockExecute = mockCommandCore.executeAction as any;
      mockExecute.mockClear();
      slotScopeData.select() // This calls onActionClick internally
      await nextTick() // Allow onActionClick to process
      expect(mockExecute).toHaveBeenCalledWith(singleAction[0].id, { trigger: 'command-palette' })
    })

    it('header slot renders custom header and receives scope', async () => {
      let headerSlotScope: any = null;
      wrapper = mountComponent({}, sampleActions, {
        header: (scope: any) => {
          headerSlotScope = scope;
          return `<div class="custom-header">Custom Header: ${scope.title} ${scope.parentAction ? '(Sub)' : '(Root)'} <button id="custom-back" @click="scope.navigateBack()">Back</button></div>`
        }
      })
      // Wait for dialog and custom header
      await vi.waitUntil(() => document.body.querySelector('.custom-header'), { timeout: 1000 });

      let customHeader = document.body.querySelector('.custom-header');
      expect(customHeader).not.toBeNull();
      expect(customHeader!.textContent).toContain('Custom Header: Commands (Root)')
      expect(headerSlotScope.title).toBe('Commands')
      expect(headerSlotScope.parentAction).toBeUndefined()
      expect(typeof headerSlotScope.navigateBack).toBe('function')

      // Navigate to a sub-level to check parentAction in slot scope
      // Find "User Profile" (action5) which has subItems
      let userActionElement: HTMLElement | null = null;
      await vi.waitUntil(() => {
        const items = Array.from(document.body.querySelectorAll('.v-list-item'));
        userActionElement = items.find(el => el.textContent?.includes('User Profile')) as HTMLElement | null;
        return !!userActionElement;
      }, {timeout: 1000});
      expect(userActionElement).not.toBeNull();
      userActionElement!.click();

      // Wait for navigation and re-render of custom header with new scope
      await vi.waitUntil(() => {
        customHeader = document.body.querySelector('.custom-header');
        return customHeader?.textContent?.includes('User Profile (Sub)');
      }, {timeout: 2000}); // subItems promise might take time

      expect(customHeader).not.toBeNull();
      expect(customHeader!.textContent).toContain('Custom Header: User Profile (Sub)')
      expect(headerSlotScope.title).toBe('User Profile')
      expect(headerSlotScope.parentAction.id).toBe('action5') // action5 is 'User Profile'

      const backButton = document.body.querySelector('#custom-back');
      expect(backButton).not.toBeNull();
      (backButton as HTMLElement).click();

      // Wait for navigation back and re-render of custom header
       await vi.waitUntil(() => {
        customHeader = document.body.querySelector('.custom-header');
        return customHeader?.textContent?.includes('Commands (Root)');
      }, {timeout: 1000});

      expect(customHeader).not.toBeNull();
      expect(customHeader!.textContent).toContain('Custom Header: Commands (Root)');
    })
  })

  describe('Loading State', () => {
    it('shows VProgressLinear when subItems are loading', async () => {
      wrapper = mountComponent()
      // Wait for the dialog to open and content to be teleported
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette'), { timeout: 1000 });

      let asyncActionElement: HTMLElement | null = null;
      await vi.waitUntil(() => {
        const items = Array.from(document.body.querySelectorAll('.v-list-item'));
        asyncActionElement = items.find(el => el.textContent?.includes('Async SubItems with Loader')) as HTMLElement | null;
        return !!asyncActionElement;
      }, {timeout: 1000});
      expect(asyncActionElement).not.toBeNull();

      // Don't await the click to catch the loading state immediately after
      asyncActionElement!.click();

      // Wait for the progress bar to appear in the document body
      await vi.waitUntil(() => document.body.querySelector('.v-command-palette__loader .v-progress-linear'), {
        timeout: 500, // Should appear quickly
        interval: 20
      });
      const progressLinearInBody = document.body.querySelector('.v-command-palette__loader .v-progress-linear');
      expect(progressLinearInBody).not.toBeNull();
      // VProgressLinear component sets aria-valuenow="0" for indeterminate, or doesn't have it.
      // Checking for its presence is enough to confirm it's visible and likely indeterminate.

      // Wait for mock subItems promise (50ms) + render time + DOM update
      // Check for the title of the new level AND disappearance of loader
      await vi.waitUntil(() => {
        const titleElement = document.body.querySelector('.v-command-palette__title');
        const loaderStillPresent = document.body.querySelector('.v-command-palette__loader .v-progress-linear');
        return titleElement?.textContent === 'Async SubItems with Loader' && !loaderStillPresent;
      }, { timeout: 2000, interval: 50 });

      const titleElement = document.body.querySelector('.v-command-palette__title');
      expect(titleElement?.textContent).toBe('Async SubItems with Loader');

      const listItemsAfterLoad = Array.from(document.body.querySelectorAll('.v-command-palette__list .v-list-item'));
      expect(listItemsAfterLoad.some(item => item.textContent?.includes('Loaded Subitem'))).toBe(true);

      // Ensure progress bar is gone
      const progressLinearAfterLoad = document.body.querySelector('.v-command-palette__loader .v-progress-linear');
      expect(progressLinearAfterLoad).toBeNull();
    })
  })
})

// Helper to ensure all actions for a test are unique if needed (optional, not used in above tests)
/*
const makeUniqueActions = (actions: ActionDefinition[], suffix: string): ActionDefinition[] => {
  return actions.map(action => ({
    ...action,
    id: `${action.id}-${suffix}`,
    ...(action.subItems && {
      subItems: async () => {
        const originalSubActions = await (action.subItems as () => Promise<ActionDefinition[]>)();
        return originalSubActions.map(sub => ({ ...sub, id: `${sub.id}-${suffix}` } as ActionDefinition));
      }
    })
  }))
}
*/
