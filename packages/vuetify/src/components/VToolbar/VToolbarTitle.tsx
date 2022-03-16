// Composables
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'

export const VToolbarTitle = genericComponent<new () => {
  $slots: MakeSlots<{
    default: []
    text: []
  }>
}>()({
  name: 'VToolbarTitle',

  props: {
    text: String,

    ...makeTagProps(),
  },

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
          ) }
        </props.tag>
      )
    })

    return {}
  },
})

export type VToolbarTitle = InstanceType<typeof VToolbarTitle>
