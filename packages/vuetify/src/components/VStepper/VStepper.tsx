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
import { computed, provide, ref, toRef } from 'vue'
import { addNodesInSlots, genericComponent } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'
import type { GroupProvide } from '@/composables/group'
import { useProxiedModel } from '@/composables/proxiedModel'

type VStepperProvide = {
  direction: Ref<string>
  stackedLabels: Ref<boolean | undefined>
}

export const VStepperGroupProvideSymbol: InjectionKey<GroupProvide> = Symbol.for('vuetify:v-stepper-group')
export const VStepperProvideSymbol: InjectionKey<VStepperProvide> = Symbol.for('vuetify:v-stepper')

type VStepperItem<T> = {
  value: T
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
    eager: Boolean,
    altLabels: Boolean,
    dynamicFirst: Boolean,
    stackedLabels: Boolean,
    nonLinear: Boolean,
    flat: Boolean,
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    },
    items: {
      type: Array as PropType<VStepperItem<any>[]>,
      default: () => ([]),
    },
    ...makeGroupProps({
      mandatory: 'force' as const,
    }),
    ...makeTagProps(),
  },

  emits: {
    'update:modelValue': (v: any) => true,
  },

  setup (props, { slots, emit }) {
    // console.log('Stepper -Setup') // Can be removed after approval
    const rootEl = ref<HTMLElement>()

    const model = useProxiedModel(props, 'modelValue')
    const group = useGroup(props, VStepperGroupProvideSymbol)
    const pitems = computed(() => props.items)

    const steps: any[] = []
    const contents: any[] = []
    const stepItems: any[] = []
    const addSlotItem = (slotItem: any) => {
      stepItems.push({
        ...slotItem.props,
        labelSlot: slotItem.children,
        value: slotItem.props.step,
        slot: contents?.filter(el => el.props.step === slotItem.props.step)[0]?.children,
      }
      )
    }

    const parseItems = () => {
      // Reading slots and extracting the steps and step contents
      addNodesInSlots('VStepperStep', slots, steps)
      addNodesInSlots('VStepperContent', slots, contents)

      /* Can be removed after approval
      console.log('Slot Steps :')
      console.log('===========================================')
      console.log(steps)
      console.log('Slot Contents :')
      console.log('===========================================')
      console.log(contents)
      */

      // Sorting both the property and slot items according to the step value
      if (pitems.value.length > 0) pitems.value.sort((a: any, b: any) => (a?.step ?? 0 - b?.step ?? 0))
      if (steps.length > 0) steps.sort((a: any, b: any) => (a?.props.step ?? 0 - b?.props.step ?? 0))

      // Below Logic  is for checking both items (property/slots) and arrange them according to the priority
      const pe = pitems.value.length !== 0
      const se = steps.length !== 0

      // console.log('Property Items exist : ' + pe + ', Slot Items exist : ' + se) // Can be removed after approval

      if ((pe && props.dynamicFirst) || (!se && pe)) {
        pitems.value.forEach(curItem => stepItems.push(curItem))
        if (se) {
          steps.forEach(curItem => {
            if (pitems.value.filter((e: any) => (e.step ?? e.value ?? '') === curItem.props.step).length === 0) addSlotItem(curItem)
          })
        }
      } else if ((se && !props.dynamicFirst) || (!pe && se)) {
        steps.forEach(curItem => addSlotItem(curItem))
        if (pe) {
          pitems.value.forEach((curItem: any) => {
            if (steps.filter((e: any) => (e.props.step ?? 1) === (curItem.step ?? curItem.value)).length === 0) stepItems.push(curItem)
          })
        }
      }
    }

    parseItems()

    const hasContent = contents.length > 0 || pitems.value.length > 0
    stepItems.sort((a: any, b: any) => ((a?.step ?? 0) - (b?.step ?? 0))) // Sorting the final step items
    // console.log(stepItems) // Can be removed after approval

    provide(VStepperProvideSymbol, {
      stackedLabels: toRef(props, 'stackedLabels'),
      direction: toRef(props, 'direction'),
    })

    const classes = computed(() => {
      const classList = [
        'v-stepper',
        `v-stepper--${props.direction}`,
      ]
      if (props.altLabels) classList.push('v-stepper--alt-labels')
      if (props.flat) classList.push('v-stepper--flat')
      if (props.nonLinear) classList.push('v-stepper--non-linear')
      return classList
    })
    return () => {
      if (props.direction === 'vertical') {
        return (
            <props.tag

            ref={ rootEl }
            class={ classes.value }
            v-model={ model.value }
            onUpdate:modelValue={ (v: any) => emit('update:modelValue', v) }
            >
              { stepItems.map((item, index) => (
                <>
                  <VStepperStep { ...item } step={ index + 1 } v-slots={ item.labelSlot ? item.labelSlot : slots } />

                  <div class="v-stepper__wrapper">
                    <VStepperLine empty={ index + 1 === Number(stepItems?.length) } />
                      { hasContent && (
                        <VStepperContent
                        value={item.value}
                        step={ index + 1 }
                        eager={ props.eager }
                        v-slots={ item.slot ? item.slot : slots }
                        />
                      ) }

                  </div>
                </>
              )) }
            </props.tag>
        )
      }

      return (
          <props.tag
          ref={ rootEl }
          class={ classes.value }
          v-model={ model.value }
          onUpdate:modelValue={ (v: any) => emit('update:modelValue', v) }

          >
            <div class="v-stepper__header">
              { stepItems.map((item, index) => (
                <>
                  <VStepperStep { ...item } step={ index + 1 } v-slots={ item.labelSlot ? item.labelSlot : slots } />
                  { index + 1 < Number(stepItems?.length) && (
                    <VStepperLine />
                  ) }
                </>
              )) }
            </div>

            <div class="v-stepper__wrapper">
                <VWindow modelValue={ group.selected.value }>
                  { hasContent && stepItems.map((item, index) => (
                    <VStepperContent
                      value={item.value}
                      step={ index + 1 }
                      eager={ props.eager }
                      v-slots={ item.slot ? item.slot : slots }
                    />
                  )) }
                </VWindow>
            </div>
          </props.tag>
      )
    }
  },
})
