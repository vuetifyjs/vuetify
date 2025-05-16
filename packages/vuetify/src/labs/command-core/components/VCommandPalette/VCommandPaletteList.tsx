import { VList, VListItem, VListSubheader } from '@/components/VList';
import { VIcon } from '@/components/VIcon';
import { VHotKey } from '../VHotKey/VHotKey';
import { type ActionDefinition, type ActionContext } from '@/labs/command-core';
import { genericComponent, propsFactory, useRender } from '@/util';
import { computed, unref, type PropType, type VNode } from 'vue';

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
  onActionClick: Function as PropType<(action: ActionDefinition<ActionContext>) => void>,
}, 'VCommandPaletteList');

// Use the defined scope types in genericComponent
export const VCommandPaletteList = genericComponent<{
  item?: (scope: VCommandPaletteListItemScope) => VNode[];
  'no-results'?: (scope: VCommandPaletteListNoResultsScope) => VNode[];
}>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  emits: {},
  setup(props, { slots }: { slots: {
    item?: (scope: VCommandPaletteListItemScope) => VNode[];
    'no-results'?: (scope: VCommandPaletteListNoResultsScope) => VNode[];
  }}) {
    const getItemHtmlId = (itemInput: ActionDefinition<ActionContext> | { isHeader: true; title: string; id: string }, index: number) => {
      const item = itemInput;
      if (isHeaderItem(item)) {
        return `${props.listId}-header-${item.id}-${index}`;
      }
      const action = item as ActionDefinition<ActionContext>;
      return `${props.listId}-item-${action.id}-${index}`;
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
          {props.actions.length === 0 && (
            slots['no-results']
              ? slots['no-results'](scopeNoResults)
              : <VListItem
                  disabled
                  title={props.searchText ? 'No results found.' : 'Type to search...'}
                  id={`${props.listId}-no-results`}
                  role="option"
                  class="v-command-palette__no-results"
                />
          )}
          {props.actions.map((item, index) => {
            if (isHeaderItem(item)) {
              return <VListSubheader key={item.id} class="v-command-palette__subheader">{item.title}</VListSubheader>;
            }
            const action = item as ActionDefinition<ActionContext>;
            const itemHtmlId = getItemHtmlId(action, index);
            const isSelected = index === props.selectedIndex;

            const handleSelect = () => {
              if (props.onActionClick) {
                props.onActionClick(action);
              }
            };

            const scopeItem: VCommandPaletteListItemScope = { action, index, itemHtmlId, isSelected, select: handleSelect };

            if (slots.item) {
              return slots.item(scopeItem);
            }

            return (
              <VListItem
                key={action.id}
                id={itemHtmlId}
                role="option"
                aria-selected={isSelected}
                title={unref(action.title)}
                subtitle={unref(action.subtitle) ?? undefined}
                active={isSelected}
                onClick={handleSelect}
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
            );
          })}
        </VList>
      );
    });
    return {};
  }
});

export type VCommandPaletteList = InstanceType<typeof VCommandPaletteList>;
