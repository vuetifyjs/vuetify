import { useResizeObserver } from '@/composables/resizeObserver'
import { useRender } from '@/util'
import { defineComponent } from 'vue'

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
