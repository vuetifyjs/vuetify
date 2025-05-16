import { VListItem } from '@/components/VList'
import { VIcon } from '@/components/VIcon'
import { VHotKey } from '../VHotKey/VHotKey' // Assuming VHotKey is in a relative path
import { type ActionDefinition, type ActionContext } from '@/labs/command-core' // Assuming types are here
import { genericComponent, propsFactory, useRender } from '@/util'
import { unref, type PropType, type VNode, type VNodeChild, Fragment } from 'vue'

// Props for VCommandPaletteItem
export const makeVCommandPaletteItemProps = propsFactory({
  action: {
    type: Object as PropType<ActionDefinition<ActionContext>>,
    required: true,
  },
  htmlId: { // Renamed from 'id' to avoid conflict with Vue's 'id' or action.id
    type: String,
    required: true,
  },
  isSelected: Boolean,
  role: String,
  ariaSelected: Boolean, // VListItem uses 'active' for visual, aria-selected for ARIA
}, 'VCommandPaletteItem')

// Scope for slots
export interface VCommandPaletteItemSlotScope {
  action: ActionDefinition<ActionContext>;
  isSelected: boolean;
}

// Slots definition for VCommandPaletteItem
export type VCommandPaletteItemSlots = {
  prepend?: (scope: VCommandPaletteItemSlotScope) => VNodeChild;
  append?: (scope: VCommandPaletteItemSlotScope) => VNodeChild;
  title?: (scope: VCommandPaletteItemSlotScope) => VNodeChild;
  subtitle?: (scope: VCommandPaletteItemSlotScope) => VNodeChild;
};

export const VCommandPaletteItem = genericComponent<VCommandPaletteItemSlots>()({
  name: 'VCommandPaletteItem',
  props: makeVCommandPaletteItemProps(),
  emits: {
    click: (action: ActionDefinition<ActionContext>) => true,
  },
  setup(props, { emit, slots }) {
    const onClick = () => {
      emit('click', props.action)
    }

    useRender(() => {
      const scope: VCommandPaletteItemSlotScope = {
        action: props.action,
        isSelected: props.isSelected,
      }

      // Cast slot functions to any to bypass type inference issues with genericComponent
      const titleSlotFn = slots.title as any;
      const subtitleSlotFn = slots.subtitle as any;
      const prependSlotFn = slots.prepend as any;
      const appendSlotFn = slots.append as any;

      const titleContent = titleSlotFn ? titleSlotFn(scope) : unref(props.action.title);
      const subtitleContent = subtitleSlotFn ? subtitleSlotFn(scope) : unref(props.action.subtitle);

      const prependContent = prependSlotFn ? (
        prependSlotFn(scope)
      ) : props.action.icon ? (
        <VIcon icon={unref(props.action.icon)} />
      ) : undefined;

      const appendContent = appendSlotFn ? (
        appendSlotFn(scope)
      ) : props.action.hotkey ? (
        <VHotKey hotkey={Array.isArray(props.action.hotkey) ? props.action.hotkey[0] : props.action.hotkey} dense />
      ) : undefined;

      const normalizeSlot = (content: VNodeChild | undefined): VNode[] | null => {
        if (content == null) return null;
        if (Array.isArray(content)) return content.length > 0 ? content : null;
        return [content as VNode];
      };

      // VListItem slots expect functions that return VNodeChild (which can be VNode, VNode[], string, null, undefined)
      // Let's ensure our () => normalizeSlot(...) returns VNodeChild and handles null/undefined from normalizeSlot gracefully.
      const createSlotRenderer = (content: VNodeChild | undefined) => {
        const normalized = normalizeSlot(content);
        return normalized ? () => normalized : undefined;
      };

      const defaultSlotTitle = typeof titleContent !== 'string' ? normalizeSlot(titleContent) : null;
      const defaultSlotSubtitle = typeof subtitleContent !== 'string' ? normalizeSlot(subtitleContent) : null;

      return (
        <VListItem
          key={props.action.id}
          id={props.htmlId}
          role={props.role || 'option'}
          aria-selected={props.ariaSelected ?? props.isSelected}
          active={props.isSelected}
          onClick={onClick}
          class={{ 'v-command-palette__item--selected': props.isSelected }}
          value={props.action.id}
          title={typeof titleContent === 'string' ? titleContent : undefined}
          subtitle={typeof subtitleContent === 'string' ? subtitleContent : undefined}
        >
          {{
            prepend: createSlotRenderer(prependContent),
            append: createSlotRenderer(appendContent),
            default: () => (
              <>
                {defaultSlotTitle}
                {defaultSlotSubtitle && <div class="v-list-item-subtitle">{defaultSlotSubtitle}</div>}
              </>
            )
          }}
        </VListItem>
      ) as VNode
    })

    return {}
  },
})

export type VCommandPaletteItem = InstanceType<typeof VCommandPaletteItem>;
