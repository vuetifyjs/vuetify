// VCommandPalette.tsx
// Styles
import './VCommandPalette.scss'

// Components (Vuetify)
import { VDialog } from '@/components/VDialog'
import { VTextField } from '@/components/VTextField'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCommandPaletteList, type VCommandPaletteListItemScope, type VCommandPaletteListNoResultsScope } from './VCommandPaletteList'
import { VCommandPaletteHeader } from './VCommandPaletteHeader'
import { VCommandPaletteSearch } from './VCommandPaletteSearch'

// Composables (Vuetify and ActionCore)
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { ActionCoreSymbol, type ActionDefinition, type ActionCorePublicAPI } from '@/labs/VActionCore'
import { useCommandPaletteCore, type CommandPaletteListRef, type UseCommandPaletteCoreProps } from '../../composables/useCommandPaletteCore'
import { getEffectiveHotkeyDisplay, type commandPaletteNavigationActions } from '../../utils/commandPaletteNavigationActions' // For displaying hotkeys

// Utilities
import { ref, inject, type VNode, type Ref, computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// --- START: Slot Type Definitions ---

interface VCommandPaletteHeaderScopeProps {
  parentAction?: ActionDefinition<any>;
  navigateBack: () => void;
  title?: string;
}

interface VCommandPaletteSearchControlsScopeProps {
  searchText: Ref<string>;
  placeholder?: string;
  inputRef: Ref<InstanceType<typeof VTextField> | null>; // Ref for the VTextField instance itself
  searchComponentRef: Ref<InstanceType<typeof VCommandPaletteSearch> | null>; // Ref for VCommandPaletteSearch component if default is used
  listId: string;
  activeDescendantId?: string;
  // Props for aria attributes on the input
  ariaHasPopup: 'listbox' | undefined;
  ariaExpanded: 'true' | 'false';
  ariaControls: string;
  ariaLabelledby?: string; // If a title is associated with the search input
}

interface VCommandPaletteListWrapperScopeProps {
  actions: readonly (ActionDefinition | { isHeader: true, title: string, id: string })[];
  selectedIndex: Ref<number>;
  listId: string;
  listRef: Ref<CommandPaletteListRef | null>;
  searchText: Ref<string>;
  handleItemActivated: (action: ActionDefinition) => Promise<void>;
  isLoading: Ref<boolean>;
  itemSlot?: (scope: VCommandPaletteListItemScope) => VNode[];
  noResultsSlot?: (scope: VCommandPaletteListNoResultsScope) => VNode[];
}

interface VCommandPaletteItemScopeProps extends VCommandPaletteListItemScope {}
interface VCommandPaletteNoResultsScopeProps extends VCommandPaletteListNoResultsScope {}

interface VCommandPaletteLoaderScopeProps {
  isLoading: Ref<boolean>;
}

interface VCommandPaletteFooterScopeProps {
  navigationActions: typeof commandPaletteNavigationActions; // The array of navigation action definitions
  actionCoreInstance?: ActionCorePublicAPI | null; // To resolve effective hotkeys
  core: ReturnType<typeof useCommandPaletteCore>; // Full core access if needed
}

interface VCommandPaletteEmptyStateScopeProps {
  core: ReturnType<typeof useCommandPaletteCore>;
}

type HeaderSlotFunc = (scope: VCommandPaletteHeaderScopeProps) => VNode[];
type SearchControlsSlotFunc = (scope: VCommandPaletteSearchControlsScopeProps) => VNode[];
type ListWrapperSlotFunc = (scope: VCommandPaletteListWrapperScopeProps) => VNode[];
type ItemSlotFunc = (scope: VCommandPaletteItemScopeProps) => VNode[];
type NoResultsSlotFunc = (scope: VCommandPaletteNoResultsScopeProps) => VNode[];
type LoaderSlotFunc = (scope: VCommandPaletteLoaderScopeProps) => VNode[];
type FooterSlotFunc = (scope: VCommandPaletteFooterScopeProps) => VNode[];
type EmptyStateSlotFunc = (scope: VCommandPaletteEmptyStateScopeProps) => VNode[];


// Combined Typed Slots for VCommandPalette
interface VCommandPaletteTypedSlots {
  header?: HeaderSlotFunc;
  searchControls?: SearchControlsSlotFunc;
  listWrapper?: ListWrapperSlotFunc;
  item?: ItemSlotFunc; // Item slot is passed down to VCommandPaletteList or custom list
  'no-results'?: NoResultsSlotFunc; // No-results slot is passed down
  loader?: LoaderSlotFunc;
  footer?: FooterSlotFunc;
  'empty-state'?: EmptyStateSlotFunc; // When no actions are available at all
  [key: string]: unknown;
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
  // Title for the palette, used in header if not overridden by slot or parent action
  title: {
      type: String,
  },
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VCommandPalette')

export const VCommandPalette = genericComponent<VCommandPaletteTypedSlots>()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:list': () => true, // Emitted by core for tests
  },
  setup(props, { emit, slots }) {
    provideTheme(props)
    const typedSlots = slots as VCommandPaletteTypedSlots;

    const actionCore = inject(ActionCoreSymbol)
    if (!actionCore) {
      // eslint-disable-next-line no-console
      console.warn('[Vuetify VCommandPalette] VActionCore instance not found. Keybindings and action loading will not work.');
    }

    const searchComponentRef = ref<InstanceType<typeof VCommandPaletteSearch> | null>(null)
    const textFieldInstanceRef = ref<InstanceType<typeof VTextField> | null>(null)
    const listRef = ref<CommandPaletteListRef | null>(null)

    const core = useCommandPaletteCore(
      props as UseCommandPaletteCoreProps, // Pass all relevant props
      actionCore,
      emit,
      textFieldInstanceRef,
      listRef
    )

    // Computed for empty state: true if palette is active, not loading, and has no initial actions at root.
    const isEmptyState = computed(() => {
      return core.isActive.value &&
             !core.isLoadingSubItems.value &&
             core.isRootLevel.value &&
             actionCore && // ensure actionCore is available
             actionCore.allActions.value.filter((action: ActionDefinition) => !action.meta?.paletteHidden).length === 0;
    });

    useRender(() => (
      <VDialog
        v-model={core.isActive.value}
        width={props.width}
        scrollable
        class="v-command-palette-dialog"
        contentClass="v-command-palette-dialog__content" // Used by isCommandPaletteFocused
        scrim="#000000" // Consider making scrim configurable or themeable
        // Consider adding persistent prop if desired for some use cases
      >
        <div
          class="v-command-palette"
          role="dialog" // Role is on the div inside VDialog
          aria-modal="true"
          // aria-labelledby could point to a title in the header slot or a default title
          aria-label={props.title} // Default label, can be enhanced by header
          // onKeydown={core.handleKeydown} // Removed: VActionCore handles keydown globally
        >
          {/* Empty State Slot */}
          {typedSlots['empty-state'] && isEmptyState.value ? (
            typedSlots['empty-state']({ core })
          ) : (
            <>
              <div class="v-command-palette__top">
              {/* Header Slot */}
              {typedSlots.header ? typedSlots.header({
                parentAction: core.currentParentAction.value,
                navigateBack: core.navigateBack,
                title: core.currentLevelTitle.value || props.title,
              }) : (
                <VCommandPaletteHeader
                  title={core.currentLevelTitle.value || props.title}
                  isRootLevel={core.isRootLevel.value}
                  listId={core.listId} // core.listId is a Ref now
                  onNavigateBack={core.navigateBack}
                />
              )}

              {/* Search Controls Slot */}
              {typedSlots.searchControls ? typedSlots.searchControls({
                searchText: core.searchText,
                placeholder: props.placeholder,
                inputRef: textFieldInstanceRef,
                searchComponentRef: searchComponentRef,
                listId: core.listId,
                activeDescendantId: core.activeDescendantId.value,
                ariaHasPopup: 'listbox',
                ariaExpanded: (core.isActive.value && core.groupedAndSortedActions.value.length > 0) ? 'true' : 'false',
                ariaControls: core.listId,
                ariaLabelledby: `${core.listId}-title` // Assuming header provides this ID
              }) : (
                <VCommandPaletteSearch
                  ref={searchComponentRef}
                  inputRef={textFieldInstanceRef}
                  modelValue={core.searchText.value}
                  placeholder={props.placeholder}
                  autofocus
                  onUpdate:modelValue={(val: string) => core.searchText.value = val}
                  role="combobox"
                  aria-haspopup="listbox"
                  aria-expanded={(core.isActive.value && core.groupedAndSortedActions.value.length > 0) ? 'true' : 'false'}
                  aria-controls={core.listId}
                  aria-activedescendant={core.activeDescendantId.value}
                  // aria-labelledby could be an ID from the header, or a general label for search
                />
              )}
            </div>

              {/* Loader Slot */}
              {typedSlots.loader ? typedSlots.loader({
                isLoading: core.isLoadingSubItems,
              }) : core.isLoadingSubItems.value && (
                <div class="v-command-palette__loader">
                  <VProgressLinear indeterminate color="primary" />
                </div>
              )}

              {/* List Wrapper Slot */}
              {!core.isLoadingSubItems.value && (typedSlots.listWrapper ? typedSlots.listWrapper({
                  actions: core.groupedAndSortedActions.value,
                  selectedIndex: core.selectedIndex,
                  listId: core.listId,
                  listRef: listRef,
                  searchText: core.searchText,
                  handleItemActivated: core.handleItemActivated,
                  isLoading: core.isLoadingSubItems,
                  itemSlot: typedSlots.item,
                  noResultsSlot: typedSlots['no-results'],
                }) : (
                  <VCommandPaletteList
                    ref={listRef}
                    actions={core.groupedAndSortedActions.value}
                    selectedIndex={core.selectedIndex.value}
                    listId={core.listId}
                    searchText={core.searchText.value}
                    onActionClick={core.handleItemActivated}
                    onItemNavigate={core.handleItemActivated}
                    v-slots={{
                      item: typedSlots.item,
                      'no-results': typedSlots['no-results'],
                    } as any} // Keep as any for now due to existing TODO about slot types
                  />
                )
              )}

              {/* Footer Slot */}
              {typedSlots.footer && (
                <div class="v-command-palette__footer">
                  {typedSlots.footer({
                    navigationActions: core.navigationActions,
                    actionCoreInstance: core.actionCoreInstance,
                    core,
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </VDialog>
    ))

    return {
      focus: core.focusSearchInput,
      // Expose core for testing or advanced usage if absolutely necessary
      core,
      // Expose a method to get current effective keybindings for display
      getEffectiveHotkey: (actionId: string) => {
        const action = core.navigationActions.find(a => a.id === actionId) || actionCore?.getAction(actionId);
        if (action && actionCore) {
          return getEffectiveHotkeyDisplay(action, actionCore);
        }
        return undefined;
      },
      // Expose navigation actions for direct use if needed by parent or for building custom UI for keybindings
      navigationActions: core.navigationActions,
    }
  }
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
