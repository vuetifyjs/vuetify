// Composables
import { useResizeObserver } from '@vuetify/v0'
import { makeComponentProps } from '@/composables/component'

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
    const height = shallowRef(0)
    useResizeObserver(el, entries => {
      height.value = entries[0]?.contentRect.height ?? 0
    }, { box: 'border-box' })

    watch(height, val => {
      emit('update:height', val)
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
