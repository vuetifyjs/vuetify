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
import type { VStepperVerticalSlots } from './VStepperVertical.types'
import type { GenericProps } from '@/util'

export type { VStepperVerticalSlots }

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

export const VStepperVertical = genericComponent<new <T = number>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VStepperVerticalSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VStepperVertical',

  props: makeVStepperVerticalProps(),

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const vExpansionPanelsRef = ref<typeof VExpansionPanels>()
    const { color, eager, editable, prevText, nextText, hideActions } = toRefs(props)

    const model = useProxiedModel(props, 'modelValue')
    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item)
      const value = getPropertyFromItem(item, props.itemValue, index + 1)
      const itemProps = props.itemProps === true
        ? item
        : getPropertyFromItem(item, props.itemProps)

      const _props = {
        title,
        value,
        ...itemProps,
      }

      return {
        title: _props.title,
        value: _props.value,
        props: _props,
        raw: item,
      }
    }))

    provideDefaults({
      VStepperVerticalItem: {
        color,
        eager,
        editable,
        hideActions,
        static: true,
      },
      VStepperVerticalActions: {
        color,
        nextText,
        prevText,
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
            default: ({ prev, next }) => {
              return (
                <>
                  { items.value.map(({ raw, ...item }) => (
                    <VStepperVerticalItem { ...item.props }>
                      {{
                        ...slots,
                        default: slots[`item.${item.value}`],
                      }}
                    </VStepperVerticalItem>
                  ))}

                  { slots.default?.({ prev, next, step: model.value }) }
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
