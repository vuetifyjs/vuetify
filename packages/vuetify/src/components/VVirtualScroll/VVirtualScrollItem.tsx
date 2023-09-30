// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { ref, watch, watchEffect } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { GenericProps } from '@/util'

export const makeVVirtualScrollItemProps = propsFactory({
  renderless: Boolean,
  disableItemResize: Boolean,

  ...makeComponentProps(),
}, 'VVirtualScrollItem')

export const VVirtualScrollItem = genericComponent<new <Renderless extends boolean = false>(
  props: {
    renderless?: Renderless
    disableItemResize?: boolean
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
    const itemRef = ref()

    useToggleScope(() => !props.disableItemResize, () => {
      const { resizeRef, contentRect } = useResizeObserver(undefined, 'border')

      watchEffect(() => {
        resizeRef.value = itemRef.value
      })

      watch(() => contentRect.value?.height, height => {
        if (height != null) emit('update:height', height)
      })
    })

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ itemRef }) }
      </>
    ) : (
      <div
        ref={ itemRef }
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
