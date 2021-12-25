// Styles
import './VStepper.sass'

// Components
import { VStepperStep } from './VStepperStep'
import { VStepperContent } from './VStepperContent'
import { VStepperLine } from './VStepperLine'
import { VWindow } from '@/components/VWindow'

// Composables
import { makeGroupProps, useGroup } from '@/composables/group'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, provide, toRef } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { GroupProvide } from '@/composables/group'

type VStepperProvide = {
  direction: Ref<string>
  stackedLabels: Ref<boolean | undefined>
}

export const VStepperGroupProvideSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-stepper-group')
export const VStepperProvideSymbol: InjectionKey<VStepperProvide> = Symbol.for('vuetify:v-stepper')

type VStepperItem<T> = {
  value: T
} | T

function parseItems<T> (items: VStepperItem<T>[] | undefined) {
  if (!items) return []

  return items.map(item => {
    if (typeof item === 'string') return { value: item }

    return item
  })
}

export const VStepper = genericComponent<new <T>() => {
  $props: {
    items?: VStepperItem<T>[]
  }
  $slots: MakeSlots<{
    default: []
  }>
}>()({
  name: 'VStepper',

  props: {
    stackedLabels: Boolean,
    nonLinear: Boolean,
    flat: Boolean,
    direction: {
      type: String,
      default: 'vertical',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    },
    items: Array as PropType<VStepperItem<any>[]>,
    ...makeGroupProps({
      mandatory: 'force' as const,
    }),
    ...makeTagProps(),
  },

  emits: {
    'update:modelValue': (v: any) => true,
  },

  setup (props, { slots, emit }) {
    const group = useGroup(props, VStepperGroupProvideSymbol)
    const items = computed(() => parseItems(props.items))

    provide(VStepperProvideSymbol, {
      stackedLabels: toRef(props, 'stackedLabels'),
      direction: toRef(props, 'direction'),
    })

    const classes = computed(() => ([
      'v-stepper',
      `v-stepper--${props.direction}`,
    ]))

    return () => {
      if (props.direction === 'vertical') {
        return (
          <props.tag class={ classes.value }>
            { items.value.map((item, index) => (
              <>
                <VStepperStep { ...item } step={ index + 1 } v-slots={ slots } />

                <div class="v-stepper__wrapper">
                  <VStepperLine empty={ index + 1 === Number(props.items?.length) } />
                  <VStepperContent value={item.value} step={ index + 1 } v-slots={ slots } />
                </div>
              </>
            )) }
          </props.tag>
        )
      }

      return (
        <props.tag class={ classes.value }>
          <div class="v-stepper__header">
            { items.value.map((item, index) => (
              <>
                <VStepperStep { ...item } step={ index + 1 } v-slots={ slots } />
                { index + 1 < Number(props.items?.length) && (
                  <VStepperLine />
                ) }
              </>
            )) }
          </div>

          <div class="v-stepper__wrapper">
            <VWindow modelValue={ group.selected.value }>
              { props.items?.map((item, index) => (
                <VStepperContent value={item.value} step={ index + 1 } v-slots={ slots } />
              )) }
            </VWindow>
          </div>
        </props.tag>
      )
    }
  },
})
