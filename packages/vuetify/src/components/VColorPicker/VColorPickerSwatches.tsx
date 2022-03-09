// Styles
import './VColorPickerSwatches.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Utilities
import { convertToUnit, deepEqual, defineComponent, getContrast } from '@/util'
import colors from '@/util/colors'
import { parseColor } from './util'

// Types
import type { PropType } from 'vue'
import type { HSVA } from '@/util'

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

  props: {
    swatches: {
      type: Array as PropType<string[][]>,
      default: () => parseDefaultColors(colors),
    },
    disabled: Boolean,
    color: Object as PropType<HSVA | null>,
    maxHeight: [Number, String],
  },

  emits: {
    'update:color': (color: HSVA) => true,
  },

  setup (props, { emit }) {
    return () => (
      <div
        class="v-color-picker-swatches"
        style={{
          maxHeight: convertToUnit(props.maxHeight),
        }}
      >
        <div>
          { props.swatches.map(swatch => (
            <div class="v-color-picker-swatches__swatch">
              { swatch.map(color => {
                const hsva = parseColor(color)

                return (
                  <div
                    class="v-color-picker-swatches__color"
                    onClick={() => hsva && emit('update:color', hsva)}
                  >
                    <div style={{ background: color }}>
                      { props.color && deepEqual(props.color, hsva)
                        ? <VIcon size="x-small" icon="$success" color={getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black' } />
                        : undefined
                      }
                    </div>
                  </div>
                )
              }) }
            </div>
          ))}
        </div>
      </div>
    )
  },
})
