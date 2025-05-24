// VCommandPalette.tsx
// Styles
import './VCommandPalette.scss'

// Components
import { VCommandPaletteHeader } from './VCommandPaletteHeader'
import { VCommandPaletteList } from './VCommandPaletteList'
import { VCommandPaletteSearch } from './VCommandPaletteSearch'
import { VDialog } from '@/components/VDialog'
import { VProgressLinear } from '@/components/VProgressLinear'

// Composables
import { useCommandPaletteCore } from '../../composables/useCommandPaletteCore'
import { getEffectiveHotkeyDisplay } from '../../utils/commandPaletteNavigationActions'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { ActionCoreSymbol } from '@/labs/VActionCore'

// Utilities
import { computed, inject, ref, shallowRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import type { PropType } from 'vue'

// Types
import type { Ref, VNode } from 'vue'
import type { VCommandPaletteListItemScope, VCommandPaletteListNoResultsScope } from './VCommandPaletteList'
import type { CommandPaletteListRef, UseCommandPaletteCoreProps } from '../../composables/useCommandPaletteCore'
import type { commandPaletteNavigationActions as NavigationActionsType } from '../../utils/commandPaletteNavigationActions' // For displaying hotkeys
import type { VTextField } from '@/components/VTextField'
import type { ActionCorePublicAPI, ActionDefinition, ActionContext } from '@/labs/VActionCore'

// --- START: New Type Definitions for Agnostic Mode ---

export interface VCommandPaletteCustomItem {
  id: string | number
  title: string | Ref<string>
  subtitle?: string | Ref<string>
  icon?: string | Ref<string>
  keywords?: string | string[]
  disabled?: boolean | Ref<boolean>
  handler?: (item: VCommandPaletteCustomItem) => void | Promise<void>
  onSelect?: (item: VCommandPaletteCustomItem) => void | Promise<void> // Alternative to handler
  subItems?: (context?: ActionContext) => VCommandPaletteCustomItem[] | Promise<VCommandPaletteCustomItem[]> // Context might be less rich
  hotkeyDisplay?: string | string[]
  group?: string
  order?: number
  [key: string]: any; // Allow arbitrary data
}

export type VCommandPaletteSearchFunction = (
  items: readonly (ActionDefinition | VCommandPaletteCustomItem)[],
  searchText: string,
  sourceType: 'actionCore' | 'customItems' // To let searchFn know the type of items
) => readonly (ActionDefinition | VCommandPaletteCustomItem)[];

// --- END: New Type Definitions ---

// --- START: Slot Type Definitions ---

interface VCommandPaletteHeaderScopeProps {
  parentAction?: ActionDefinition<any> | VCommandPaletteCustomItem // Updated type
  navigateBack: () => void
  title?: string
}

interface VCommandPaletteSearchControlsScopeProps {
  searchText: Ref<string>
  placeholder?: string
  inputRef: Ref<InstanceType<typeof VTextField> | null>
  searchComponentRef: Ref<InstanceType<typeof VCommandPaletteSearch> | null>
  listId: string
  activeDescendantId?: string
  ariaHasPopup: 'listbox' | undefined
  ariaExpanded: 'true' | 'false'
  ariaControls: string
  ariaLabelledby?: string
}

interface VCommandPaletteBreadcrumbsScope {
  currentLevelTitle?: string
  parentAction?: ActionDefinition<any> | VCommandPaletteCustomItem
  isRootLevel: boolean
  navigateBack: () => void
  // You can add more properties from 'core' if needed by the slot
}

interface VCommandPaletteListWrapperScopeProps {
  // Items can now be ActionDefinition or VCommandPaletteCustomItem
  actions: readonly (ActionDefinition | VCommandPaletteCustomItem | { isHeader: true, title: string, id: string })[]
  selectedIndex: Ref<number>
  listId: string
  listRef: Ref<CommandPaletteListRef | null>
  searchText: Ref<string>
  // handleItemActivated signature might need to be more generic if item type changes
  handleItemActivated: (action: ActionDefinition | VCommandPaletteCustomItem) => Promise<void>
  isLoading: Ref<boolean>
  // itemSlot scope needs to handle both ActionDefinition and VCommandPaletteCustomItem
  itemSlot?: (scope: VCommandPaletteListItemScope) => VNode[]
  noResultsSlot?: (scope: VCommandPaletteListNoResultsScope) => VNode[]
  density?: 'default' | 'comfortable' | 'compact' | null
  breadcrumbs: VCommandPaletteBreadcrumbsScope // New breadcrumbs slot
  hotkeyDisplayMode: string
}

// VCommandPaletteListItemScope needs to be adjusted in VCommandPaletteList.tsx
// to accommodate VCommandPaletteCustomItem if we pass it directly.
// For now, assuming VCommandPaletteList might internally adapt or its scope type becomes a union.

interface VCommandPaletteLoaderScopeProps {
  isLoading: Ref<boolean>
}

interface VCommandPaletteFooterScopeProps {
  // navigationActions will be different if not using ActionCore
  navigationActions: Readonly<Partial<ActionDefinition | VCommandPaletteCustomItem>[]>
  actionCoreInstance?: ActionCorePublicAPI | null
  core: ReturnType<typeof useCommandPaletteCore>
}

interface VCommandPaletteEmptyStateScopeProps {
  core: ReturnType<typeof useCommandPaletteCore>
}

type VCommandPaletteSlots = {
  header: VCommandPaletteHeaderScopeProps
  searchControls: VCommandPaletteSearchControlsScopeProps
  listWrapper: VCommandPaletteListWrapperScopeProps
  item: VCommandPaletteListItemScope // This scope is defined in VCommandPaletteList
  'no-results': VCommandPaletteListNoResultsScope // This scope is defined in VCommandPaletteList
  loader: VCommandPaletteLoaderScopeProps
  footer: VCommandPaletteFooterScopeProps
  'empty-state': VCommandPaletteEmptyStateScopeProps
  breadcrumbs: VCommandPaletteBreadcrumbsScope // New breadcrumbs slot
}

// --- END: Slot Type Definitions ---

export const makeVCommandPaletteProps = propsFactory({
  modelValue: Boolean,
  placeholder: {
    type: String,
    default: 'Type a command or search...',
  },
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  title: {
    type: String,
  },
  /**
   * Controls how breadcrumbs or contextual information about the current level are displayed.
   * - `'header'`: (Default) Shows the parent action's title in the header.
   * - `'placeholder'`: Updates the search input's placeholder with the parent action's title.
   * - `'custom'`: Enables the `breadcrumbs` slot for custom rendering.
   * - `'none'`: Hides breadcrumbs/contextual title.
   */
  breadcrumbMode: {
    type: String as PropType<'header' | 'placeholder' | 'custom' | 'none'>,
    default: 'header',
  },
  /**
   * Enables navigation to the previous level using the Backspace key when the search input is empty
   * or an item is focused.
   */
  enableBackspaceNavigation: Boolean,
  /**
   * An array of custom items to display. If provided, ActionCore will not be used for item sourcing.
   * Internal keyboard navigation will be used.
   */
  items: Array as PropType<VCommandPaletteCustomItem[]>,
  /** Custom search function. */
  searchFunction: Function as PropType<VCommandPaletteSearchFunction>,
  /** Keybinding for navigating down in agnostic mode. @default 'ArrowDown' */
  keymapNavigateDown: { type: String, default: 'ArrowDown' },
  /** Keybinding for navigating up in agnostic mode. @default 'ArrowUp' */
  keymapNavigateUp: { type: String, default: 'ArrowUp' },
  /** Keybinding for selecting an item in agnostic mode. @default 'Enter' */
  keymapSelectItem: { type: String, default: 'Enter' },
  /** Keybinding for navigating back or closing in agnostic mode. @default 'Escape' */
  keymapNavigateBackOrClose: { type: String, default: 'Escape' },
  // Consider adding PageUp, PageDown, Home, End keymaps if full parity is desired.

  /** Determines how hotkeys are displayed in the list. \'symbol\' (default) or \'text\'. */
  hotkeyDisplayMode: {
    type: String as PropType<'symbol' | 'text'>,
    default: 'symbol' as const,
  },

  ...makeDensityProps(),
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VCommandPalette')

export const VCommandPalette = genericComponent<VCommandPaletteSlots>()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:list': () => true,
    // New event for agnostic mode when an item is selected/activated
    'item-activated': (item: VCommandPaletteCustomItem) => true,
  },
  setup (props, { emit, slots }) {
    provideTheme(props)
    const { densityClasses } = useDensity(props, 'v-command-palette')

    const actionCore = inject(ActionCoreSymbol, null) // Inject can return null
    if (!actionCore && !props.items) {
      // eslint-disable-next-line no-console
      console.warn(`[Vuetify VCommandPalette] VActionCore instance not found and no custom 'items' prop provided. Palette may not function correctly.`)
    }

    const searchComponentRef = ref<InstanceType<typeof VCommandPaletteSearch> | null>(null)
    const textFieldInstanceRef = ref<InstanceType<typeof VTextField> | null>(null)
    // listRef type is CommandPaletteListRef, which includes scrollToItem.
    // VCommandPaletteList.tsx will need to ensure it exposes this method correctly.
    const listRef = ref<CommandPaletteListRef | null>(null)

    const core = useCommandPaletteCore(
      props as UseCommandPaletteCoreProps, // This will now include items, searchFunction, keymaps
      actionCore, // Pass ActionCore instance, can be null
      emit,
      textFieldInstanceRef,
      listRef
    )

    const isEmptyState = computed(() => {
      return core.isActive.value &&
             !core.isLoadingSubItems.value &&
             core.isRootLevel.value &&
             (core.isUsingActionCore.value // Check if core is using ActionCore
               ? (actionCore?.allActions.value.filter((action: ActionDefinition) => !action.meta?.paletteHidden).length === 0)
               : (core.currentRootItems.value.length === 0) // Check custom items if not using ActionCore
             )
    })

    useRender(() => (
      <VDialog
        v-model={ core.isActive.value }
        width={ props.width }
        scrollable
        class={['v-command-palette-dialog', densityClasses.value]}
        contentClass="v-command-palette-dialog__content"
        scrim="#000000"
        afterLeave={ core.cleanUpPostClose }
      >
        <div
          class="v-command-palette"
          role="dialog"
          aria-modal="true"
          aria-label={ props.title || core.currentLevelTitle.value }
          // onKeydown is now handled internally by useCommandPaletteCore if not using ActionCore for navigation
        >
          { slots['empty-state'] && isEmptyState.value ? (
            slots['empty-state']({ core })
          ) : (
            <>
              <div class="v-command-palette__top">
              { slots.header && props.breadcrumbMode === 'header' ? slots.header({
                parentAction: core.currentParentAction.value,
                navigateBack: core.navigateBack,
                title: core.isRootLevel.value ? props.title : (core.currentLevelTitle.value || props.title),
              }) : props.breadcrumbMode === 'header' ? (
                <VCommandPaletteHeader
                  title={ core.isRootLevel.value ? props.title : (core.currentLevelTitle.value || props.title) }
                  isRootLevel={ core.isRootLevel.value }
                  listId={ core.listId.value }
                  onNavigateBack={ core.navigateBack }
                />
              ) : null }

              { /* Breadcrumbs slot - rendered if mode is 'custom' */ }
              { slots.breadcrumbs && props.breadcrumbMode === 'custom' && (
                slots.breadcrumbs({
                  currentLevelTitle: core.currentLevelTitle.value,
                  parentAction: core.currentParentAction.value,
                  isRootLevel: core.isRootLevel.value,
                  navigateBack: core.navigateBack,
                })
              )}

              { slots.searchControls ? slots.searchControls({
                searchText: core.searchText,
                placeholder: props.breadcrumbMode === 'placeholder' && !core.isRootLevel.value ? core.currentLevelTitle.value : props.placeholder,
                inputRef: textFieldInstanceRef,
                searchComponentRef,
                listId: core.listId.value,
                activeDescendantId: core.activeDescendantId.value,
                ariaHasPopup: 'listbox',
                ariaExpanded: (core.isActive.value && core.groupedAndSortedActions.value.length > 0) ? 'true' : 'false',
                ariaControls: core.listId.value,
                ariaLabelledby: `${core.listId.value}-title`,
              }) : (
                <VCommandPaletteSearch
                  ref={ searchComponentRef }
                  inputRef={ textFieldInstanceRef }
                  modelValue={ core.searchText.value }
                  placeholder={ props.breadcrumbMode === 'placeholder' && !core.isRootLevel.value ? core.currentLevelTitle.value : props.placeholder }
                  autofocus
                  onUpdate:modelValue={ (val: string) => core.searchText.value = val }
                  // Proper ARIA attributes
                  ariaControls={ core.listId.value }
                  ariaActivedescendant={ core.activeDescendantId.value }
                  ariaLabelledby={ `${core.listId.value}-title` }
                  ariaHaspopup="listbox"
                  ariaExpanded={ (core.isActive.value && core.groupedAndSortedActions.value.length > 0) ? 'true' : 'false' }
                />
              )}
            </div>

              { slots.loader ? slots.loader({
                isLoading: core.isLoadingSubItems,
              }) : core.isLoadingSubItems.value && (
                <div class="v-command-palette__loader">
                  <VProgressLinear indeterminate color="primary" />
                </div>
              )}

              { !core.isLoadingSubItems.value && (slots.listWrapper ? slots.listWrapper({
                actions: core.groupedAndSortedActions.value, // This will be (ActionDefinition | VCommandPaletteCustomItem | HeaderItem)[]
                selectedIndex: core.selectedIndex,
                listId: core.listId.value,
                listRef, // Pass the ref for VCommandPaletteList instance
                searchText: core.searchText,
                handleItemActivated: core.handleItemActivated, // Signature needs to accept both types
                isLoading: core.isLoadingSubItems,
                itemSlot: slots.item,
                noResultsSlot: slots['no-results'],
                density: props.density,
                breadcrumbs: {
                  currentLevelTitle: core.currentLevelTitle.value,
                  parentAction: core.currentParentAction.value,
                  isRootLevel: core.isRootLevel.value,
                  navigateBack: core.navigateBack,
                },
                hotkeyDisplayMode: props.hotkeyDisplayMode,
              }) : (
                  <VCommandPaletteList
                    ref={ listRef }
                    // VCommandPaletteList props.actions will need to accept the union type
                    actions={ core.groupedAndSortedActions.value }
                    selectedIndex={ core.selectedIndex.value }
                    listId={ core.listId.value }
                    searchText={ core.searchText.value }
                    density={ props.density }
                    hotkeyDisplayMode={ props.hotkeyDisplayMode }
                    onActionClick={ core.handleItemActivated } // handleItemActivated needs to handle both types
                    onItemNavigate={ core.handleItemActivated } // Assuming subItems are handled similarly for both
                    isUsingActionCore={ core.isUsingActionCore.value } // Pass this to VCommandPaletteList
                    // VCommandPaletteList will need to know if it should expect ActionDefinition or VCommandPaletteCustomItem
                    // to correctly access properties like hotkeyDisplay or use action-id with VHotKey.
                  >
                    {{
                      item: slots.item,
                      'no-results': slots['no-results'],
                    }}
                  </VCommandPaletteList>
              )
              )}

              { slots.footer && (
                <div class="v-command-palette__footer">
                  { slots.footer({
                    // core.navigationActions will be different if not using ActionCore
                    navigationActions: core.navigationActions.value,
                    actionCoreInstance: core.actionCoreInstance, // This might be null
                    core,
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </VDialog>
    ))

    // Expose methods. Note: getEffectiveHotkey is ActionCore specific.
    // Need to decide what to expose if not using ActionCore.
    const getEffectiveHotkey = (actionId: string) => {
      const action = core.navigationActions.value.find(a => a.id === actionId);
      if (!action) return undefined;

      // If ActionCore is being used and the action has a 'hotkey' property (characteristic of ActionDefinition)
      if (core.isUsingActionCore.value && actionCore && 'hotkey' in action) {
        return getEffectiveHotkeyDisplay(action as ActionDefinition, actionCore);
      } else if ('hotkeyDisplay' in action && action.hotkeyDisplay) {
        // If it's an agnostic/custom navigation action with a hotkeyDisplay property
        const display = action.hotkeyDisplay;
        return Array.isArray(display) ? display[0] : display;
      }
      return undefined;
    }

    return {
      focus: core.focusSearchInput,
      core, // Exposing core is useful for advanced slots and testing
      getEffectiveHotkey,
      // Expose navigation actions for footer slot etc. This will be reactive.
      navigationActions: core.navigationActions,
    }
  },
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
