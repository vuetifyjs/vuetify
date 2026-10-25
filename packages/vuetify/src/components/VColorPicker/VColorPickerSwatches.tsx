// Styles
import './VColorPickerSwatches.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { makeComponentProps } from '@/composables/component'

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

    function onSwatchClick (hsva: HSV) {
      if (!isInteractive.value || !hsva) {
        return
      }

      emit('update:color', hsva)
    }

    function onSwatchKeydown (event: KeyboardEvent) {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return

      const currentSwatch = event.currentTarget as HTMLButtonElement
      const swatches = currentSwatch.closest('.v-color-picker-swatches')
        ?.querySelectorAll<HTMLButtonElement>('.v-color-picker-swatches__color:not(:disabled)')
      if (!swatches?.length) return

      const currentRect = currentSwatch.getBoundingClientRect()
      const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight'
      const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
      const currentPrimary = horizontal ? currentRect.x : currentRect.y
      const currentSecondary = horizontal ? currentRect.y : currentRect.x
      const candidates = Array.from(swatches)
        .filter(swatch => swatch !== currentSwatch)
        .map(swatch => {
          const rect = swatch.getBoundingClientRect()
          const primary = horizontal ? rect.x : rect.y
          const secondary = horizontal ? rect.y : rect.x

          return {
            swatch,
            primaryDistance: forward ? primary - currentPrimary : currentPrimary - primary,
            secondaryDistance: Math.abs(secondary - currentSecondary),
          }
        })
        .filter(candidate => candidate.primaryDistance > 0)
        .sort((a, b) => a.secondaryDistance - b.secondaryDistance || a.primaryDistance - b.primaryDistance)
      const nextSwatch = candidates[0]?.swatch

      if (!nextSwatch) return

      event.preventDefault()
      nextSwatch.focus()
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
        <div>
          { props.swatches.map(swatch => (
            <div class="v-color-picker-swatches__swatch">
              { swatch.map(color => {
                const rgba = parseColor(color)
                const hsva = RGBtoHSV(rgba)
                const background = RGBtoCSS(rgba)
                const isSelected = !!props.color && deepEqual(props.color, hsva)

                return (
                  <button
                    type="button"
                    class={[
                      'v-color-picker-swatches__color',
                      {
                        'v-color-picker-swatches__color--disabled': props.disabled,
                      },
                    ]}
                    aria-label={ background }
                    aria-pressed={ isSelected }
                    aria-disabled={ props.readonly || undefined }
                    disabled={ props.disabled }
                    onKeydown={ onSwatchKeydown }
                    onClick={ () => onSwatchClick(hsva) }
                  >
                    <div style={{ background }}>
                      { isSelected
                        ? <VIcon size="x-small" icon="$success" color={ getContrast(color, '#FFFFFF') > 2 ? 'white' : 'black' } />
                        : undefined
                      }
                    </div>
                  </button>
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
