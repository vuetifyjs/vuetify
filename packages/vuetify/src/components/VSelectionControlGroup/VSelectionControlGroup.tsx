// Styles
import './VSelectionControlGroup.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { computed, onScopeDispose, provide, toRef } from 'vue'
import { deepEqual, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'
import type { GenericProps } from '@/util'

export interface VSelectionGroupContext {
  modelValue: Ref<any>
  forceUpdate: () => void
  onForceUpdate: (fn: () => void) => void
}

export const VSelectionControlGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-control-group')

export const makeSelectionControlGroupProps = propsFactory({
  color: String,
  disabled: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },
  multiple: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  name: String,
  readonly: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeThemeProps(),
}, 'SelectionControlGroup')

export const makeVSelectionControlGroupProps = propsFactory({
  ...makeSelectionControlGroupProps({
    defaultsTarget: 'VSelectionControl',
  }),
}, 'VSelectionControlGroup')

export const VSelectionControlGroup = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: { default: never },
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSelectionControlGroup',

  props: makeVSelectionControlGroupProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const modelValue = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const id = computed(() => props.id || `v-selection-control-group-${uid}`)
    const name = computed(() => props.name || id.value)

    const updateHandlers = new Set<() => void>()
    provide(VSelectionControlGroupSymbol, {
      modelValue,
      forceUpdate: () => {
        updateHandlers.forEach(fn => fn())
      },
      onForceUpdate: cb => {
        updateHandlers.add(cb)
        onScopeDispose(() => {
          updateHandlers.delete(cb)
        })
      },
    })

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
          props.class,
        ]}
        style={ props.style }
        role={ props.type === 'radio' ? 'radiogroup' : undefined }
      >
        { slots.default?.() }
      </div>
    ))

    return {}
  },
})

export type VSelectionControlGroup = InstanceType<typeof VSelectionControlGroup>
