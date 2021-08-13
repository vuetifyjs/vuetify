// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'
import VInputLabel from './VInputLabel'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
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

export interface VInputSlot extends DefaultInputSlot {
  props: {
    id: string
    class: string
    onFocus: () => void
    onBlur: () => void
  }
}

export const makeVInputProps = propsFactory({
  disabled: Boolean,
  appendIcon: String,
  appendOuterIcon: String,
  bgColor: String,
  color: String,
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
  hideSpinButtons: Boolean,
  hint: String,
  id: String,
  label: String,
  loading: Boolean,
  persistentHint: Boolean,
  prependIcon: String,
  prependOuterIcon: String,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },

  ...makeThemeProps(),
  ...makeDensityProps(),
}, 'v-input')

export const VInput = defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: {
    active: Boolean,
    dirty: Boolean,

    ...makeVInputProps(),
  },

  emits: {
    'click:prepend-outer': (e: Event) => true,
    'click:prepend': (e: Event) => true,
    'click:append': (e: Event) => true,
    'click:append-outer': (e: Event) => true,
    'click:control': (props: DefaultInputSlot) => true as any,
    'update:active': (active: boolean) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-input')
    const isActive = useProxiedModel(props, 'active')
    const uid = getUid()

    const labelRef = ref<InstanceType<typeof VInputLabel>>()
    const floatingLabelRef = ref<InstanceType<typeof VInputLabel>>()
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
        const scale = parseFloat(getComputedStyle(targetEl).getPropertyValue('--v-input-label-scale'))

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
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasPrependOuter = (slots.prependOuter || props.prependOuterIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const hasAppendOuter = (slots.appendOuter || props.appendOuterIcon)

      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <div
          class={[
            attrs.class,
            'v-input',
            {
              'v-input--prepended': hasPrepend,
              'v-input--appended': hasAppend,
              'v-input--active': isActive.value,
              'v-input--dirty': props.dirty,
              'v-input--disabled': props.disabled,
              'v-input--focused': isFocused.value,
              'v-input--reverse': props.reverse,
              'v-input--has-background': !!props.bgColor,
              'v-input--single-line': props.singleLine,
              [`v-input--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            densityClasses.value,
            textColorClasses.value,
          ]}
          style={[
            textColorStyles.value,
          ]}
        >
          { hasPrependOuter && (
            <div
              class="v-input__prepend-outer"
              onClick={ (e: Event) => emit('click:prepend-outer', e) }
            >
              { slots.prependOuter
                ? slots.prependOuter(slotProps.value)
                : (<VIcon icon={ props.prependOuterIcon } />)
              }
            </div>
          ) }

          <div
            class={[
              'v-input__control',
              backgroundColorClasses.value,
            ]}
            style={ backgroundColorStyles.value }
            onClick={ onClick }
          >
            <div class="v-input__overlay" />

            { hasPrepend && (
              <div
                class="v-input__prepend"
                onClick={ (e: Event) => emit('click:prepend', e) }
              >
                { slots.prepend
                  ? slots.prepend(slotProps.value)
                  : (<VIcon icon={ props.prependIcon } />)
                }
              </div>
            ) }

            <div class="v-input__field">
              { ['contained', 'filled'].includes(props.variant) && !props.singleLine && (
                <VInputLabel ref={ floatingLabelRef } floating>
                  { label }
                </VInputLabel>
              ) }

              <VInputLabel ref={ labelRef } for={ id.value }>
                { label }
              </VInputLabel>

              { slots.default?.({
                ...slotProps.value,
                props: {
                  id: id.value,
                  class: 'v-input__input',
                  onFocus: () => (isFocused.value = true),
                  onBlur: () => (isFocused.value = false),
                },
              } as VInputSlot) }
            </div>

            { hasAppend && (
              <div
                class="v-input__append"
                onClick={ (e: Event) => emit('click:append', e) }
              >
                { slots.append
                  ? slots.append(slotProps.value)
                  : (<VIcon icon={ props.appendIcon } />)
                }
              </div>
            ) }

            <div class="v-input__outline">
              { isOutlined && (
                <>
                  <div class="v-input__outline__start" />

                  <div class="v-input__outline__notch">
                    { !props.singleLine && (
                      <VInputLabel ref={ floatingLabelRef } floating>
                        { label }
                      </VInputLabel>
                    )}
                  </div>

                  <div class="v-input__outline__end" />
                </>
              ) }

              { ['plain', 'underlined'].includes(props.variant) && !props.singleLine && (
                <VInputLabel ref={ floatingLabelRef } floating>
                  { label }
                </VInputLabel>
              ) }
            </div>
          </div>

          { hasAppendOuter && (
            <div
              class="v-input__append-outer"
              onClick={ (e: Event) => emit('click:append-outer', e) }
            >
              { slots.appendOuter
                ? slots.appendOuter(slotProps.value)
                : (<VIcon icon={ props.appendOuterIcon } />)
              }
            </div>
          ) }

          { slots.details && (
            <div class="v-input__details">
              { slots.details() }
            </div>
          ) }
        </div>
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
export type VInput = InstanceType<typeof VInput>
