// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { GenericProps } from '@/util'

export const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,

  ...makeComponentProps(),
}, 'VVirtualScrollItem')

export const VVirtualScrollItem = genericComponent<new <Renderless extends boolean = false>(
  props: {
    renderless?: Renderless
  },
  slots: {
    default: Renderless extends true ? {
      itemRef: Ref<HTMLElement | undefined>
    } : never
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VVirtualScrollItem',

  inheritAttrs: false,

  props: makeVVirtualScrollItemProps(),

  emits: {
    'update:height': (height: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { resizeRef, contentRect } = useResizeObserver(undefined, 'border')

    watch(() => contentRect.value?.height, height => {
      if (height != null) emit('update:height', height)
    })

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ itemRef: resizeRef }) }
      </>
    ) : (
      <div
        ref={ resizeRef }
        class={[
          'v-virtual-scroll__item',
          props.class,
        ]}
        style={ props.style }
        { ...attrs }
      >
        { (slots.default as any)?.() }
      </div>
    ))
  },
})
