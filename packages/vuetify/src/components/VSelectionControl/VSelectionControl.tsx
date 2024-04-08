// Styles
import './VSelectionControl.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VLabel } from '@/components/VLabel'
import { makeSelectionControlGroupProps, VSelectionControlGroupSymbol } from '@/components/VSelectionControlGroup/VSelectionControlGroup'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useDensity } from '@/composables/density'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject, nextTick, ref, shallowRef } from 'vue'
import {
  filterInputAttrs,
  genericComponent,
  getUid,
  matchesSelector,
  propsFactory,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { CSSProperties, ExtractPropTypes, Ref, VNode, WritableComputedRef } from 'vue'
import type { IconValue } from '@/composables/icons'
import type { EventProp, GenericProps } from '@/util'

export type SelectionControlSlot = {
  model: WritableComputedRef<boolean>
  textColorClasses: Ref<string[]>
  textColorStyles: Ref<CSSProperties>
  backgroundColorClasses: Ref<string[]>
  backgroundColorStyles: Ref<CSSProperties>
  inputNode: VNode
  icon: IconValue | undefined
  props: {
    onBlur: (e: Event) => void
    onFocus: (e: FocusEvent) => void
    id: string
  }
}

export type VSelectionControlSlots = {
  default: {
    backgroundColorClasses: Ref<string[]>
    backgroundColorStyles: Ref<CSSProperties>
  }
  label: { label: string | undefined, props: Record<string, unknown> }
  input: SelectionControlSlot
}

export const makeVSelectionControlProps = propsFactory({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,

  ...makeComponentProps(),
  ...makeSelectionControlGroupProps(),
}, 'VSelectionControl')

export function useSelectionControl (
  props: ExtractPropTypes<ReturnType<typeof makeVSelectionControlProps>> & {
    'onUpdate:modelValue': EventProp | undefined
  }
) {
  const group = inject(VSelectionControlGroupSymbol, undefined)
  const { densityClasses } = useDensity(props)
  const modelValue = useProxiedModel(props, 'modelValue')
  const trueValue = computed(() => (
    props.trueValue !== undefined ? props.trueValue
    : props.value !== undefined ? props.value
    : true
  ))
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false)
  const isMultiple = computed(() => (
    !!props.multiple ||
    (props.multiple == null && Array.isArray(modelValue.value))
  ))
  const model = computed({
    get () {
      const val = group ? group.modelValue.value : modelValue.value

      return isMultiple.value
        ? wrapInArray(val).some((v: any) => props.valueComparator(v, trueValue.value))
        : props.valueComparator(val, trueValue.value)
    },
    set (val: boolean) {
      if (props.readonly) return

      const currentValue = val ? trueValue.value : falseValue.value

      let newVal = currentValue

      if (isMultiple.value) {
        newVal = val
          ? [...wrapInArray(modelValue.value), currentValue]
          : wrapInArray(modelValue.value).filter((item: any) => !props.valueComparator(item, trueValue.value))
      }

      if (group) {
        group.modelValue.value = newVal
      } else {
        modelValue.value = newVal
      }
    },
  })
  const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
    if (props.error || props.disabled) return undefined

    return model.value ? props.color : props.baseColor
  }))
  const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(computed(() => {
    return (
      model.value &&
      !props.error &&
      !props.disabled
    ) ? props.color : undefined
  }))
  const icon = computed(() => model.value ? props.trueIcon : props.falseIcon)

  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    backgroundColorClasses,
    backgroundColorStyles,
    icon,
  }
}

export const VSelectionControl = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VSelectionControlSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSelectionControl',

  directives: { Ripple },

  inheritAttrs: false,

  props: makeVSelectionControlProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { attrs, slots }) {
    const {
      group,
      densityClasses,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      backgroundColorClasses,
      backgroundColorStyles,
      trueValue,
    } = useSelectionControl(props)
    const uid = getUid()
    const isFocused = shallowRef(false)
    const isFocusVisible = shallowRef(false)
    const input = ref<HTMLInputElement>()
    const id = computed(() => props.id || `input-${uid}`)
    const isInteractive = computed(() => !props.disabled && !props.readonly)

    group?.onForceUpdate(() => {
      if (input.value) {
        input.value.checked = model.value
      }
    })

    function onFocus (e: FocusEvent) {
      if (!isInteractive.value) return

      isFocused.value = true
      if (matchesSelector(e.target as HTMLElement, ':focus-visible') !== false) {
        isFocusVisible.value = true
      }
    }

    function onBlur () {
      isFocused.value = false
      isFocusVisible.value = false
    }

    function onClickLabel (e: Event) {
      e.stopPropagation()
    }

    function onInput (e: Event) {
      if (!isInteractive.value) return

      if (props.readonly && group) {
        nextTick(() => group.forceUpdate())
      }
      model.value = (e.target as HTMLInputElement).checked
    }

    useRender(() => {
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      const inputNode = (
        <input
          ref={ input }
          checked={ model.value }
          disabled={ !!props.disabled }
          id={ id.value }
          onBlur={ onBlur }
          onFocus={ onFocus }
          onInput={ onInput }
          aria-disabled={ !!props.disabled }
          aria-label={ props.label }
          type={ props.type }
          value={ trueValue.value }
          name={ props.name }
          aria-checked={ props.type === 'checkbox' ? model.value : undefined }
          { ...inputAttrs }
        />
      )

      return (
        <div
          class={[
            'v-selection-control',
            {
              'v-selection-control--dirty': model.value,
              'v-selection-control--disabled': props.disabled,
              'v-selection-control--error': props.error,
              'v-selection-control--focused': isFocused.value,
              'v-selection-control--focus-visible': isFocusVisible.value,
              'v-selection-control--inline': props.inline,
            },
            densityClasses.value,
            props.class,
          ]}
          { ...rootAttrs }
          style={ props.style }
        >
          <div
            class={[
              'v-selection-control__wrapper',
              textColorClasses.value,
            ]}
            style={ textColorStyles.value }
          >
            { slots.default?.({
              backgroundColorClasses,
              backgroundColorStyles,
            })}

            <div
              class={[
                'v-selection-control__input',
              ]}
              v-ripple={ props.ripple && [
                !props.disabled && !props.readonly,
                null,
                ['center', 'circle'],
              ]}
            >
              { slots.input?.({
                model,
                textColorClasses,
                textColorStyles,
                backgroundColorClasses,
                backgroundColorStyles,
                inputNode,
                icon: icon.value,
                props: {
                  onFocus,
                  onBlur,
                  id: id.value,
                },
              } satisfies SelectionControlSlot) ?? (
                <>
                  { icon.value && <VIcon key="icon" icon={ icon.value } /> }

                  { inputNode }
                </>
              )}
            </div>
          </div>

          { label && (
            <VLabel for={ id.value } onClick={ onClickLabel }>
              { label }
            </VLabel>
          )}
        </div>
      )
    })

    return {
      isFocused,
      input,
    }
  },
})

export type VSelectionControl = InstanceType<typeof VSelectionControl>
