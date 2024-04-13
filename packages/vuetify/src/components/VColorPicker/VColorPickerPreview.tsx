// Styles
import './VColorPickerPreview.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VSlider } from '@/components/VSlider'

// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { onUnmounted } from 'vue'
import { nullColor } from './util'
import {
  defineComponent,
  HexToHSV,
  HSVtoCSS,
  propsFactory,
  SUPPORTS_EYE_DROPPER,
  useRender,
} from '@/util'

// Types
import type { PropType } from 'vue'
import type { Hex, HSV } from '@/util'

export const makeVColorPickerPreviewProps = propsFactory({
  color: {
    type: Object as PropType<HSV | null>,
  },
  disabled: Boolean,
  hideAlpha: Boolean,

  ...makeComponentProps(),
}, 'VColorPickerPreview')

export const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',

  props: makeVColorPickerPreviewProps(),

  emits: {
    'update:color': (color: HSV) => true,
  },

  setup (props, { emit }) {
    const abortController = new AbortController()

    onUnmounted(() => abortController.abort())

    async function openEyeDropper () {
      if (!SUPPORTS_EYE_DROPPER) return

      const eyeDropper = new window.EyeDropper()
      try {
        const result = await eyeDropper.open({ signal: abortController.signal })
        const colorHexValue = HexToHSV(result.sRGBHex as Hex)
        emit('update:color', { ...(props.color ?? nullColor), ...colorHexValue })
      } catch (e) {}
    }

    useRender(() => (
      <div
        class={[
          'v-color-picker-preview',
          {
            'v-color-picker-preview--hide-alpha': props.hideAlpha,
          },
          props.class,
        ]}
        style={ props.style }
      >
        { SUPPORTS_EYE_DROPPER && (
          <div class="v-color-picker-preview__eye-dropper" key="eyeDropper">
            <VBtn onClick={ openEyeDropper } icon="$eyeDropper" variant="plain" density="comfortable" />
          </div>
        )}

        <div class="v-color-picker-preview__dot">
          <div style={{ background: HSVtoCSS(props.color ?? nullColor) }} />
        </div>

        <div class="v-color-picker-preview__sliders">
          <VSlider
            class="v-color-picker-preview__track v-color-picker-preview__hue"
            modelValue={ props.color?.h }
            onUpdate:modelValue={ h => emit('update:color', { ...(props.color ?? nullColor), h }) }
            step={ 0 }
            min={ 0 }
            max={ 360 }
            disabled={ props.disabled }
            thumbSize={ 14 }
            trackSize={ 8 }
            trackFillColor="white"
            hideDetails
          />

          { !props.hideAlpha && (
            <VSlider
              class="v-color-picker-preview__track v-color-picker-preview__alpha"
              modelValue={ props.color?.a ?? 1 }
              onUpdate:modelValue={ a => emit('update:color', { ...(props.color ?? nullColor), a }) }
              step={ 1 / 256 }
              min={ 0 }
              max={ 1 }
              disabled={ props.disabled }
              thumbSize={ 14 }
              trackSize={ 8 }
              trackFillColor="white"
              hideDetails
            />
          )}
        </div>
      </div>
    ))

    return {}
  },
})

export type VColorPickerPreview = InstanceType<typeof VColorPickerPreview>
