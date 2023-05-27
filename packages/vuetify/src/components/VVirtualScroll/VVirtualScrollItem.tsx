// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { onUpdated, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVVirtualScrollItemProps = propsFactory({
  dynamicHeight: Boolean,
  renderless: Boolean,

  ...makeComponentProps(),
}, 'v-virtual-scroll-item')

export const VVirtualScrollItem = genericComponent<{ default: { props: Record<string, any> } | void }>()({
  name: 'VVirtualScrollItem',

  props: makeVVirtualScrollItemProps(),

  emits: {
    'update:height': (height: number) => true,
  },

  setup (props, { emit, slots }) {
    const { resizeRef, contentRect } = useResizeObserver()

    useToggleScope(() => props.dynamicHeight, () => {
      watch(() => contentRect.value?.height, height => {
        if (height != null) emit('update:height', height)
      })
    })

    function updateHeight () {
      if (props.dynamicHeight && contentRect.value) {
        emit('update:height', contentRect.value.height)
      }
    }

    onUpdated(updateHeight)

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ props: { ref: props.dynamicHeight ? resizeRef : undefined } }) }
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
