// Styles
import './VField.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Utilities
import { defineComponent } from '@/util'

// Types

export default defineComponent({
  name: 'VField',

  props: {
    prependIcon: String,
    appendIcon: String,
  },

  emits: {
    'click:prepend': (e: Event) => e,
    'click:append': (e: Event) => e,
  },

  setup (props, { emit, slots }) {
    return () => {
      return (
        <div
          class={[
            'v-field',
          ]}
        >
          { (slots.prepend || props.prependIcon) && (
            <div
              class="v-field__prepend"
              onClick={ (e: Event) => emit('click:prepend', e) }
            >
              { slots.prepend
                ? slots.prepend()
                : (<VIcon icon={ props.prependIcon } />)
              }
            </div>
          ) }

          { slots.default && (
            <div class="v-field__control">
              { slots.default() }
            </div>
          ) }

          { (slots.append || props.appendIcon) && (
            <div
              class="v-field__append"
              onClick={ (e: Event) => emit('click:append', e) }
            >
              { slots.append
                ? slots.append()
                : (<VIcon icon={ props.appendIcon } />)
              }
            </div>
          ) }

          { slots.details && (
            <div class="v-field__details">
              { slots.details() }
            </div>
          ) }
        </div>
      )
    }
  },
})
