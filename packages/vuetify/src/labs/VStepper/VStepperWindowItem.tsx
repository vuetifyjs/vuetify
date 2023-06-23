// Components
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VImgSlots } from '@/components/VImg/VImg'

export const makeVStepperWindowItemProps = propsFactory({
  ...makeVWindowItemProps(),
}, 'VStepperWindowItem')

export const VStepperWindowItem = genericComponent<VImgSlots>()({
  name: 'VStepperWindowItem',

  props: makeVStepperWindowItemProps(),

  setup (props, { slots }) {
    useRender(() => {
      const [windowItemProps] = VWindowItem.filterProps(props)

      return (
        <VWindowItem
          { ...windowItemProps }
          class="v-carousel-item"
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VStepperWindowItem = InstanceType<typeof VStepperWindowItem>
