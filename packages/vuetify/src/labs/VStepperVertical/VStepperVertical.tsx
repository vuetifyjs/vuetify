// Components
import { VStepperVerticalItem } from './VStepperVerticalItem'
import { makeVExpansionPanelsProps, VExpansionPanels } from '@/components/VExpansionPanel/VExpansionPanels'
import { makeStepperProps } from '@/components/VStepper/VStepper'

// Composables
import { provideDefaults } from '@/composables/defaults'

// Utilities
import { computed, ref, toRefs } from 'vue'
import { genericComponent, getPropertyFromItem, propsFactory, useRender } from '@/util'

// Types
import type { VStepperSlot } from '@/components/VStepper/VStepper'
import type { StepperItem, StepperItemSlot } from '@/components/VStepper/VStepperItem'

export type VStepperVerticalSlots = {
  actions: VStepperSlot
  default: VStepperSlot
  icon: StepperItemSlot
  title: StepperItemSlot
  subtitle: StepperItemSlot
  item: StepperItem
  prev: never
  next: never
} & {
  [key: `header-item.${string}`]: StepperItemSlot
  [key: `item.${string}`]: StepperItem
}

export const makeVStepperVerticalProps = propsFactory({
  prevText: {
    type: String,
    default: '$vuetify.stepper.prev',
  },
  nextText: {
    type: String,
    default: '$vuetify.stepper.next',
  },

  ...makeStepperProps(),
  ...makeVExpansionPanelsProps({
    mandatory: 'force' as const,
    static: true,
    variant: 'accordion' as const,
  }),
}, 'VStepperVertical')

export const VStepperVertical = genericComponent<VStepperVerticalSlots>()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  setup (props, { slots }) {
    const vExpansionPanelsRef = ref<typeof VExpansionPanels>()
    const { color, editable, prevText, nextText } = toRefs(props)

    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item)
      const value = getPropertyFromItem(item, props.itemValue, index + 1)

      return {
        title,
        value,
        raw: item,
      }
    }))

    provideDefaults({
      VStepperVerticalItem: {
        color,
        editable,
        prevText,
        nextText,
      },
    })

    useRender(() => {
      return (
        <VExpansionPanels
          ref={ vExpansionPanelsRef }
          { ...props }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              'v-stepper--mobile': props.mobile,
            },
            props.class,
          ]}
          style={ props.style }
        >
          {{
            ...slots,
            default: ({
              prev,
              next,
            }) => {
              return (
                <>
                  { items.value.map(item => (
                    <VStepperVerticalItem { ...item }>
                      {{
                        default: slots[`item.${item.value}`],
                        icon: slots.icon,
                        title: slots.title,
                        subtitle: slots.subtitle,
                      }}
                    </VStepperVerticalItem>
                  ))}

                  { slots.default?.({ prev, next }) }
                </>
              )
            },
          }}
        </VExpansionPanels>
      )
    })

    return {}
  },
})

export type VStepperVertical = InstanceType<typeof VStepperVertical>
