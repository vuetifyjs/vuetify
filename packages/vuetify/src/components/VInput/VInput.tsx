// Styles
import './VInput.sass'

// Components
import { VMessages } from '@/components/VMessages'

// Utilities
import { defineComponent } from '@/util'
import { VIcon } from '@/components/VIcon'
import { makeDensityProps, useDensity } from '@/composables/density'

// Types
import type { PropType } from 'vue'

export const VInput = defineComponent({
  name: 'VInput',

  props: {
    appendIcon: String,
    prependIcon: String,
    focused: Boolean,
    // TODO: implement auto
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hint: String,
    messages: {
      type: [Array, String],
      default: () => ([]),
    },
    persistentHint: Boolean,

    ...makeDensityProps(),
  },

  emits: {
    'click:prepend': (e: MouseEvent) => true,
    'click:append': (e: MouseEvent) => true,
  },

  setup (props, { slots, emit }) {
    const { densityClasses } = useDensity(props, 'v-input')

    return () => {
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const hasHint = !!(slots.hint || props.hint)
      const hasMessages = !!(slots.messages || props.messages?.length)
      const hasDetails = !props.hideDetails && (hasMessages || hasHint)
      const showMessages = hasMessages || (
        hasHint &&
        (props.persistentHint || props.focused)
      )

      return (
        <div class={[
          'v-input',
          densityClasses.value,
        ]}
        >
          { hasPrepend && (
            <div
              class="v-input__prepend"
              onClick={ e => emit('click:prepend', e) }
            >
              { slots?.prepend?.() }

              { props.prependIcon && (
                <VIcon icon={ props.prependIcon } />
              ) }
            </div>
          ) }

          { slots.default?.() }

          { hasAppend && (
            <div
              class="v-input__append"
              onClick={ e => emit('click:append', e) }
            >
              { slots?.append?.() }

              { props.appendIcon && (
                <VIcon icon={ props.appendIcon } />
              ) }
            </div>
          ) }

          { hasDetails && (
            <div class="v-input__details">
              <VMessages
                active={ showMessages }
                value={ hasMessages ? props.messages : [props.hint] }
                v-slots={{ default: slots.messages }}
              />

              { slots.details?.() }
            </div>
          ) }
        </div>
      )
    }
  },
})

/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type VInput = InstanceType<typeof VInput>
