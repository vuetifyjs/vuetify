// VCommandPalette.tsx
// Styles
import './VCommandPalette.scss'

// Components (Vuetify)
import { VDialog } from '@/components/VDialog'
import { VTextField } from '@/components/VTextField'
import { VIcon } from '@/components/VIcon'
import { VBtn } from '@/components/VBtn'
import { VHotKey } from '../VHotKey/VHotKey'
import { VProgressLinear } from '@/components/VProgressLinear'
import { VCommandPaletteList, type VCommandPaletteListItemScope, type VCommandPaletteListNoResultsScope } from './VCommandPaletteList'

// Composables (Vuetify and CommandCore)
import { makeComponentProps } from '@/composables/component'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { CommandCoreSymbol, type ActionDefinition, type ActionContext } from '@/labs/command-core'
import { useId } from 'vue'

// Utilities
import { computed, ref, watch, inject, nextTick, unref, shallowRef, type VNode } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
interface PaletteLevel {
  parentAction?: ActionDefinition
  actions: readonly ActionDefinition[]
  title?: string
}

// Type predicate for header items
function isHeaderItem(item: any): item is { isHeader: true; title: string; id: string } {
  return item && typeof item === 'object' && 'isHeader' in item && item.isHeader === true;
}

/**
 * Default priorities for action groups. Lower numbers appear first.
 * Groups not listed here will get a default priority (e.g., 100).
 */
const defaultGroupPriorities: Record<string, number> = {
  'Navigation': 1,
  'File': 2,
  'Edit': 3,
  // Add more common groups as needed
};
const UNGROUPED_PRIORITY = 100;
const UNGROUPED_TITLE = 'Other Actions';

// Explicit Slot Type Definitions
interface VCommandPaletteHeaderScopeProps {
  parentAction?: ActionDefinition<any>;
  navigateBack: () => void;
  title?: string;
}

interface VCommandPaletteItemScopeProps extends VCommandPaletteListItemScope {}

interface VCommandPaletteNoResultsScopeProps extends VCommandPaletteListNoResultsScope {}

type HeaderSlotFunc = (scope: VCommandPaletteHeaderScopeProps) => VNode[];
type ItemSlotFunc = (scope: VCommandPaletteItemScopeProps) => VNode[];
type NoResultsSlotFunc = (scope: VCommandPaletteNoResultsScopeProps) => VNode[];

interface VCommandPaletteTypedSlots {
  item?: ItemSlotFunc;
  header?: HeaderSlotFunc;
  'no-results'?: NoResultsSlotFunc;
}

export const makeVCommandPaletteProps = propsFactory({
  modelValue: Boolean,
  placeholder: {
    type: String,
    default: 'Search commands...',
  },
  closeOnExecute: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [String, Number],
    default: 600,
  },
  ...makeComponentProps(),
  ...makeThemeProps(),
}, 'VCommandPalette')

