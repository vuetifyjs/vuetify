// Styles
import './VField.sass'

// Components
import { VInput } from '@/components/VInput'
import { VIcon } from '@/components/VIcon'
import VFieldLabel from './VFieldLabel'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useBackgroundColor, useTextColor } from '@/composables/color'

// Utilities
import { computed, ref, toRef, watch, watchEffect } from 'vue'
import { convertToUnit, defineComponent, getUid, nullifyTransforms, propsFactory, standardEasing, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'

const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'] as const
type Variant = typeof allowedVariants[number]

export interface DefaultInputSlot {
  isActive: boolean
  isDirty: boolean
  isFocused: boolean
  controlRef: Ref<HTMLElement | undefined>
  inputRef: Ref<HTMLInputElement | undefined>
  fieldRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export interface VFieldSlot extends DefaultInputSlot {
  props: {
    id: string
    class: string
    onFocus: () => void
    onBlur: () => void
  }
}

export const makeVFieldProps = propsFactory({
  disabled: Boolean,
  appendInnerIcon: String,
  bgColor: String,
  color: String,
  hint: String,
  id: String,
  label: String,
  loading: Boolean,
  persistentHint: Boolean,
  prependInnerIcon: String,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },

  ...makeThemeProps(),
}, 'v-field')

export const VField = defineComponent({
  name: 'VField',

  inheritAttrs: false,

  props: {
    active: Boolean,
    dirty: Boolean,

    ...makeVFieldProps(),
  },

  emits: {
    'click:prepend-inner': (e: MouseEvent) => true,
    'click:append-inner': (e: MouseEvent) => true,
    'click:control': (props: DefaultInputSlot) => true as any,
    'update:active': (active: boolean) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = useTheme(props)
    const isActive = useProxiedModel(props, 'active')
    const uid = getUid()

    const labelRef = ref<InstanceType<typeof VFieldLabel>>()
    const floatingLabelRef = ref<InstanceType<typeof VFieldLabel>>()
    const controlRef = ref<HTMLElement>()
    const fieldRef = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement>()
    const isFocused = ref(false)
    const id = computed(() => props.id || `input-${uid}`)

    watchEffect(() => isActive.value = isFocused.value || props.dirty)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return isFocused.value ? props.color : undefined
    }))

    watch(isActive, val => {
      if (!props.singleLine) {
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

    function focus () {
      isFocused.value = true
    }

    function blur () {
      isFocused.value = false
    }

    const slotProps = computed<DefaultInputSlot>(() => ({
      isActive: isActive.value,
      isDirty: props.dirty,
      isFocused: isFocused.value,
      inputRef,
      controlRef,
      fieldRef,
      focus,
      blur,
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
      const hasAppend = (slots.appendInner || props.appendInnerIcon)

      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <VInput
          class={[
            'v-field',
            {
              'v-field--prepended': hasPrepend,
              'v-field--appended': hasAppend,
              'v-field--active': isActive.value,
              'v-field--dirty': props.dirty,
              'v-field--disabled': props.disabled,
              'v-field--focused': isFocused.value,
              'v-field--reverse': props.reverse,
              'v-field--has-background': !!props.bgColor,
              'v-field--single-line': props.singleLine,
              [`v-field--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
          { ...attrs }
          v-slots={{
            prepend: slots.prepend && (() => slots.prepend?.(slotProps.value)),
            append: slots.append && (() => slots.append?.(slotProps.value)),
            details: slots.details && (() => slots.details?.(slotProps.value)),
          }}
        >
          <div
            class={[
              'v-field__control',
              backgroundColorClasses.value,
            ]}
            style={ backgroundColorStyles.value }
            onClick={ onClick }
          >
            <div class="v-field__overlay" />

            { hasPrepend && (
              <div
                class="v-field__prepend-inner"
                onClick={ e => emit('click:prepend-inner', e) }
              >
                { slots.prependInner
                  ? slots.prependInner(slotProps.value)
                  : (<VIcon icon={ props.prependInnerIcon } />)
                }
              </div>
            ) }

            <div class="v-field__field">
              { ['contained', 'filled'].includes(props.variant) && !props.singleLine && (
                <VFieldLabel ref={ floatingLabelRef } floating>
                  { label }
                </VFieldLabel>
              ) }

              <VFieldLabel ref={ labelRef } for={ id.value }>
                { label }
              </VFieldLabel>

              { slots.default?.({
                ...slotProps.value,
                props: {
                  id: id.value,
                  class: 'v-field__input',
                  onFocus: () => (isFocused.value = true),
                  onBlur: () => (isFocused.value = false),
                },
              } as VFieldSlot) }
            </div>

            { hasAppend && (
              <div
                class="v-field__append-inner"
                onClick={ e => emit('click:append-inner', e) }
              >
                { slots.appendInner
                  ? slots.appendInner(slotProps.value)
                  : (<VIcon icon={ props.appendInnerIcon } />)
                }
              </div>
            ) }

            <div class="v-field__outline">
              { isOutlined && (
                <>
                  <div class="v-field__outline__start" />

                  <div class="v-field__outline__notch">
                    { !props.singleLine && (
                      <VFieldLabel ref={ floatingLabelRef } floating>
                        { label }
                      </VFieldLabel>
                    )}
                  </div>

                  <div class="v-field__outline__end" />
                </>
              ) }

              { ['plain', 'underlined'].includes(props.variant) && !props.singleLine && (
                <VFieldLabel ref={ floatingLabelRef } floating>
                  { label }
                </VFieldLabel>
              ) }
            </div>
          </div>
        </VInput>
      )
    })

    return {
      inputRef,
      controlRef,
      fieldRef,
    }
  },
})

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type VField = InstanceType<typeof VField>
