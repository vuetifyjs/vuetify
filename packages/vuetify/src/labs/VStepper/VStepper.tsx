// Styles
import './VStepper.sass'

// Components
import { makeVStepperActionsProps, VStepperActions } from './VStepperActions'
import { VStepperHeader } from './VStepperHeader'
import { VStepperItem } from './VStepperItem'
import { VStepperWindow } from './VStepperWindow'
import { VStepperWindowItem } from './VStepperWindowItem'
import { VDivider } from '@/components/VDivider'
import { makeVSheetProps, VSheet } from '@/components/VSheet/VSheet'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeGroupProps, useGroup } from '@/composables/group'

// Utilities
import { computed, toRefs } from 'vue'
import { genericComponent, getPropertyFromItem, omit, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType } from 'vue'
import type { StepperItemSlot } from './VStepperItem'
import type { GroupItemProvide } from '@/composables/group'

export const VStepperSymbol: InjectionKey<GroupItemProvide> = Symbol.for('vuetify:v-stepper')

export type StepperItem = string | Record<string, any>

export type VStepperSlot = {
  prev: () => void
  next: () => void
}

export type VStepperSlots = {
  actions: VStepperSlot
  default: StepperItem
  header: StepperItem
  'header-item': StepperItemSlot
  icon: StepperItemSlot
  title: StepperItemSlot
  subtitle: StepperItemSlot
  item: StepperItem
} & {
  [key: `header-item.${string}`]: StepperItemSlot
  [key: `item.${string}`]: StepperItem
}

export const makeVStepperProps = propsFactory({
  altLabels: Boolean,
  bgColor: String,
  editable: Boolean,
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
  mobile: Boolean,
  nonLinear: Boolean,
  flat: Boolean,

  ...makeGroupProps({
    mandatory: 'force' as const,
    selectedClass: 'v-stepper-item--selected',
  }),
  ...omit(makeVSheetProps(), ['color']),
  ...makeVStepperActionsProps(),
}, 'VStepper')

export const VStepper = genericComponent<VStepperSlots>()({
  name: 'VStepper',

  props: makeVStepperProps(),

  emits: {
    'update:modelValue': (v: unknown) => true,
  },

  setup (props, { slots }) {
    // TODO: fix typing
    const { items: _items, next, prev, selected } = useGroup(props as any, VStepperSymbol)
    const { editable, prevText, nextText } = toRefs(props)

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
        prevText,
        nextText,
      },
      VStepperActions: {
        disabled,
      },
    })

    useRender(() => {
      const [sheetProps] = VSheet.filterProps(props)
      const [stepperActionProps] = VStepperActions.filterProps(props)

      const hasHeader = !!(slots.header || props.items.length)
      const hasWindow = props.items.length > 0
      const hasActions = !props.hideActions && !!(hasWindow || slots.actions)

      return (
        <VSheet
          { ...sheetProps }
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
          { hasHeader && (
            <VStepperHeader key="stepper-header">
              { items.value.map((item, index) => (
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
                { ...stepperActionProps }
                onClick:prev={ prev }
                onClick:next={ next }
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
