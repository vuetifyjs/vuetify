// Styles
import './VColorPickerSwatches.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { useRovingFocus } from '@vuetify/v0'
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
    const swatchElements = new Map<string, HTMLElement>()
    const swatchItems = () => props.swatches.flatMap((swatch, row) => swatch.map((_, column) => {
      const id = `${row}-${column}`

      return {
        id,
        el: swatchElements.get(id),
        disabled: props.disabled,
      }
    }))
    const rovingFocus = useRovingFocus(swatchItems)

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

      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        return
      }

      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return

      const currentSwatch = event.currentTarget as HTMLElement
      const swatches = currentSwatch.closest('.v-color-picker-swatches')
        ?.querySelectorAll<HTMLElement>('.v-color-picker-swatches__color:not(.v-color-picker-swatches__color--disabled)')
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
      const nextId = swatchItems().find(item => item.el === nextSwatch)?.id
      if (nextId) rovingFocus.focus(nextId)
    }

    function onSwatchKeyup (event: KeyboardEvent, hsva: HSV) {
      if (event.key === ' ' || event.code === 'Space') {
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
        <div>
          { props.swatches.map((swatch, row) => (
            <div class="v-color-picker-swatches__swatch">
              { swatch.map((color, column) => {
                const rgba = parseColor(color)
                const hsva = RGBtoHSV(rgba)
                const background = RGBtoCSS(rgba)
                const isSelected = !!props.color && deepEqual(props.color, hsva)
                const id = `${row}-${column}`

                return (
                  <div
                    ref={ element => {
                      if (element instanceof HTMLElement) {
                        swatchElements.set(id, element)
                      } else {
                        swatchElements.delete(id)
                      }
                    }}
                    class={[
                      'v-color-picker-swatches__color',
                      {
                        'v-color-picker-swatches__color--disabled': props.disabled,
                      },
                    ]}
                    role="button"
                    tabindex={ rovingFocus.isTabbable(id) && !props.disabled ? 0 : -1 }
                    aria-label={ background }
                    aria-pressed={ isSelected }
                    aria-disabled={ props.disabled || props.readonly || undefined }
                    onFocus={ () => { rovingFocus.focusedId.value = id } }
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
