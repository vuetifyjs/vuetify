// Styles
import './VColorPickerPreview.sass'

// Components
import { VSlider } from '@/components/VSlider'

// Utilities
import { defineComponent, HSVtoCSS, useRender } from '@/util'
import { nullColor } from './util'

// Types
import type { PropType } from 'vue'
import type { HSV } from '@/util'

export const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',

  props: {
    color: {
      type: Object as PropType<HSV | null>,
    },
    disabled: Boolean,
    hideAlpha: Boolean,
  },

  emits: {
    'update:color': (color: HSV) => true,
  },

  setup (props, { emit }) {
    useRender(() => (
      <div
        class={[
          'v-color-picker-preview',
          {
            'v-color-picker-preview--hide-alpha': props.hideAlpha,
          },
        ]}
      >
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
