// Styles
import './NAME.sass'

// Components

// Composables

// Utilities
import { defineComponent, useRender } from '@/util'

// Types

export const NAME = defineComponent({
  name: 'NAME',

  props: {},

  emits: {},

  setup () {
    useRender(() => (
      <div class="NAME"></div>
    ))
  }
})

export type NAME = InstanceType<typeof NAME>
