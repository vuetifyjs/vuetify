// Styles
import './VColorPickerPreview.sass'

// Components
import { VSlider } from '@/components/VSlider'

// Composables
import { makeComponentProps } from '@/composables/component'

// Utilities
import { nullColor } from './util'
import { defineComponent, HSVtoCSS, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { HSV } from '@/util'

export const makeVColorPickerPreviewProps = propsFactory({
  color: {
    type: Object as PropType<HSV | null>,
  },
  disabled: Boolean,
  hideAlpha: Boolean,

  ...makeComponentProps(),
}, 'v-color-picker-preview')

export const VColorPickerPreview = defineComponent({
  name: 'VColorPickerPreview',

  props: makeVColorPickerPreviewProps(),

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
          props.class,
        ]}
        style={ props.style }
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
