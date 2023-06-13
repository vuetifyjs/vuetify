// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { onUpdated, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'
import { useVirtualItem } from '@/composables/virtual'

export const makeVVirtualScrollItemProps = propsFactory({
  virtualKey: {
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

  setup (props, { emit, slots }) {
    const { handleItemResize } = useVirtualItem()
    const { resizeRef, contentRect } = useResizeObserver()

    useToggleScope(() => props.dynamicHeight, () => {
      watch(() => contentRect.value?.height, height => {
        if (height != null) handleItemResize(props.virtualKey, height)
      })
    })

    function updateHeight () {
      if (props.dynamicHeight && contentRect.value) {
        handleItemResize(props.virtualKey, contentRect.value.height)
      }
    }

    onUpdated(updateHeight)

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ props: { ref: props.dynamicHeight ? resizeRef : undefined, key: props.virtualKey } }) }
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
