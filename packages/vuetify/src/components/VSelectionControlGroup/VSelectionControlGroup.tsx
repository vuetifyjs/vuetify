// Styles
import './VSelectionControlGroup.sass'

// Composables
import { IconValue } from '@/composables/icons'
import { makeDensityProps } from '@/composables/density'
import { makeThemeProps } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, provide, toRef } from 'vue'
import { deepEqual, defineComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import { provideDefaults } from '@/composables/defaults'

export interface VSelectionGroupContext {
  modelValue: Ref<any>
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group')

export const makeSelectionControlProps = propsFactory({
  color: String,
  disabled: Boolean,
  defaultsTarget: {
    type: String,
    default: 'VSelectionControl',
  },
  error: Boolean,
  id: String,
  inline: Boolean,
  label: String,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  name: String,
  readonly: Boolean,
  trueValue: null,
  falseValue: null,
  modelValue: null,
  type: String,
  value: null,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeThemeProps(),
  ...makeDensityProps(),
}, 'VSelectionControl')

export const VSelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',

  props: makeSelectionControlProps(),

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const id = computed(() => props.id || `v-selection-control-group-${uid}`)
    const name = computed(() => props.name || id.value)

    provide(VSelectionControlGroupSymbol, { modelValue })

    provideDefaults({
      [props.defaultsTarget]: {
        color: toRef(props, 'color'),
        disabled: toRef(props, 'disabled'),
        density: toRef(props, 'density'),
        error: toRef(props, 'error'),
        inline: toRef(props, 'inline'),
        modelValue,
        multiple: computed(() => !!props.multiple || (props.multiple == null && Array.isArray(modelValue.value))),
        name,
        falseIcon: toRef(props, 'falseIcon'),
        trueIcon: toRef(props, 'trueIcon'),
        trueValue: toRef(props, 'trueValue'),
        falseValue: toRef(props, 'falseValue'),
        readonly: toRef(props, 'readonly'),
        ripple: toRef(props, 'ripple'),
        type: toRef(props, 'type'),
        valueComparator: toRef(props, 'valueComparator'),
      },
    })

    useRender(() => (
      <div
        class={[
          'v-selection-control-group',
          { 'v-selection-control-group--inline': props.inline },
        ]}
        aria-labelled-by={ props.type === 'radio' ? id.value : undefined }
        role={ props.type === 'radio' ? 'radiogroup' : undefined }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>
