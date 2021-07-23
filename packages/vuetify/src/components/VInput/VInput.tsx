// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'
import VInputLabel from './VInputLabel'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { cloneVNode, computed, ref, watch } from 'vue'
import { convertToUnit, defineComponent, getUid, roundEven, standardEasing } from '@/util'

// Types
import type { ComponentPublicInstance, PropType } from 'vue'
import { useSsrBoot } from '@/composables/ssrBoot'

function nullifyTransforms (el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const style = getComputedStyle(el)
  const tx = style.transform

  if (tx) {
    let ta, sx, sy, dx, dy
    if (tx.startsWith('matrix3d(')) {
      ta = tx.slice(9, -1).split(/, /)
      sx = +ta[0]
      sy = +ta[5]
      dx = +ta[12]
      dy = +ta[13]
    } else if (tx.startsWith('matrix(')) {
      ta = tx.slice(7, -1).split(/, /)
      sx = +ta[0]
      sy = +ta[3]
      dx = +ta[4]
      dy = +ta[5]
    } else {
      return rect
    }

    const to = style.transformOrigin
    const x = rect.x - dx - (1 - sx) * parseFloat(to)
    const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1))
    const w = sx ? rect.width / sx : el.offsetWidth
    const h = sy ? rect.height / sy : el.offsetHeight

    return {
      x, y, width: w, height: h, top: y, right: x + w, bottom: y + h, left: x,
    }
  } else {
    return rect
  }
}

export default defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    appendOuterIcon: String,
    backgroundColor: String,
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hideSpinButtons: Boolean,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    modelValue: null as any as PropType<any>,
    persistentHint: Boolean,
    prependIcon: String,
    prependOuterIcon: String,
    variant: {
      type: String,
      default: 'filled',
      // required: true,
    },

    ...makeThemeProps(),
    ...makeDensityProps(),
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-input')
    const value = useProxiedModel(props, 'modelValue')
    const uid = getUid()

    const labelRef = ref<InstanceType<typeof VInputLabel>>()
    const labelSizerRef = ref<InstanceType<typeof VInputLabel>>()
    const controlRef = ref<HTMLElement>()
    const fieldRef = ref<HTMLElement>()
    const isDirty = computed(() => (value.value != null && value.value !== ''))
    const isFocused = ref(false)
    const id = computed(() => props.id || `input-${uid}`)
    const hasState = computed(() => isFocused.value || isDirty.value)

    watch(hasState, val => {
      if (props.variant === 'outlined') {
        const el: HTMLElement = labelRef.value!.$el
        const targetEl: HTMLElement = labelSizerRef.value!.$el
        const rect = nullifyTransforms(el)
        const targetRect = targetEl.getBoundingClientRect()

        const x = targetRect.x - rect.x
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

        el.style.visibility = 'visible'
        targetEl.style.visibility = 'hidden'

        el.animate([
          { transform: 'translate(0)' },
          { transform: `translate(${x}px, ${y}px) scale(.75)` },
        ], {
          duration: 150,
          easing: standardEasing,
          direction: val ? 'normal' : 'reverse',
        }).finished.then(() => {
          el.style.removeProperty('visibility')
          targetEl.style.removeProperty('visibility')
        })
      }
    }, { flush: 'post' })

    return () => {
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
            'v-input',
            {
              'v-input--prepended': hasPrepend,
              'v-input--appended': hasAppend,
              'v-input--dirty': hasState.value,
              'v-input--focused': isFocused.value,
              [`v-input--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            densityClasses.value,
          ]}
          { ...attrs }
        >
          { hasPrependOuter && (
            <div
              class="v-input__prepend-outer"
            >
              { slots.prependOuter
                ? slots.prependOuter()
                : (<VIcon icon={ props.prependOuterIcon } />)
              }
            </div>
          ) }

          <div
            ref={ controlRef }
            class="v-input__control"
          >
            { hasPrepend && (
              <div
                class="v-input__prepend"
              >
                { slots.prepend
                  ? slots.prepend()
                  : (<VIcon icon={ props.prependIcon } />)
                }
              </div>
            ) }

            <div class="v-input__field" ref={ fieldRef }>
              <VInputLabel
                ref={ labelRef }
                for={ id.value }
              >
                { label }
              </VInputLabel>

              { slots.default?.({
                uid,
                props: {
                  id: id.value,
                  value: value.value,
                  onFocus: () => (isFocused.value = true),
                  onBlur: () => (isFocused.value = false),
                  onInput: (e: Event) => {
                    const el = e.target as HTMLInputElement

                    value.value = el.value
                  },
                  onChange: (e: Event) => {
                    const el = e.target as HTMLInputElement

                    if (value.value === el.value) return

                    value.value = el.value
                  },
                },
              }) }
            </div>

            { hasAppend && (
              <div class="v-input__append">
                { slots.append
                  ? slots.append()
                  : (<VIcon icon={ props.appendIcon } />)
                }
              </div>
            ) }

            <div class="v-input__outline">
              { isOutlined && (
                <>
                  <div class="v-input__outline__start" />

                  <div class="v-input__outline__notch">
                    <VInputLabel ref={ labelSizerRef } aria-hidden="true">
                      { label }
                    </VInputLabel>
                  </div>

                  <div class="v-input__outline__end" />
                </>
              ) }
            </div>
          </div>

          { hasAppendOuter && (
            <div
              class="v-input__append-outer"
            >
              { slots.appendOuter
                ? slots.appendOuter()
                : (<VIcon icon={ props.appendOuterIcon } />)
              }
            </div>
          ) }

          { slots.messages && (
            <div class="v-input__details">
              { slots.messages() }
            </div>
          ) }
        </div>
      )
    }
  },
})
