// Styles
import './VStepper.sass'

// Components
import { VStepperActions } from './VStepperActions'
import { VStepperHeader } from './VStepperHeader'
import { VStepperItem } from './VStepperItem'
import { makeVStepperWindowProps, VStepperWindow } from './VStepperWindow'
import { VStepperWindowItem } from './VStepperWindowItem'
import { VDivider } from '@/components/VDivider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'

// Utilities
import { computed } from 'vue'
import { genericComponent, getPropertyFromItem, omit, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { GroupItemProvide } from '@/composables/group'

export const VStepperSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-stepper')

export type StepperItem = string | Record<string, any>

export type VStepperSlot = {
  prev: () => void
  next: () => void
}

export type VStepperSlots = {
  default: VStepperSlot
  actions: VStepperSlot
  header: never
  item: never
} & { [key: `window-item.${string}`]: never }

export const makeVStepperProps = propsFactory({
  altLabels: Boolean,
  color: String,
  bgColor: String,
  editable: Boolean,
  items: {
    type: Array as PropType<readonly StepperItem[]>,
    default: () => ([]),
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  nonLinear: Boolean,
  flat: Boolean,
  hideActions: Boolean,
  backText: {
    type: String,
    default: 'Back',
  },
  continueText: {
    type: String,
    default: 'Continue',
  },
  // vertical: Boolean,

  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-stepper-item--selected',
  }),
  ...omit(makeVSheetProps(), ['color']),
}, 'VStepper')

export const VStepper = genericComponent<VStepperSlots>()({
  name: 'VStepper',

  props: makeVStepperProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const { next, prev } = useGroup(props, VStepperSymbol)

    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item)
      const value = getPropertyFromItem(item, props.itemValue, index + 1)

      return {
        title,
        value,
        raw: item,
      }
    }))

    const slotProps = computed(() => ({ next, prev }))

    useRender(() => {
      const [sheetProps] = VSheet.filterProps(props)
      const [stepperActionProps] = VStepperActions.filterProps(props)

      const hasHeader = !!(slots.header || props.items.length)

      return (
        <VSheet
          { ...sheetProps }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              // 'v-stepper--vertical': props.vertical,
            },
            props.class,
          ]}
          style={ props.style }
        >
          { hasHeader && (
            <VStepperHeader key="stepper-header">
              { items.value.map((item, index) => (
                <>
                  { !!index && (<VDivider />) }

                  <VStepperItem
                    { ...item }
                    editable={ props.editable }
                    v-slots={{ default: slots.item }}
                  />
                </>
              ))}

              { slots.header?.() }
            </VStepperHeader>
          )}

          { slots.default?.(slotProps.value) ?? props.items.length ? (
            <VStepperWindow key="stepper-window">
              { items.value.map((item, index) => {
                return (
                  <VStepperWindowItem
                    value={ item.value }
                    v-slots={{ default: slots[`window-item.${item.value}`] }}
                  />
                )
              })}
            </VStepperWindow>
          ) : undefined }

          { !props.hideActions && (
            slots.actions?.(slotProps.value) ?? (
              <VStepperActions
                key="stepper-actions"
                { ...stepperActionProps }
                onClick:back={ prev }
                onClick:continue={ next }
              />
            )
          )}
        </VSheet>
      )
    })

    return {
      prev,
      next,
    }
  },
})
