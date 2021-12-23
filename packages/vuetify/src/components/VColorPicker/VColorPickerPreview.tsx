// Styles
import './VColorPickerPreview.sass'

// Components
import { VSlider } from '@/components/VSlider'

// Utilities
import type { HSVA } from '../../util/colorUtils'
import { HSVAtoCSS } from '../../util/colorUtils'

// Types
import type { PropType } from 'vue'
import { defineComponent } from '@/util'

export const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',

  props: {
    color: {
      type: Object as PropType<HSVA | null>,
    },
    disabled: Boolean,
    hideAlpha: Boolean,
  },

  emits: {
    'update:color': (color: HSVA) => true,
  },

  setup (props, { emit }) {
    return () => (
      <div
        class={[
          'v-color-picker-preview',
          {
            'v-color-picker-preview--hide-alpha': props.hideAlpha,
          },
        ]}
      >
        <div class="v-color-picker-preview__dot">
          <div style={{ background: HSVAtoCSS(props.color ?? { h: 0, s: 0, v: 1, a: 1 }) }} />
        </div>
        <div class="v-color-picker-preview__sliders">
          <VSlider
            class="v-color-picker-preview__track v-color-picker-preview__hue"
            modelValue={ props.color?.h }
            onUpdate:modelValue={ h => emit('update:color', { ...(props.color ?? { h: 0, s: 0, v: 1, a: 1 }), h }) }
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
              modelValue={ props.color?.a }
              onUpdate:modelValue={ a => emit('update:color', { ...(props.color ?? { h: 0, s: 0, v: 1, a: 1 }), a }) }
              step={ 0 }
              min={ 0 }
              max={ 1 }
              disabled={ props.disabled }
              thumbSize={ 14 }
              trackSize={ 8 }
              trackFillColor="white"
              hideDetails
            />
          ) }
        </div>
      </div>
    )
  },
})
