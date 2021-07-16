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
import { ref } from 'vue'

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
    fullWidth: Boolean,
    prefix: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
    persistentPlaceholder: Boolean,
    reverse: Boolean,
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
          class={[
            'v-text-field',
          ]}
          { ...attrs }
          v-slots={{
            default: ({ props: slotProps = {} }) => {
              return (
                <>
                  { props.prependInnerIcon && (
                    <VIcon icon={ props.prependInnerIcon } />
                  ) }

                  <input
                    type={ props.type }
                    { ...slotProps }
                  />

                  { props.appendInnerIcon && (
                    <VIcon icon={ props.appendInnerIcon } />
                  ) }
                </>
              )
            },
            // label: ({ label, props }) => {
            //   return (
            //     <label
            //       class="v-label"
            //       { ...props }
            //     >
            //       { label }
            //     </label>
            //   )
            // },
          }}
        />
      )
    }
  },
})
