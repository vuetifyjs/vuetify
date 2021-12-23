// Styles
import './VColorPicker.sass'

// Components
import { VSheet } from '@/components/VSheet'
import { VColorPickerPreview } from './VColorPickerPreview'
import { VColorPickerCanvas } from './VColorPickerCanvas'
import { VColorPickerEdit } from './VColorPickerEdit'
import { VColorPickerSwatches } from './VColorPickerSwatches'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeElevationProps } from '@/composables/elevation'
import { makeRoundedProps } from '@/composables/rounded'
import { makeThemeProps } from '@/composables/theme'

// Utilities
import { onMounted, ref } from 'vue'
import { defineComponent, HSVAtoCSS } from '@/util'
import { extractColor, modes, parseColor } from './util'

// Types
import type { PropType } from 'vue'
import type { HSVA } from '@/util'

export const VColorPicker = defineComponent({
  name: 'VColorPicker',

  inheritAttrs: false,

  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150,
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10,
    },
    hideCanvas: Boolean,
    hideSliders: Boolean,
    hideInputs: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: (v: string) => Object.keys(modes).includes(v),
    },
    modes: {
      type: Array as PropType<string[]>,
      default: () => Object.keys(modes),
      validator: (v: any) => Array.isArray(v) && v.every(m => Object.keys(modes).includes(m)),
    },
    showSwatches: Boolean,
    swatches: Array as PropType<string[][]>,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150,
    },
    modelValue: {
      type: [Object, String] as PropType<Record<string, unknown> | string | undefined | null>,
    },
    width: {
      type: [Number, String],
      default: 300,
    },

    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeThemeProps(),
  },

  emits: {
    'update:modelValue': (color: any) => true,
    'update:mode': (mode: string) => true,
  },

  setup (props) {
    const mode = useProxiedModel(props, 'mode')
    const lastPickedColor = ref<HSVA | null>(null)
    const currentColor = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => {
        let c = parseColor(v)

        if (!c) return null

        if (lastPickedColor.value) {
          c = { ...c, h: lastPickedColor.value.h }
          lastPickedColor.value = null
        }

        return c
      },
      v => {
        if (!v) return null

        return extractColor(v, props.modelValue)
      }
    )

    const updateColor = (hsva: HSVA) => {
      currentColor.value = hsva
      lastPickedColor.value = hsva
    }

    onMounted(() => {
      if (!props.modes.includes(mode.value)) mode.value = props.modes[0]
    })

    return () => (
      <VSheet
        rounded={ props.rounded }
        elevation={ props.elevation }
        theme={ props.theme }
        class={[
          'v-color-picker',
        ]}
        style={{
          '--v-color-picker-color-hsv': HSVAtoCSS({ ...(currentColor.value ?? { h: 0, s: 0, v: 1, a: 1 }), a: 1 }),
        }}
        maxWidth={ props.width }
      >
        { !props.hideCanvas && (
          <VColorPickerCanvas
            color={ currentColor.value }
            onUpdate:color={ updateColor }
            disabled={ props.disabled }
            dotSize={ props.dotSize }
            width={ props.width }
            height={ props.canvasHeight }
          />
        ) }
        { (!props.hideSliders || !props.hideInputs) && (
          <div class="v-color-picker__controls">
            { !props.hideSliders && (
              <VColorPickerPreview
                color={ currentColor.value }
                onUpdate:color={ updateColor }
                hideAlpha={ !mode.value.endsWith('a') }
                disabled={ props.disabled }
              />
            ) }
            { !props.hideInputs && (
              <VColorPickerEdit
                modes={ props.modes }
                mode={ mode.value }
                onUpdate:mode={ m => mode.value = m }
                color={ currentColor.value }
                onUpdate:color={ updateColor }
                disabled={ props.disabled }
              />
            ) }
          </div>
        ) }
        { props.showSwatches && (
          <VColorPickerSwatches
            color={ currentColor.value }
            onUpdate:color={ updateColor }
            maxHeight={ props.swatchesMaxHeight }
            swatches={ props.swatches }
            disabled={ props.disabled }
          />
        ) }
      </VSheet>
    )
  },
})
