// Styles
import './VField.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VExpandXTransition } from '@/components/transitions'
import { VFieldLabel } from './VFieldLabel'
import { VIcon } from '@/components/VIcon'

// Composables
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useFocus } from '@/composables/focus'

// Utilities
import { computed, ref, toRef, watch, watchEffect } from 'vue'
import {
  convertToUnit,
  genericComponent,
  getUid,
  nullifyTransforms,
  pick,
  propsFactory,
  standardEasing,
  useRender,
} from '@/util'

// Types
import type { VInputSlot } from '@/components/VInput/VInput'
import type { LoaderSlotProps } from '@/composables/loader'
import type { PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'

const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'] as const
type Variant = typeof allowedVariants[number]

export interface DefaultInputSlot {
  isActive: boolean
  isFocused: boolean
  inputRef: Ref<HTMLInputElement | undefined>
  controlRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export interface VFieldSlot extends DefaultInputSlot, VInputSlot {
  props: Record<string, unknown>
}

export const makeVFieldProps = propsFactory({
  appendInnerIcon: String,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: String,
    default: '$clear',
  },
  color: String,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: String,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },

  ...makeThemeProps(),
  ...makeLoaderProps(),
  ...makeVInputProps(),
}, 'v-field')

export const VField = genericComponent<new <T>() => {
  $props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => any
  }
  $slots: MakeSlots<{
    prependInner: [DefaultInputSlot & VInputSlot]
    clear: []
    appendInner: [DefaultInputSlot & VInputSlot]
    label: [DefaultInputSlot & VInputSlot]
    prepend: [DefaultInputSlot & VInputSlot]
    append: [DefaultInputSlot & VInputSlot]
    details: [DefaultInputSlot & VInputSlot]
    loader: [LoaderSlotProps]
    default: [VFieldSlot]
  }>
}>()({
  name: 'VField',

  inheritAttrs: false,

  props: {
    active: Boolean,
    ...makeVFieldProps(),
  },

  emits: {
    'click:clear': (e: Event) => true,
    'click:prepend-inner': (e: MouseEvent) => true,
    'click:append-inner': (e: MouseEvent) => true,
    'click:control': (props: DefaultInputSlot) => true,
    'update:active': (active: boolean) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { loaderClasses } = useLoader(props)
    const isActive = useProxiedModel(props, 'active')
    const { isFocused, focus, blur } = useFocus()

    const uid = getUid()

    const labelRef = ref<VFieldLabel>()
    const floatingLabelRef = ref<VFieldLabel>()
    const controlRef = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement>()
    const id = computed(() => props.id || `input-${uid}`)
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label))

    watchEffect(() => isActive.value = isFocused.value)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return (
        isActive.value &&
        isFocused.value &&
        !props.error &&
        !props.disabled
      ) ? props.color : undefined
    }))

    watch(isActive, val => {
      if (hasLabel.value) {
        const el: HTMLElement = labelRef.value!.$el
        const targetEl: HTMLElement = floatingLabelRef.value!.$el
        const rect = nullifyTransforms(el)
        const targetRect = targetEl.getBoundingClientRect()

        const x = targetRect.x - rect.x
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

        const targetWidth = targetRect.width / 0.75
        const width = Math.abs(targetWidth - rect.width) > 1
          ? { maxWidth: convertToUnit(targetWidth) }
          : undefined

        const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000
        const scale = parseFloat(getComputedStyle(targetEl).getPropertyValue('--v-field-label-scale'))

        el.style.visibility = 'visible'
        targetEl.style.visibility = 'hidden'

        el.animate([
          { transform: 'translate(0)' },
          { transform: `translate(${x}px, ${y}px) scale(${scale})`, ...width },
        ], {
          duration,
          easing: standardEasing,
          direction: val ? 'normal' : 'reverse',
        }).finished.then(() => {
          el.style.removeProperty('visibility')
          targetEl.style.removeProperty('visibility')
        })
      }
    }, { flush: 'post' })

    const slotProps = computed<DefaultInputSlot>(() => ({
      isActive: isActive.value,
      isFocused: isFocused.value,
      inputRef,
      controlRef,
      blur,
      focus,
    }))

    function onClick (e: MouseEvent) {
      if (e.target !== document.activeElement) {
        e.preventDefault()
      }

      emit('click:control', slotProps.value)
    }

    useRender(() => {
      const isOutlined = props.variant === 'outlined'
      const hasPrepend = (slots.prependInner || props.prependInnerIcon)
      const hasClear = !!(props.clearable || slots.clear)
      const hasAppend = !!(slots.appendInner || props.appendInnerIcon || hasClear)
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label
      const [inputProps, _] = filterInputProps(props)

      return (
        <VInput
          class={[
            'v-field',
            {
              'v-field--active': isActive.value,
              'v-field--appended': hasAppend,
              'v-field--focused': isFocused.value,
              'v-field--has-background': !!props.bgColor,
              'v-field--persistent-clear': props.persistentClear,
              'v-field--prepended': hasPrepend,
              'v-field--reverse': props.reverse,
              'v-field--single-line': props.singleLine,
              [`v-field--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            loaderClasses.value,
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          { ...inputProps }
          focused={ isFocused.value }
          { ...attrs }
        >
          {{
            prepend: slots.prepend ? props => slots.prepend?.({ ...props, ...slotProps.value }) : undefined,
            append: slots.append ? props => slots.append?.({ ...props, ...slotProps.value }) : undefined,
            details: slots.details ? props => slots.details?.({ ...props, ...slotProps.value }) : undefined,
            default: defaultProps => (
              <div
                class={[
                  'v-field__control',
                  backgroundColorClasses.value,
                ]}
                style={ backgroundColorStyles.value }
                onClick={ onClick }
              >
                <div class="v-field__overlay" />

                <LoaderSlot
                  name="v-field"
                  active={ props.loading }
                  color={ !defaultProps.isValid.value ? undefined : props.color }
                  v-slots={{ default: slots.loader }}
                />

                { hasPrepend && (
                  <div
                    class="v-field__prepend-inner"
                    onClick={ e => emit('click:prepend-inner', e) }
                  >
                    { props.prependInnerIcon && (
                      <VIcon icon={ props.prependInnerIcon } />
                    ) }

                    { slots?.prependInner?.(defaultProps) }
                  </div>
                ) }

                <div class="v-field__field">
                  { ['contained', 'filled'].includes(props.variant) && hasLabel.value && (
                    <VFieldLabel ref={ floatingLabelRef } floating>
                      { label }
                    </VFieldLabel>
                  ) }

                  <VFieldLabel ref={ labelRef } for={ id.value }>
                    { label }
                  </VFieldLabel>

                  { slots.default?.({
                    ...slotProps.value,
                    ...defaultProps,
                    props: {
                      id: id.value,
                      class: 'v-field__input',
                      onFocus: () => (isFocused.value = true),
                      onBlur: () => (isFocused.value = false),
                    },
                    focus,
                    blur,
                  } as VFieldSlot) }
                </div>

                { hasClear && (
                  <VExpandXTransition>
                    <div
                      class="v-field__clearable"
                      onClick={ (e: Event) => emit('click:clear', e) }
                      v-show={ props.active }
                    >
                      { slots.clear
                        ? slots.clear()
                        : <VIcon icon={ props.clearIcon } />
                      }
                    </div>
                  </VExpandXTransition>
                ) }

                { hasAppend && (
                  <div
                    class="v-field__append-inner"
                    onClick={ e => emit('click:append-inner', e) }
                  >
                    { slots?.appendInner?.(defaultProps) }

                    { props.appendInnerIcon && (
                      <VIcon icon={ props.appendInnerIcon } />
                    ) }
                  </div>
                ) }

                <div class="v-field__outline">
                  { isOutlined && (
                    <>
                      <div class="v-field__outline__start" />

                      { hasLabel.value && (
                        <div class="v-field__outline__notch">
                          <VFieldLabel ref={ floatingLabelRef } floating>
                            { label }
                          </VFieldLabel>
                        </div>
                      ) }

                      <div class="v-field__outline__end" />
                    </>
                  ) }

                  { ['plain', 'underlined'].includes(props.variant) && hasLabel.value && (
                    <VFieldLabel ref={ floatingLabelRef } floating>
                      { label }
                    </VFieldLabel>
                  ) }
                </div>
              </div>
            ),
          }}
        </VInput>
      )
    })

    return {
      inputRef,
      controlRef,
    }
  },
})

export type VField = InstanceType<typeof VField>

// TODO: this is kinda slow, might be better to implicitly inherit props instead
export function filterFieldProps (attrs: Record<string, unknown>) {
  return pick(attrs, Object.keys(VField.props))
}
