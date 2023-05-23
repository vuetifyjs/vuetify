// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { inject, onUpdated, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import { VirtualSymbol } from '@/composables/virtual'

export const makeVVirtualScrollItemProps = propsFactory({
  id: {
    type: [String, Number],
    required: true,
  },
  dynamicHeight: Boolean,
  renderless: Boolean,

  ...makeComponentProps(),
}, 'VVirtualScrollItem')

export const VVirtualScrollItem = genericComponent<{ default: { props: Record<string, any> } | void }>()({
  name: 'VVirtualScrollItem',

  props: makeVVirtualScrollItemProps(),

  emits: {
    'update:height': (height: number) => true,
  },

  setup (props, { emit, slots }) {
    const { handleItemResize } = inject(VirtualSymbol) ?? {}
    const { resizeRef, contentRect } = useResizeObserver()

    useToggleScope(() => props.dynamicHeight, () => {
      watch(() => contentRect.value?.height, height => {
        if (height != null) handleItemResize?.(props.id, height)
      })
    })

    function updateHeight () {
      if (props.dynamicHeight && contentRect.value) {
        handleItemResize?.(props.id, contentRect.value.height)
      }
    }

    onUpdated(updateHeight)

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ props: { ref: props.dynamicHeight ? resizeRef : undefined, key: props.id } }) }
      </>
    ) : (
      <div
        ref={ props.dynamicHeight ? resizeRef : undefined }
        class={[
          'v-virtual-scroll__item',
          props.class,
        ]}
        style={ props.style }
      >
        { slots.default?.() }
      </div>
    ))
  },
})
