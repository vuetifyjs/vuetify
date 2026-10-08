// Composables
import { makeComponentProps } from '@/composables/component'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { shallowRef, watch } from 'vue'
import { genericComponent, propsFactory, templateRef, useRender } from '@/util'

// Types
import type { GenericProps, TemplateRef } from '@/util'

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
      itemRef: TemplateRef
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
    const el = templateRef()
    const itemHeight = shallowRef<number>()
    // keep borderBoxSize to ignore CSS transforms (e.g. VDialogTransition scale-in)
    useResizeObserver(() => el.el, entries => {
      itemHeight.value = entries[0].borderBoxSize?.[0]?.blockSize ?? (entries[0].target as HTMLElement).offsetHeight
    }, { box: 'border-box' })

    watch(itemHeight, height => {
      if (height != null) emit('update:height', height)
    })

    useRender(() => props.renderless ? (
      <>
        { slots.default?.({ itemRef: el }) }
      </>
    ) : (
      <div
        ref={ el }
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
