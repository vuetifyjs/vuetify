// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'

export const makeVToolbarTitleProps = propsFactory({
  text: String,

  ...makeTagProps(),
}, 'v-toolbar-title')

export type VToolbarTitleSlots = MakeSlots<{
  default: []
  text: []
}>

export const VToolbarTitle = genericComponent<VToolbarTitleSlots>()({
  name: 'VToolbarTitle',

  props: makeVToolbarTitleProps(),

  setup (props, { slots }) {
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text)

      return (
        <props.tag class="v-toolbar-title">
          { hasText && (
            <div class="v-toolbar-title__placeholder">
              { slots.text ? slots.text() : props.text }

              { slots.default?.() }
            </div>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VToolbarTitle = InstanceType<typeof VToolbarTitle>
