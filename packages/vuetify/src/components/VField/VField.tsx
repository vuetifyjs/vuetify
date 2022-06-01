// Styles
import './VField.sass'

// Components
import { VExpandXTransition } from '@/components/transitions'
import { VIcon } from '@/components/VIcon'
import { VFieldLabel } from './VFieldLabel'

// Composables
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, ref, toRef, watch } from 'vue'
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
  isActive: Ref<boolean>
  isFocused: Ref<boolean>
  controlRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export interface VFieldSlot extends DefaultInputSlot {
  props: Record<string, unknown>
}

export const makeVFieldProps = propsFactory({
  appendInnerIcon: IconValue,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: IconValue,
    default: '$clear',
  },
  active: Boolean,
  color: String,
  dirty: Boolean,
  disabled: Boolean,
  error: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: IconValue,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },

  ...makeThemeProps(),
  ...makeLoaderProps(),
}, 'v-field')

export type VFieldSlots = MakeSlots<{
  clear: []
  prependInner: [DefaultInputSlot & VInputSlot]
  appendInner: [DefaultInputSlot & VInputSlot]
  label: [DefaultInputSlot & VInputSlot]
  loader: [LoaderSlotProps]
  default: [VFieldSlot]
}>

export const VField = genericComponent<new <T>() => {
  $props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => any
  }
  $slots: VFieldSlots
}>()({
  name: 'VField',

  inheritAttrs: false,

  props: {
    id: String,

    ...makeFocusProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'click:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { loaderClasses } = useLoader(props)
    const { focusClasses, isFocused, focus, blur } = useFocus(props)

    const isActive = computed(() => props.dirty || props.active)
    const hasLabel = computed(() => !props.singleLine && !!(props.label || slots.label))

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)

    const labelRef = ref<VFieldLabel>()
    const floatingLabelRef = ref<VFieldLabel>()
    const controlRef = ref<HTMLElement>()

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
      isActive,
      isFocused,
      controlRef,
      blur,
      focus,
    }))

    function onClick (e: MouseEvent) {
      if (e.target !== document.activeElement) {
        e.preventDefault()
      }

      emit('click:control', e)
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

      return (
        <div
          class={[
            'v-field',
            {
              'v-field--active': isActive.value,
              'v-field--appended': hasAppend,
              'v-field--disabled': props.disabled,
              'v-field--dirty': props.dirty,
              'v-field--error': props.error,
              'v-field--has-background': !!props.bgColor,
              'v-field--persistent-clear': props.persistentClear,
              'v-field--prepended': hasPrepend,
              'v-field--reverse': props.reverse,
              'v-field--single-line': props.singleLine,
              'v-field--has-label': !!label,
              [`v-field--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            focusClasses.value,
            loaderClasses.value,
          ]}
          style={[
            backgroundColorStyles.value,
            textColorStyles.value,
          ]}
          onClick={ onClick }
          { ...attrs }
        >
          <div class="v-field__overlay" />

          <LoaderSlot
            name="v-field"
            active={ props.loading }
            color={ props.error ? 'error' : props.color }
            v-slots={{ default: slots.loader }}
          />

          { hasPrepend && (
            <div
              class="v-field__prepend-inner"
            >
              { props.prependInnerIcon && (
                <VIcon
                  onClick={ attrs['onClick:prependInner'] }
                  icon={ props.prependInnerIcon }
                />
              ) }

              { slots?.prependInner?.(slotProps.value) }
            </div>
          ) }

          <div class="v-field__field" data-no-activator="">
            { ['contained', 'filled'].includes(props.variant) && hasLabel.value && (
              <VFieldLabel
                ref={ floatingLabelRef }
                class={[textColorClasses.value]}
                floating
              >
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
              },
              focus,
              blur,
            } as VFieldSlot) }
          </div>

          { hasClear && (
            <VExpandXTransition>
              <div
                class="v-field__clearable"
                v-show={ props.dirty }
              >
                { slots.clear
                  ? slots.clear()
                  : (
                    <VIcon
                      onClick={ (e: MouseEvent) => emit('click:clear', e) }
                      icon={ props.clearIcon }
                    />
                  )
                }
              </div>
            </VExpandXTransition>
          ) }

          { hasAppend && (
            <div
              class="v-field__append-inner"
            >
              { slots?.appendInner?.(slotProps.value) }

              { props.appendInnerIcon && (
                <VIcon
                  onClick={ attrs['onClick:appendInner'] }
                  icon={ props.appendInnerIcon }
                />
              ) }
            </div>
          ) }

          <div
            class={[
              'v-field__outline',
              textColorClasses.value,
            ]}
          >
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
      )
    })

    return {
      controlRef,
    }
  },
})

export type VField = InstanceType<typeof VField>

// TODO: this is kinda slow, might be better to implicitly inherit props instead
export function filterFieldProps (attrs: Record<string, unknown>) {
  return pick(attrs, Object.keys(VField.props))
}
