// Components
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVStepperWindowItemProps = propsFactory({
  ...makeVWindowItemProps(),
}, 'VStepperWindowItem')

export const VStepperWindowItem = genericComponent()({
  name: 'VStepperWindowItem',

  props: makeVStepperWindowItemProps(),

  setup (props, { slots }) {
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props)

      return (
        <VWindowItem
          _as="VStepperWindowItem"
          { ...windowItemProps }
          class={[
            'v-stepper-window-item',
            props.class,
          ]}
          style={ props.style }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VStepperWindowItem = InstanceType<typeof VStepperWindowItem>
