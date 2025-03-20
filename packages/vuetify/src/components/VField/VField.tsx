// Styles
import './VField.sass'

// Components
import { VFieldLabel } from './VFieldLabel'
import { VExpandXTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { useInputIcon } from '@/components/VInput/InputIcon'

// Composables
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { IconValue } from '@/composables/icons'
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { useRtl } from '@/composables/locale'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, ref, toRef, useId, watch } from 'vue'
import {
  animate,
  convertToUnit,
  EventProp,
  genericComponent,
  isOn,
  nullifyTransforms,
  pick,
  propsFactory,
  standardEasing,
  useRender,
} from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { LoaderSlotProps } from '@/composables/loader'
import type { GenericProps } from '@/util'

const allowedVariants = ['underlined', 'outlined', 'filled', 'solo', 'solo-inverted', 'solo-filled', 'plain'] as const
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
  centerAffix: {
    type: Boolean,
    default: undefined,
  },
  clearValue: {
    type: null,
    default: null,
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null,
  },
  error: Boolean,
  flat: Boolean,
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

  'onClick:clear': EventProp<[MouseEvent]>(),
  'onClick:appendInner': EventProp<[MouseEvent]>(),
  'onClick:prependInner': EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeLoaderProps(),
  ...makeRoundedProps(),
  ...makeThemeProps(),
}, 'VField')

export type VFieldSlots = {
  clear: DefaultInputSlot & { props: Record<string, any> }
  'prepend-inner': DefaultInputSlot
  'append-inner': DefaultInputSlot
  label: DefaultInputSlot & { label: string | undefined, props: Record<string, any> }
  loader: LoaderSlotProps
  default: VFieldSlot
}