// Re-defining slot types for genericComponent
export const VCommandPalette = genericComponent<{
  item?: ItemSlotFunc;
  header?: HeaderSlotFunc;
  'no-results'?: NoResultsSlotFunc;
}>()({
  name: 'VCommandPalette',
  props: makeVCommandPaletteProps(),
  emits: {
    'update:modelValue': (val: boolean) => true,
    'update:list': () => true,
  },
  setup(props, { emit, slots }) {
    provideTheme(props)
    const isActive = useProxiedModel(props, 'modelValue')
    const commandCore = inject(CommandCoreSymbol)

    // Cast slots to our more specific typed interface
    const typedSlots = slots as VCommandPaletteTypedSlots;

    const searchText = ref('')
    const searchInputRef = ref<InstanceType<typeof VTextField> | null>(null)
    const listRef = ref<HTMLElement | null>(null)
    const selectedIndex = ref(0)
    const listId = useId()
    const isLoadingSubItems = ref(false)

    // Action Stack for Nested Menus
    const actionStack = shallowRef<PaletteLevel[]>([])

    const currentLevel = computed<PaletteLevel | undefined>(() => actionStack.value[actionStack.value.length - 1])
    const currentParentAction = computed(() => currentLevel.value?.parentAction)
    const currentLevelTitle = computed(() => unref(currentParentAction.value?.title) || currentLevel.value?.title || 'Commands')
    const isRootLevel = computed(() => actionStack.value.length <= 1)

    // Initialize stack when commandCore becomes available or its actions change
    watch(commandCore ? commandCore.allActions : () => [], (newGlobalActions) => {
      if (commandCore && isActive.value) {
        actionStack.value = [{
          actions: newGlobalActions.filter(action => !action.meta?.paletteHidden),
          title: 'Commands'
        }];
        searchText.value = ''
        selectedIndex.value = 0
      }
    }, { immediate: true, deep: true })

    watch(isActive, (val) => {
      if (val) {
        if (commandCore) {
          actionStack.value = [{
            actions: commandCore.allActions.value.filter(action => !action.meta?.paletteHidden),
            title: 'Commands'
          }];
        }
        searchText.value = ''
        selectedIndex.value = 0
        nextTick(() => {
          searchInputRef.value?.focus()
        })
      } else {
        searchText.value = ''
      }
    })

    const filteredActions = computed(() => {
      const actionsToFilter = currentLevel.value?.actions ?? [];
      const query = searchText.value.toLowerCase().trim();

      if (!query) return actionsToFilter;

      return actionsToFilter.filter(action => {
        const titleValue = unref(action.title);
        const titleMatch = titleValue.toLowerCase().includes(query);

        let keywordMatch = false;
        if (action.keywords) {
          if (typeof action.keywords === 'string') {
            keywordMatch = action.keywords.toLowerCase().includes(query);
          } else { // Assumes action.keywords is string[]
            keywordMatch = action.keywords.some(k => k.toLowerCase().includes(query));
          }
        }

        return titleMatch || keywordMatch;
      });
    })

    const groupedAndSortedActions = computed(() => {
      const groups: Record<string, ActionDefinition[]> = {}
      const ungrouped: ActionDefinition[] = []
      // Ensures item is ActionDefinition before accessing specific properties like .group
      const validActions = filteredActions.value.filter(action => action && typeof action === 'object' && 'id' in action && !isHeaderItem(action));

      validActions.forEach(actionDef => { // Renamed to actionDef to avoid conflict if action was in a broader scope
        const groupName = actionDef.group
        if (groupName) {
          if (!groups[groupName]) {
            groups[groupName] = []
          }
          groups[groupName].push(actionDef)
        } else {
          ungrouped.push(actionDef)
        }
      })

      const sortedGroupNames = Object.keys(groups).sort((a, b) => {
        const priorityA = defaultGroupPriorities[a] ?? UNGROUPED_PRIORITY
        const priorityB = defaultGroupPriorities[b] ?? UNGROUPED_PRIORITY
        if (priorityA !== priorityB) {
          return priorityA - priorityB
        }
        return a.localeCompare(b)
      })

      const result: ({ isHeader: true; title: string; id: string } | ActionDefinition)[] = []

      sortedGroupNames.forEach(groupName => {
        result.push({ isHeader: true, title: groupName, id: `group-header-${groupName}` })
        groups[groupName].sort((a, b) => {
          const orderA = a.order ?? Infinity
          const orderB = b.order ?? Infinity
          if (orderA !== orderB) {
            return orderA - orderB
          }
          return unref(a.title).localeCompare(unref(b.title))
        }).forEach(action => result.push(action))
      })

      if (ungrouped.length > 0) {
        if (Object.keys(groups).length > 0) { // Only add "Other Actions" header if there were other groups
          result.push({ isHeader: true, title: UNGROUPED_TITLE, id: `group-header-${UNGROUPED_TITLE}` })
        }
        ungrouped.sort((a, b) => {
          const orderA = a.order ?? Infinity
          const orderB = b.order ?? Infinity
          if (orderA !== orderB) {
            return orderA - orderB
          }
          return unref(a.title).localeCompare(unref(b.title))
        }).forEach(action => result.push(action))
      }
      return result
    })

    watch(groupedAndSortedActions, async () => {
      // Reset selected index, but try to find the first non-header item
      const firstActionIndex = groupedAndSortedActions.value.findIndex(item => item && !isHeaderItem(item));
      selectedIndex.value = firstActionIndex >=0 ? firstActionIndex : 0;

      // Emit update:list after DOM updated so tests can wait on it
      await nextTick();
      emit('update:list');
    }, { deep: true, immediate: true })

    const getItemHTMLId = (itemInput: ActionDefinition | { isHeader: true; title: string; id: string }, index: number) => {
      const item = itemInput;
      if (isHeaderItem(item)) {
        return `${listId}-header-${item.id}-${index}`;
      }
      const action = item as ActionDefinition; // Known to be ActionDefinition here
      return `${listId}-item-${action.id}-${index}`;
    }

    const activeDescendantId = computed(() => {
      if (
        isActive.value &&
        groupedAndSortedActions.value.length > 0 &&
        selectedIndex.value >= 0 &&
        selectedIndex.value < groupedAndSortedActions.value.length
      ) {
        const item = groupedAndSortedActions.value[selectedIndex.value];
        if (item && !isHeaderItem(item)) {
          return getItemHTMLId(item, selectedIndex.value);
        }
      }
      return undefined;
    })

    async function handleActionExecution(action: ActionDefinition) {
      if (!commandCore) return;
      try {
        await commandCore.executeAction(action.id, { trigger: 'command-palette' });
        if (props.closeOnExecute) {
          isActive.value = false;
        }
      } catch (err) {
        console.error(`[VCommandPalette] Failed to execute action "${action.id}":`, err);
      }
    }

    async function onActionClick(action: ActionDefinition) {
      if (action.subItems && typeof action.subItems === 'function') {
        isLoadingSubItems.value = true;
        try {
          // Call subItems, which might return a Promise or a direct array of actions.
          const rawSubActions = action.subItems();

          // Await the result if it's a Promise, otherwise use the direct value.
          // This ensures subActionsResult is always the resolved array of actions (or null/undefined if returned).
          const subActionsResult = (rawSubActions && typeof (rawSubActions as any).then === 'function')
            ? await rawSubActions
            : rawSubActions;
          const subActions = (Array.isArray(subActionsResult) ? subActionsResult : []).filter(subAct => !subAct.meta?.paletteHidden);
          actionStack.value = [...actionStack.value, {
            parentAction: action,
            actions: subActions,
          }];
          searchText.value = '';
          selectedIndex.value = 0;

          // Consolidated focus management - await single nextTick instead of nested ones
          await nextTick();
          searchInputRef.value?.focus();
        } catch (err) {
          console.error(`[VCommandPalette] Failed to load subItems for "${action.id}":`, err);
        } finally {
          isLoadingSubItems.value = false;
        }
      } else {
        // If no subItems, assume it's an executable action via CommandCore,
        // regardless of whether a specific .handler is defined on the ActionDefinition itself.
        await handleActionExecution(action);
      }
    }

    async function navigateBack() {
      if (!isRootLevel.value) {
        actionStack.value = actionStack.value.slice(0, -1);
        searchText.value = '';
        selectedIndex.value = 0;

        // Consolidated focus management - await single nextTick
        await nextTick();
        searchInputRef.value?.focus();
      }
    }

    async function scrollToSelected() {
      await nextTick();
      const currentItem = groupedAndSortedActions.value[selectedIndex.value];
      if (currentItem && !isHeaderItem(currentItem)) {
        // Get the VList's root DOM element
        const listComponent = listRef.value as any; // Instance of VCommandPaletteList
        if (listComponent && typeof listComponent.scrollToItem === 'function') {
          listComponent.scrollToItem(selectedIndex.value);
        } else {
          // Fallback or direct DOM manipulation if VCommandPaletteList doesn't expose a method yet.
          // This requires VCommandPaletteList to have a predictable root element.
          // For now, we'll leave this as a TODO to be addressed when VCommandPaletteList's API is firmed up.
          // console.warn("VCommandPaletteList does not expose scrollToItem method yet.");
        }
      }
    }

    async function handleKeydown(event: KeyboardEvent) {
      const items = groupedAndSortedActions.value
      if (!items || items.length === 0) {
        if (event.key === 'Escape') {
          if (!isRootLevel.value) {
            await navigateBack();
          } else {
            console.log('[VCommandPalette DEBUG Escape] At root. Current isActive.value:', isActive.value, 'props.modelValue:', props.modelValue);
            console.log('[VCommandPalette DEBUG Escape] Setting isActive.value = false. Current isRootLevel:', isRootLevel.value);
            isActive.value = false;
          }
        }
        return;
      }

      let newIndex = selectedIndex.value;
      const BATCH_SIZE = 5; // For PageUp/PageDown

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        do {
          newIndex = (newIndex + 1);
          if (newIndex >= items.length) newIndex = 0;
        } while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex !== selectedIndex.value);
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        do {
          newIndex = (newIndex - 1 + items.length);
           newIndex %= items.length;
        } while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex !== selectedIndex.value);
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'PageDown') {
        event.preventDefault();
        for (let i = 0; i < BATCH_SIZE; i++) {
          let tempIndex = newIndex;
          do {
            tempIndex = (tempIndex + 1);
            if (tempIndex >= items.length) tempIndex = items.length -1;
          } while (items.length > 1 && isHeaderItem(items[tempIndex]) && tempIndex !== newIndex && tempIndex < items.length -1);
          if (tempIndex === newIndex && i > 0) break;
          newIndex = tempIndex;
          if (newIndex >= items.length -1) break; // Reached end
        }
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'PageUp') {
        event.preventDefault();
        for (let i = 0; i < BATCH_SIZE; i++) {
          let tempIndex = newIndex;
          do {
            tempIndex = (tempIndex - 1 + items.length);
            tempIndex %= items.length;
          } while (items.length > 1 && isHeaderItem(items[tempIndex]) && tempIndex !== newIndex && tempIndex > 0);
           if (tempIndex === newIndex && i > 0) break;
          newIndex = tempIndex;
          if (newIndex <= 0) break; // Reached start
        }
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'Home') {
        event.preventDefault();
        newIndex = 0;
        while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex < items.length -1) {
          newIndex++;
        }
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'End') {
        event.preventDefault();
        newIndex = items.length - 1;
        while (items.length > 1 && isHeaderItem(items[newIndex]) && newIndex > 0) {
          newIndex--;
        }
        selectedIndex.value = newIndex;
        await scrollToSelected();
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const currentItem = items[selectedIndex.value]
        if (currentItem && !isHeaderItem(currentItem)) {
          await onActionClick(currentItem as ActionDefinition);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        if (!isRootLevel.value) {
          await navigateBack();
        } else {
          console.log('[VCommandPalette DEBUG Escape] At root. Current isActive.value:', isActive.value, 'props.modelValue:', props.modelValue);
          console.log('[VCommandPalette DEBUG Escape] Setting isActive.value = false. Current isRootLevel:', isRootLevel.value);
          isActive.value = false;
        }
      } else {
        if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete') {
        }
      }
    }

    // Fix the focus management in isActive watcher around line 393
    watch(isActive, async (val) => {
      if (val) {
        // One await instead of nested ticks
        await nextTick();
        searchInputRef.value?.focus();
      }
    });

    useRender(() => (
      <VDialog
        v-model={isActive.value}
        width={props.width}
        scrollable
        class="v-command-palette-dialog"
        contentClass="v-command-palette-dialog__content"
        scrim="#000000"
      >
        <div
          class="v-command-palette"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette Dialog"
          onKeydown={handleKeydown}
        >
          {/*
            Slot: header
            Scope: {
              parentAction?: ActionDefinition, // Parent action if in a sub-menu
              navigateBack: () => void,      // Function to navigate to the previous level
              title: string                   // Current level's title
            }
          */}
          {typedSlots.header ? typedSlots.header({ parentAction: currentParentAction.value, navigateBack, title: currentLevelTitle.value }) : (
            <div class="v-command-palette__header">
              {!isRootLevel.value && (
                <VBtn icon="$arrowLeft" onClick={navigateBack} density="compact" variant="text" aria-label="Go back" />
              )}
              <span class="v-command-palette__title" id={`${listId}-title`}>{currentLevelTitle.value}</span>
            </div>
          )}
          <VTextField
            ref={searchInputRef}
            v-model={searchText.value}
            placeholder={props.placeholder}
            prependInnerIcon="$search"
            hideDetails
            density="compact"
            autofocus
            class="v-command-palette__search"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isActive.value && groupedAndSortedActions.value.length > 0}
            aria-controls={listId}
            aria-activedescendant={activeDescendantId.value}
            aria-labelledby={`${listId}-title`}
          />
          {isLoadingSubItems.value && (
            <VProgressLinear indeterminate color="primary" class="v-command-palette__loader" />
          )}
          {!isLoadingSubItems.value && (
            <VCommandPaletteList
              ref={listRef}
              actions={groupedAndSortedActions.value}
              selectedIndex={selectedIndex.value}
              listId={listId}
              searchText={searchText.value}
              onActionClick={onActionClick}
              v-slots={(
                {
                  item: typedSlots.item,
                  'no-results': typedSlots['no-results'],
                } as any
              )}
            />
          )}
        </div>
      </VDialog>
    ))
    /**
     * @slot header - Customize the header of the command palette.
     *  @binding {ActionDefinition | undefined} parentAction - The parent action if in a sub-menu.
     *  @binding {() => void} navigateBack - Function to navigate to the previous level.
     *  @binding {string} title - The current level's title.
     *
     * @slot item - Customize the rendering of each action item.
     *  @binding {ActionDefinition} action - The action object.
     *  @binding {number} index - Index in the filtered and sorted list.
     *  @binding {boolean} isSelected - True if the item is currently selected by keyboard navigation.
     *  @binding {() => void} select - Function to execute or navigate into the action.
     *
     * @slot no-results - Content to display when no actions match the search query.
     *  @binding {string | undefined} searchText - The current search text (from VCommandPaletteList's scope).
     */
    return {}
  }
})

export type VCommandPalette = InstanceType<typeof VCommandPalette>
