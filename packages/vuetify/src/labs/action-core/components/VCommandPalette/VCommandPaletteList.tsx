import { VList, VListItem, VListSubheader } from '@/components/VList';
import { VIcon } from '@/components/VIcon';
import { VHotKey } from '../VHotKey/VHotKey';
import { type ActionDefinition, type ActionContext } from '@/labs/action-core';
import { genericComponent, propsFactory, useRender } from '@/util';
import { unref, type PropType, type VNode } from 'vue';

// Helper to distinguish header items from actions
function isHeaderItem(item: any): item is { isHeader: true; title: string; id: string } {
  return item && typeof item === 'object' && 'isHeader' in item && item.isHeader === true;
}

// Define scope types explicitly for clarity and reuse
export interface VCommandPaletteListItemScope {
  action: ActionDefinition<ActionContext>;
  index: number;
  itemHtmlId: string;
  isSelected: boolean;
  select: () => void;
}

export interface VCommandPaletteListNoResultsScope {
  searchText: string | undefined;
}

export interface VCommandPaletteListSubheaderScope {
  title: string;
  id: string;
}

export const makeVCommandPaletteListProps = propsFactory({
  actions: {
    type: Array as PropType<Readonly<({ isHeader: true; title: string; id: string } | ActionDefinition<ActionContext>)[]>>,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
  listId: {
    type: String,
    required: true,
  },
  searchText: String,
}, 'VCommandPaletteList');

// Use the defined scope types in genericComponent
export const VCommandPaletteList = genericComponent<{
  item?: (scope: VCommandPaletteListItemScope) => VNode[];
  'no-results'?: (scope: VCommandPaletteListNoResultsScope) => VNode[];
  subheader?: (scope: VCommandPaletteListSubheaderScope) => VNode[];
}>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  emits: {
    actionClick: (action: ActionDefinition<ActionContext>) => true,
    itemNavigate: (action: ActionDefinition<ActionContext>) => true,
  },
  setup(props, { slots, emit }) {
    const typedSlots = slots as {
      item?: (scope: VCommandPaletteListItemScope) => VNode[];
      'no-results'?: (scope: VCommandPaletteListNoResultsScope) => VNode[];
      subheader?: (scope: VCommandPaletteListSubheaderScope) => VNode[];
    };

    const getItemHtmlId = (itemInput: ActionDefinition<ActionContext> | { isHeader: true; title: string; id: string }, index: number) => {
      const item = itemInput;
      if (isHeaderItem(item)) {
        return `${props.listId}-header-${item.id}-${index}`;
      }
      const action = item as ActionDefinition<ActionContext>;
      return `${props.listId}-item-${action.id}-${index}`;
    };

    const handleActionClick = (action: ActionDefinition<ActionContext>) => {
      if (action.subItems && typeof action.subItems === 'function') {
        emit('itemNavigate', action);
      } else {
        emit('actionClick', action);
      }
    };

    // Helper function to safely render slots with proper fallbacks
    const renderSlotWithFallback = (
      slotFn: ((scope: any) => VNode[] | VNode | string | undefined) | undefined,
      scope: any,
      fallbackFn: () => VNode | VNode[]
    ): VNode | VNode[] => {
      if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line no-console
        console.debug('[VCommandPaletteList] renderSlotWithFallback invoked', { slotProvided: !!slotFn, scope });
      }
      if (!slotFn) return fallbackFn();

      try {
        const slotResult = slotFn(scope);

        if (slotResult == null) return fallbackFn();

        // If the slot returns an HTML string, wrap it in a VNode that uses v-html for rendering.
        // This is a common pattern for allowing slots to return raw HTML strings.
        if (typeof slotResult === 'string') {
          if (slotResult.trim().length === 0) return fallbackFn(); // Empty string, use fallback
          // For test debugging, let's see what we're trying to render
          if (process.env.NODE_ENV === 'test') {
            // eslint-disable-next-line no-console
            console.debug('[VCommandPaletteList] Rendering string slot content:', slotResult.slice(0, 100));
          }
          // Ensure the string is actual HTML markup before using v-html
          return slotResult.trim().startsWith('<')
            ? <div v-html={slotResult} /> // Using <div> as a generic wrapper for string HTML
            : <>{slotResult}</>; // Treat as text node if not starting with '<'
        }

        // If it's an array, ensure it's not empty.
        if (Array.isArray(slotResult)) {
          return slotResult.length > 0 ? slotResult : fallbackFn();
        }

        // Otherwise, assume it's a single VNode or a component that will render.
        return slotResult;
      } catch (err) {
        console.error('[VCommandPaletteList] Error rendering slot:', err);
        return fallbackFn();
      }
    };

    useRender(() => {
      const scopeNoResults: VCommandPaletteListNoResultsScope = { searchText: props.searchText };

      return (
        <VList
          id={props.listId}
          role="listbox"
          aria-labelledby={`${props.listId}-title`}
          class="v-command-palette__list"
          lines="one"
        >
          {props.actions.length === 0 ? (
            renderSlotWithFallback(
              typedSlots['no-results'],
              scopeNoResults,
              () => (
                <VListItem
                  disabled
                  title={props.searchText ? 'No results found.' : 'Type to search...'}
                  id={`${props.listId}-no-results`}
                  role="option"
                  class="v-command-palette__no-results"
                />
              )
            )
          ) : (
            <>
              {props.actions.map((item, index) => {
                if (isHeaderItem(item)) {
                  return renderSlotWithFallback(
                    typedSlots.subheader,
                    { title: item.title, id: item.id },
                    () => <VListSubheader key={item.id} class="v-command-palette__subheader">{item.title}</VListSubheader>
                  );
                }

                const action = item as ActionDefinition<ActionContext>;
                const itemHtmlId = getItemHtmlId(action, index);
                const isSelected = index === props.selectedIndex;

                const select = () => handleActionClick(action);
                const scopeItem: VCommandPaletteListItemScope = {
                  action,
                  index,
                  itemHtmlId,
                  isSelected,
                  select
                };

                return renderSlotWithFallback(
                  typedSlots.item,
                  scopeItem,
                  () => (
                    <VListItem
                      key={action.id}
                      id={itemHtmlId}
                      role="option"
                      aria-selected={isSelected}
                      title={unref(action.title)}
                      subtitle={unref(action.subtitle) ?? undefined}
                      active={isSelected}
                      onClick={select}
                      class={{ 'v-command-palette__item--selected': isSelected }}
                      value={action.id}
                    >
                      {{
                        prepend: () => action.icon ? <VIcon icon={unref(action.icon)} /> : undefined,
                        append: () => {
                          const displayHotkey = Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey;
                          return displayHotkey ? <VHotKey hotkey={displayHotkey} dense /> : null;
                        },
                      }}
                    </VListItem>
                  )
                );
              })}
            </>
          )}
        </VList>
      );
    });

    const scrollToItem = (index: number) => {
      if (index < 0 || index >= props.actions.length) return;

      try {
        const item = props.actions[index];
        if (!item) return;

        const element = document.getElementById(getItemHtmlId(item, index));
        if (element && typeof element.scrollIntoView === 'function') {
          element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      } catch (err) {
        console.debug(`[VCommandPaletteList] scrollToItem: ${err}`);
      }
    };

    return {
      scrollToItem
    };
  }
});

export type VCommandPaletteList = InstanceType<typeof VCommandPaletteList>;
