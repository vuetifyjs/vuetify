// Composables
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { defineComponent } from '@/util/defineComponent'
import { useRender } from '@/util'
import { onMounted } from 'vue'

export const VVirtualScrollItem = defineComponent({
  name: 'VVirtualScrollItem',

  props: {
    dynamicHeight: Boolean,
  },

  emits: {
    'update:height': (height: number) => true,
  },

  setup (props, { emit, slots }) {
    const { resizeRef } = useResizeObserver(entries => {
      if (!entries.length) return

      const contentRect = entries[0].contentRect
      emit('update:height', contentRect.height)
    })

    onMounted(() => {
      if (props.dynamicHeight && resizeRef.value) {
        emit('update:height', resizeRef.value.clientHeight)
      }
    })

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
