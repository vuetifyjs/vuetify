// Styles
import './VColorPickerSwatches.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useColumnFocus } from './columnFocus'
import { makeComponentProps } from '@/composables/component'
import { useRtl } from '@/composables/locale'

// Utilities
import { toRef } from 'vue'
import {
  convertToUnit,
  deepEqual,
  defineComponent,
  getContrast,
  parseColor,
  propsFactory,
  RGBtoCSS,
  RGBtoHSV,
  useRender,
} from '@/util'
import colors from '@/util/colors'

// Types
import type { DeepReadonly, PropType } from 'vue'
import type { Color, HSV } from '@/util'

export const makeVColorPickerSwatchesProps = propsFactory({
  swatches: {
    type: Array as PropType<DeepReadonly<Color[][]>>,
    default: () => parseDefaultColors(colors),
  },
  disabled: Boolean,
  readonly: Boolean,
  color: Object as PropType<HSV | null>,
  maxHeight: [Number, String],

  ...makeComponentProps(),
}, 'VColorPickerSwatches')

function parseDefaultColors (colors: Record<string, Record<string, string>>) {
  return Object.keys(colors).map(key => {
    const color = colors[key]
    return color.base ? [
      color.base,
      color.darken4,
      color.darken3,
      color.darken2,
      color.darken1,
      color.lighten1,
      color.lighten2,
      color.lighten3,
      color.lighten4,
      color.lighten5,
    ] : [
      color.black,
      color.white,
      color.transparent,
    ]
  })
}

export const VColorPickerSwatches = defineComponent({
  name: 'VColorPickerSwatches',

  props: makeVColorPickerSwatchesProps(),

  emits: {
    'update:color': (color: HSV) => true,
  },

  setup (props, { emit }) {
    const isInteractive = toRef(() => !props.disabled && !props.readonly)
    const { isRtl } = useRtl()
    const columnFocus = useColumnFocus(() => props.swatches.map(swatch => swatch.length), {
      disabled: () => props.disabled,
      rtl: isRtl,
    })

    function onSwatchClick (hsva: HSV) {
      if (!isInteractive.value || !hsva) {
        return
      }

      emit('update:color', hsva)
    }

    function onSwatchKeydown (event: KeyboardEvent, hsva: HSV) {
      if (event.key === 'Enter') {
        event.preventDefault()
        onSwatchClick(hsva)
        return
      }

      if (event.key === ' ') {
        event.preventDefault()
      }
    }

    function onSwatchKeyup (event: KeyboardEvent, hsva: HSV) {
      if (event.key === ' ') {
        onSwatchClick(hsva)
      }
    }

    useRender(() => (
      <div
        class={[
          'v-color-picker-swatches',
          props.class,
        ]}
        style={[
          { maxHeight: convertToUnit(props.maxHeight) },
          props.style,
        ]}
      >
        <div ref={ columnFocus.containerEl } onKeydown={ columnFocus.onKeydown }>
          { props.swatches.map((swatch, column) => (
            <div class="v-color-picker-swatches__swatch">
              { swatch.map((color, row) => {
                const rgba = parseColor(color)
                const hsva = RGBtoHSV(rgba)
                const background = RGBtoCSS(rgba)
                const isSelected = !!props.color && deepEqual(props.color, hsva)

                return (
                  <div
                    ref={ columnFocus.register(column, row) }
                    class={[
                      'v-color-picker-swatches__color',
                      {
                        'v-color-picker-swatches__color--disabled': props.disabled,
                      },
                    ]}
                    role="button"
                    tabindex={ columnFocus.isTabbable(column, row) && !props.disabled ? 0 : -1 }
                    aria-label={ background }
                    aria-pressed={ isSelected }
                    aria-disabled={ props.disabled || props.readonly || undefined }
                    onFocus={ () => columnFocus.onFocus(column, row) }
                    onKeydown={ (event: KeyboardEvent) => onSwatchKeydown(event, hsva) }
                    onKeyup={ (event: KeyboardEvent) => onSwatchKeyup(event, hsva) }
                    onClick={ () => onSwatchClick(hsva) }
                  >
                    <div style={{ background }}>
                      { isSelected
                        ? <VIcon size="x-small" icon="$success" color={ getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black' } />
                        : undefined
                      }
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    ))

    return {}
  },
})

export type VColorPickerSwatches = InstanceType<typeof VColorPickerSwatches>
