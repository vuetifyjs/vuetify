// Styles
import './VTextField.sass'

// Components
import { VInput } from '@/components/VInput'
import { VIcon } from '@/components/VIcon'

// Directives
import { Resize } from '@/directives/resize'
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export default defineComponent({
  name: 'VTextField',

  directives: {
    Resize,
    Ripple,
  },

  inheritAttrs: false,

  props: {
    autofocus: Boolean,
    clearable: Boolean,
    clearIcon: {
      type: String,
      default: '$clear',
    },
    counter: [Boolean, Number, String],
    counterValue: Function as PropType<(value: any) => number>,
    filled: Boolean,
    flat: Boolean,
    fullWidth: Boolean,
    label: String,
    outlined: Boolean,
    placeholder: String,
    prefix: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
    persistentPlaceholder: Boolean,
    reverse: Boolean,
    rounded: Boolean,
    shaped: Boolean,
    singleLine: Boolean,
    solo: Boolean,
    soloInverted: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },
  },

  setup (props, { attrs, slots }) {
    return () => {
      return (
        <VInput
          { ...attrs }
          v-slots={{
            default: ({ props: slotProps }) => {
              return (
                <>
                  { props.prependInnerIcon && (
                    <VIcon icon={ props.prependInnerIcon } />
                  )}
                  <input type="text" { ...slotProps } />
                  { props.appendInnerIcon && (
                    <VIcon icon={ props.appendInnerIcon } />
                  )}
                </>
              )
            },
          }}
        />
      )
    }
  },
})
