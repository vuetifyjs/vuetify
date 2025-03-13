// Styles
import './VStepper.sass'

// Components
import { VStepperSymbol } from './shared'
import { makeVStepperActionsProps, VStepperActions } from './VStepperActions'
import { VStepperHeader } from './VStepperHeader'
import { VStepperItem } from './VStepperItem'
import { VStepperWindow } from './VStepperWindow'
import { VStepperWindowItem } from './VStepperWindowItem'
import { VDivider } from '@/components/VDivider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeGroupProps, useGroup } from '@/composables/group'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, toRefs } from 'vue'
import { genericComponent, getPropertyFromItem, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { StepperItem, StepperItemSlot } from './VStepperItem'

export type VStepperSlot = {
  prev: () => void
  next: () => void
}

export type VStepperSlots = {
  actions: VStepperSlot
  default: VStepperSlot
  header: StepperItem
  'header-item': StepperItemSlot
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

export const makeStepperProps = propsFactory({
  altLabels: Boolean,
  bgColor: String,
  completeIcon: IconValue,
  editIcon: IconValue,
  editable: Boolean,
  errorIcon: IconValue,
  hideActions: Boolean,
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

  ...makeDisplayProps(),
}, 'Stepper')

export const makeVStepperProps = propsFactory({
  ...makeStepperProps(),
  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-stepper-item--selected',
  }),
  ...makeVSheetProps(),
  ...pick(makeVStepperActionsProps(), ['prevText', 'nextText']),
}, 'VStepper')

export const VStepper = genericComponent<VStepperSlots>()({
  name: 'VStepper',

  props: makeVStepperProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    const { items: _items, next, prev, selected } = useGroup(props, VStepperSymbol)
    const { displayClasses, mobile } = useDisplay(props)
    const { completeIcon, editIcon, errorIcon, color, editable, prevText, nextText } = toRefs(props)

    const items = computed(() => props.items.map((item, index) => {
      const title = getPropertyFromItem(item, props.itemTitle, item)
      const value = getPropertyFromItem(item, props.itemValue, index + 1)

      return {
        title,
        value,
        raw: item,
      }
    }))
    const activeIndex = computed(() => {
      return _items.value.findIndex(item => selected.value.includes(item.id))
    })
    const disabled = computed(() => {
      if (props.disabled) return props.disabled
      if (activeIndex.value === 0) return 'prev'
      if (activeIndex.value === _items.value.length - 1) return 'next'

      return false
    })

    provideDefaults({
      VStepperItem: {
        editable,
        errorIcon,
        completeIcon,
        editIcon,
        prevText,
        nextText,
      },
      VStepperActions: {
        color,
        disabled,
        prevText,
        nextText,
      },
    })

    useRender(() => {
      const sheetProps = VSheet.filterProps(props)

      const hasHeader = !!(slots.header || props.items.length)
      const hasWindow = props.items.length > 0
      const hasActions = !props.hideActions && !!(hasWindow || slots.actions)

      return (
        <VSheet
          { ...sheetProps }
          color={ props.bgColor }
          class={[
            'v-stepper',
            {
              'v-stepper--alt-labels': props.altLabels,
              'v-stepper--flat': props.flat,
              'v-stepper--non-linear': props.nonLinear,
              'v-stepper--mobile': mobile.value,
            },
            displayClasses.value,
            props.class,
          ]}
          style={ props.style }
        >
          { hasHeader && (
            <VStepperHeader key="stepper-header">
              { items.value.map(({ raw, ...item }, index) => (
                <>
                  { !!index && (<VDivider />) }

                  <VStepperItem
                    { ...item }
                    v-slots={{
                      default: slots[`header-item.${item.value}`] ?? slots.header,
                      icon: slots.icon,
                      title: slots.title,
                      subtitle: slots.subtitle,
                    }}
                  />
                </>
              ))}
            </VStepperHeader>
          )}

          { hasWindow && (
            <VStepperWindow key="stepper-window">
              { items.value.map(item => (
                <VStepperWindowItem
                  value={ item.value }
                  v-slots={{
                    default: () => slots[`item.${item.value}`]?.(item) ?? slots.item?.(item),
                  }}
                />
              ))}
            </VStepperWindow>
          )}

          { slots.default?.({ prev, next }) }

          { hasActions && (
            slots.actions?.({ next, prev }) ?? (
              <VStepperActions
                key="stepper-actions"
                onClick:prev={ prev }
                onClick:next={ next }
                v-slots={ slots }
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

export type VStepper = InstanceType<typeof VStepper>
