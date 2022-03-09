// Styles
import './VColorPickerEdit.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'
import { modes } from './util'

// Types
import type { PropType } from 'vue'
import type { HSVA } from '@/util/colorUtils'

const VColorPickerInput = ({ label, ...rest }: any) => {
  return (
    <div
      class="v-color-picker-edit__input"
    >
      <input {...rest} />
      <span>{ label }</span>
    </div>
  )
}

export const VColorPickerEdit = defineComponent({
  name: 'VColorPickerEdit',

  props: {
    color: Object as PropType<HSVA | null>,
    disabled: Boolean,
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
  },

  emits: {
    'update:color': (color: HSVA) => true,
    'update:mode': (mode: string) => true,
  },

  setup (props, { emit }) {
    const enabledModes = computed(() => {
      return props.modes.map(key => ({ ...modes[key], name: key }))
    })

    const inputs = computed(() => {
      const mode = enabledModes.value.find(m => m.name === props.mode)

      if (!mode) return []

      const color = props.color ? mode.to(props.color) : {}

      return mode.inputs?.map(({ getValue, getColor, ...inputProps }) => {
        return {
          ...mode.inputProps,
          ...inputProps,
          disabled: props.disabled,
          value: getValue(color),
          onChange: (e: InputEvent) => {
            const target = e.target as HTMLInputElement | null

            if (!target) return

            emit('update:color', mode.from(getColor(color, target.value)))
          },
        }
      })
    })

    return () => (
      <div
        class="v-color-picker-edit"
      >
        { inputs.value?.map(props => (
          <VColorPickerInput {...props} />
        )) }
        { enabledModes.value.length > 1 && (
          <VBtn
            icon="$unfold"
            size="x-small"
            variant="plain"
            onClick={ () => {
              const mi = enabledModes.value.findIndex(m => m.name === props.mode)

              emit('update:mode', enabledModes.value[(mi + 1) % enabledModes.value.length].name)
            } }
          />
        ) }
      </div>
    )
  },
})
