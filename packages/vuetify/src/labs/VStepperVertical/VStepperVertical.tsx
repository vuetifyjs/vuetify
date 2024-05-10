// Components
import { VStepperVerticalItem } from './VStepperVerticalItem'
import { makeVExpansionPanelsProps, VExpansionPanels } from '@/components/VExpansionPanel/VExpansionPanels'
import { makeStepperProps } from '@/components/VStepper/VStepper'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, toRefs } from 'vue'
import { genericComponent, getPropertyFromItem, omit, propsFactory, useRender } from '@/util'

// Types
import type { VStepperSlot } from '@/components/VStepper/VStepper'
import type { StepperItem, StepperItemSlot } from '@/components/VStepper/VStepperItem'

export type VStepperVerticalSlots = {
  actions: StepperItemSlot
  default: VStepperSlot
  icon: StepperItemSlot
  title: StepperItemSlot
  subtitle: StepperItemSlot
  item: StepperItem
  prev: StepperItemSlot
  next: StepperItemSlot
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
  ...omit(makeVExpansionPanelsProps({
    mandatory: 'force' as const,
    variant: 'accordion' as const,
  }), ['static']),
}, 'VStepperVertical')

export const VStepperVertical = genericComponent<VStepperVerticalSlots>()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const vExpansionPanelsRef = ref<typeof VExpansionPanels>()
    const { color, editable, prevText, nextText, hideActions } = toRefs(props)

    const model = useProxiedModel(props, 'modelValue')
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
        hideActions,
        static: true,
      },
      VStepperActions: {
        color,
      },
    })

    useRender(() => {
      const expansionPanelProps = VExpansionPanels.filterProps(props)

      return (
        <VExpansionPanels
          { ...expansionPanelProps }
          v-model={ model.value }
          ref={ vExpansionPanelsRef }
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
                  { items.value.map(({ raw, ...item }) => (
                    <VStepperVerticalItem { ...item }>
                      {{
                        ...slots,
                        default: slots[`item.${item.value}`],
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
