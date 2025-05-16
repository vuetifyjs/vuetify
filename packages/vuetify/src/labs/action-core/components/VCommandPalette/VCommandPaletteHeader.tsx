import { VBtn } from '@/components/VBtn'
import { genericComponent, propsFactory, useRender } from '@/util'
import { Fragment, type VNode, type VNodeChild } from 'vue'

export interface VCommandPaletteHeaderProps {
  title?: string
  isRootLevel: boolean
  loading?: boolean
  listId?: string
}

export const makeVCommandPaletteHeaderProps = propsFactory({
  title: String,
  isRootLevel: Boolean,
  loading: Boolean,
  listId: String,
}, 'VCommandPaletteHeader')

export const VCommandPaletteHeader = genericComponent<{
  default?: (props: VCommandPaletteHeaderProps & { navigateBack: () => void }) => VNodeChild
  prepend?: (props: VCommandPaletteHeaderProps) => VNodeChild
  append?: (props: VCommandPaletteHeaderProps) => VNodeChild
}>()({
  name: 'VCommandPaletteHeader',
  props: makeVCommandPaletteHeaderProps(),
  emits: {
    navigateBack: () => true,
  },
  setup (props, { emit, slots }) {
    const navigateBack = () => emit('navigateBack')

    useRender(() => {
      const defaultSlotRender = slots.default as ((props: VCommandPaletteHeaderProps & { navigateBack: () => void }) => VNodeChild) | undefined;
      const prependSlotRender = slots.prepend as ((props: VCommandPaletteHeaderProps) => VNodeChild) | undefined;
      const appendSlotRender = slots.append as ((props: VCommandPaletteHeaderProps) => VNodeChild) | undefined;

      if (defaultSlotRender) {
        const slotResult = defaultSlotRender({ ...props, navigateBack });
        if (slotResult == null) return <Fragment />;
        return (Array.isArray(slotResult) ? <>{slotResult}</> : slotResult) as VNode;
      }

      const titleId = props.listId ? `${props.listId}-title` : 'v-command-palette-title';

      return (
        <div class="v-command-palette__header">
          { prependSlotRender?.(props) }
          { !props.isRootLevel && (
            <VBtn
              icon="$arrowLeft"
              onClick={navigateBack}
              density="compact"
              variant="text"
              aria-label="Go back"
            />
          )}
          <span class="v-command-palette__title" id={titleId}>
            { props.title ?? 'Commands' }
          </span>
          { appendSlotRender?.(props) }
        </div>
      ) as VNode
    })

    return {}
  },
})

export type VCommandPaletteHeader = InstanceType<typeof VCommandPaletteHeader>