export const VField = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VFieldSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VField',

  inheritAttrs: false,

  props: {
    id: String,

    ...makeFocusProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { themeClasses } = provideTheme(props)
    const { loaderClasses } = useLoader(props)
    const { focusClasses, isFocused, focus, blur } = useFocus(props)
    const { InputIcon } = useInputIcon(props)
    const { roundedClasses } = useRounded(props)
    const { rtlClasses } = useRtl()

    const isActive = computed(() => props.dirty || props.active)
    const hasLabel = computed(() => !!(props.label || slots.label))
    const hasFloatingLabel = computed(() => !props.singleLine && hasLabel.value)

    const uid = useId()
    const id = computed(() => props.id || `input-${uid}`)
    const messagesId = computed(() => `${id.value}-messages`)

    const labelRef = ref<VFieldLabel>()
    const floatingLabelRef = ref<VFieldLabel>()
    const controlRef = ref<HTMLElement>()
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'bgColor'))
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return props.error || props.disabled ? undefined
        : isActive.value && isFocused.value ? props.color
        : props.baseColor
    }))

    watch(isActive, val => {
      if (hasFloatingLabel.value) {
        const el: HTMLElement = labelRef.value!.$el
        const targetEl: HTMLElement = floatingLabelRef.value!.$el

        requestAnimationFrame(() => {
          const rect = nullifyTransforms(el)
          const targetRect = targetEl.getBoundingClientRect()

          const x = targetRect.x - rect.x
          const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

          const targetWidth = targetRect.width / 0.75
          const width = Math.abs(targetWidth - rect.width) > 1
            ? { maxWidth: convertToUnit(targetWidth) }
            : undefined

          const style = getComputedStyle(el)
          const targetStyle = getComputedStyle(targetEl)
          const duration = parseFloat(style.transitionDuration) * 1000 || 150
          const scale = parseFloat(targetStyle.getPropertyValue('--v-field-label-scale'))
          const color = targetStyle.getPropertyValue('color')

          el.style.visibility = 'visible'
          targetEl.style.visibility = 'hidden'

          animate(el, {
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            color,
            ...width,
          }, {
            duration,
            easing: standardEasing,
            direction: val ? 'normal' : 'reverse',
          }).finished.then(() => {
            el.style.removeProperty('visibility')
            targetEl.style.removeProperty('visibility')
          })
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
    }

    useRender(() => {
      const isOutlined = props.variant === 'outlined'
      const hasPrepend = !!(slots['prepend-inner'] || props.prependInnerIcon)
      const hasClear = !!(props.clearable || slots.clear) && !props.disabled
      const hasAppend = !!(slots['append-inner'] || props.appendInnerIcon || hasClear)
      const label = () => (
        slots.label
          ? slots.label({
            ...slotProps.value,
            label: props.label,
            props: { for: id.value },
          })
          : props.label
      )

      return (
        <div
          class={[
            'v-field',
            {
              'v-field--active': isActive.value,
              'v-field--appended': hasAppend,
              'v-field--center-affix': props.centerAffix ?? !isPlainOrUnderlined.value,
              'v-field--disabled': props.disabled,
              'v-field--dirty': props.dirty,
              'v-field--error': props.error,
              'v-field--flat': props.flat,
              'v-field--has-background': !!props.bgColor,
              'v-field--persistent-clear': props.persistentClear,
              'v-field--prepended': hasPrepend,
              'v-field--reverse': props.reverse,
              'v-field--single-line': props.singleLine,
              'v-field--no-label': !label(),
              [`v-field--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            focusClasses.value,
            loaderClasses.value,
            roundedClasses.value,
            rtlClasses.value,
            props.class,
          ]}
          style={[
            backgroundColorStyles.value,
            props.style,
          ]}
          onClick={ onClick }
          { ...attrs }
        >
          <div class="v-field__overlay" />

          <LoaderSlot
            name="v-field"
            active={ !!props.loading }
            color={ props.error ? 'error' : (typeof props.loading === 'string' ? props.loading : props.color) }
            v-slots={{ default: slots.loader }}
          />

          { hasPrepend && (
            <div key="prepend" class="v-field__prepend-inner">
              { props.prependInnerIcon && (
                <InputIcon
                  key="prepend-icon"
                  name="prependInner"
                />
              )}

              { slots['prepend-inner']?.(slotProps.value) }
            </div>
          )}

          <div class="v-field__field" data-no-activator="">
            {['filled', 'solo', 'solo-inverted', 'solo-filled'].includes(props.variant) && hasFloatingLabel.value && (
              <VFieldLabel
                key="floating-label"
                ref={ floatingLabelRef }
                class={[textColorClasses.value]}
                floating
                for={ id.value }
                style={ textColorStyles.value }
              >
                { label() }
              </VFieldLabel>
            )}

            { hasLabel.value && (
              <VFieldLabel key="label" ref={ labelRef } for={ id.value }>
                { label() }
              </VFieldLabel>
            )}

            { slots.default?.({
              ...slotProps.value,
              props: {
                id: id.value,
                class: 'v-field__input',
                'aria-describedby': messagesId.value,
              },
              focus,
              blur,
            } as VFieldSlot)}
          </div>

          { hasClear && (
            <VExpandXTransition key="clear">
              <div
                class="v-field__clearable"
                v-show={ props.dirty }
                onMousedown={ (e: MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
              <VDefaultsProvider
                defaults={{
                  VIcon: {
                    icon: props.clearIcon,
                  },
                }}
              >
                { slots.clear
                  ? slots.clear({
                    ...slotProps.value,
                    props: {
                      onFocus: focus,
                      onBlur: blur,
                      onClick: props['onClick:clear'],
                    },
                  })
                  : (
                    <InputIcon
                      name="clear"
                      onFocus={ focus }
                      onBlur={ blur }
                    />
                  )}
                </VDefaultsProvider>
              </div>
            </VExpandXTransition>
          )}

          { hasAppend && (
            <div key="append" class="v-field__append-inner">
              { slots['append-inner']?.(slotProps.value) }

              { props.appendInnerIcon && (
                <InputIcon
                  key="append-icon"
                  name="appendInner"
                />
              )}
            </div>
          )}

          <div
            class={[
              'v-field__outline',
              textColorClasses.value,
            ]}
            style={ textColorStyles.value }
          >
            { isOutlined && (
              <>
                <div class="v-field__outline__start" />

                { hasFloatingLabel.value && (
                  <div class="v-field__outline__notch">
                    <VFieldLabel ref={ floatingLabelRef } floating for={ id.value }>
                      { label() }
                    </VFieldLabel>
                  </div>
                )}

                <div class="v-field__outline__end" />
              </>
            )}

            { isPlainOrUnderlined.value && hasFloatingLabel.value && (
              <VFieldLabel ref={ floatingLabelRef } floating for={ id.value }>
                { label() }
              </VFieldLabel>
            )}
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
  const keys = Object.keys(VField.props).filter(k => !isOn(k) && k !== 'class' && k !== 'style')
  return pick(attrs, keys)
}
