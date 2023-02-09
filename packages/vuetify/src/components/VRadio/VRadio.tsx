// Components
import { makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import type { SlotsToProps } from '@/util'
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'

export const VRadio = genericComponent<new () => {
  $props: SlotsToProps<VSelectionControlSlots>
}>()({
  name: 'VRadio',

  props: {
    ...makeSelectionControlProps({
      falseIcon: '$radioOff',
      trueIcon: '$radioOn',
    }),
  },

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControl
        { ...props }
        class="v-radio"
        type="radio"
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VRadio = InstanceType<typeof VRadio>
