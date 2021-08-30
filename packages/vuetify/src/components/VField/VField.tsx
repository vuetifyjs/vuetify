// Styles
import './VField.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VExpandXTransition, VFadeTransition } from '@/components/transitions'
import { VIcon } from '@/components/VIcon'
import { VInput } from '@/components/VInput'
import { VProgressLinear } from '@/components/VProgressLinear'
import VFieldLabel from './VFieldLabel'

// Composables
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, toRef, watch, watchEffect } from 'vue'
import { convertToUnit, defineComponent, getUid, nullifyTransforms, propsFactory, standardEasing, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'

const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'] as const
type Variant = typeof allowedVariants[number]

export interface DefaultInputSlot {
  isActive: boolean
  isDirty: boolean
  isFocused: boolean
  controlRef: Ref<HTMLElement | undefined>
  inputRef: Ref<HTMLInputElement | undefined>
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
  clearable: Boolean,
  clearIcon: {
    type: String,
    default: '$clear',
  },
  color: String,
  error: Boolean,
  // TODO: implement auto
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
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
  ...makeTransitionProps({ transition: 'slide-y-transition' }),
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
    'click:clear': (e: Event) => true as any,
    'click:prepend-inner': (e: MouseEvent) => true as any,
    'click:append-inner': (e: MouseEvent) => true as any,
    'click:control': (props: DefaultInputSlot) => true as any,
    'update:active': (active: boolean) => true as any,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = useTheme(props)
    const isActive = useProxiedModel(props, 'active')
    const uid = getUid()

    const labelRef = ref<InstanceType<typeof VFieldLabel>>()
    const floatingLabelRef = ref<InstanceType<typeof VFieldLabel>>()
    const controlRef = ref<HTMLElement>()
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
      const hasDetails = (slots.details || props.hint)
      const hasPrepend = (slots.prependInner || props.prependInnerIcon)
      const hasClear = (props.clearable || slots.clear)
      const hasAppend = (slots.appendInner || props.appendInnerIcon || hasClear)
      const isLoading = (slots.loading || props.loading)

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
              'v-field--active': isActive.value,
              'v-field--appended': hasAppend,
              'v-field--dirty': props.dirty,
              'v-field--disabled': props.disabled,
              'v-field--error': props.error,
              'v-field--focused': isFocused.value,
              'v-field--loading': props.loading,
              'v-field--has-background': !!props.bgColor,
              'v-field--has-details': hasDetails,
              'v-field--hide-details': props.hideDetails,
              'v-field--prepended': hasPrepend,
              'v-field--reverse': props.reverse,
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
            details: hasDetails && (() => (
              <>
                <MaybeTransition transition={ props.transition }>
                  <div
                    v-show={
                      (props.hint && (props.persistentHint || slotProps.value.isFocused)) ||
                      props.error
                    }
                    class="v-field__details"
                  >
                    { !slots.details && props.hint }

                    { slots?.details?.(slotProps.value) }
                  </div>
                </MaybeTransition>
              </>
            )),
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

            <VFadeTransition>
              <div
                class="v-field__loader"
                v-show={ isLoading }
              >
                { slots?.loader?.() }

                { !slots.loader && (
                  <VProgressLinear
                    height="2"
                    indeterminate
                  />
                ) }
              </div>
            </VFadeTransition>

            { hasPrepend && (
              <div
                class="v-field__prepend-inner"
                onClick={ e => emit('click:prepend-inner', e) }
              >
                { props.prependInnerIcon && (
                  <VIcon icon={ props.prependInnerIcon } />
                ) }

                { slots?.prependInner?.(slotProps.value) }
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
                <VExpandXTransition>
                  { hasClear && inputRef.value?.value && (
                    <div class="v-field__clearable">
                      <VBtn
                        density="compact"
                        icon={ props.clearIcon }
                        tabindex="-1"
                        variant="text"
                        onClick={ (e: Event) => emit('click:clear', e) }
                      />
                    </div>
                  ) }
                </VExpandXTransition>

                { slots?.appendInner?.(slotProps.value) }

                { props.appendInnerIcon && (
                  <VIcon icon={ props.appendInnerIcon } />
                ) }
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
                    ) }
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
    }
  },
})

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type VField = InstanceType<typeof VField>
