// Styles
import './VTextField.sass'

// Components
import { VInput } from '@/components/VInput'

// Directives
import { Resize } from '@/directives/resize'
import { Ripple } from '@/directives/ripple'

// Utilities
import { defineComponent } from 'vue'
import { makeProps } from '@/util'

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

  props: makeProps({
    appendOuterIcon: String,
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
  }),

  setup (props, { attrs, slots }) {
    return () => {
      return (
        <VInput
          v-slots={{
            default: () => {
              return (<input type="text" />)
            },
          }}
        />
      )
    }
  },
})
