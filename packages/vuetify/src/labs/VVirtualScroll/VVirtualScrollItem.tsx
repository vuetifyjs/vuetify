// Composables
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { genericComponent, useRender } from '@/util'
import { onUpdated, watch } from 'vue'

export const VVirtualScrollItem = genericComponent()({
  name: 'VVirtualScrollItem',

  props: {
    dynamicHeight: Boolean,
  },

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

    useRender(() => (
      <div
        ref={ props.dynamicHeight ? resizeRef : undefined }
        class="v-virtual-scroll__item"
      >
        { slots.default?.() }
      </div>
    ))
  },
})
