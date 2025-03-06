// Styles
import './NAME.sass'

// Components

// Composables

// Utilities
import { genericComponent, useRender } from '@/util'

export type ComponentSlots = {
  default: never
}

export const NAME = genericComponent<ComponentSlots>()({
  name: 'NAME',

  props: {},

  emits: {},

  setup () {
    useRender(() => (
      <div class="NAME"></div>
    ))
  },
})

export type NAME = InstanceType<typeof NAME>
