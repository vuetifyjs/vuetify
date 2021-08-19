import './VInput.sass'

// Utilities
import { defineComponent } from '@/util'
import type { PropType } from 'vue'
import { VIcon } from '@/components'
import { makeDensityProps, useDensity } from '@/composables/density'

export const VInput = defineComponent({
  name: 'VInput',

  props: {
    appendIcon: String,
    prependIcon: String,
    // TODO: implement auto
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,

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
      const hasDetails = (slots.details && !props.hideDetails)

      return (
        <div class={[
          'v-input',
          {
            'v-input--has-details': hasDetails,
            'v-input--hide-details': props.hideDetails,
          },
          densityClasses.value,
        ]}
        >
          { hasPrepend && (
            <div
              class="v-input__prepend"
              onClick={ e => emit('click:prepend', e) }
            >
              { slots.prepend
                ? slots.prepend()
                : (<VIcon icon={ props.prependIcon } />)
              }
            </div>
          ) }

          { slots.default?.() }

          { hasAppend && (
            <div
              class="v-input__append"
              onClick={ e => emit('click:append', e) }
            >
              { slots.append
                ? slots.append()
                : (<VIcon icon={ props.appendIcon } />)
              }
            </div>
          ) }

          { hasDetails && (
            <div class="v-input__details">
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
