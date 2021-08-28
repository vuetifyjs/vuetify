import './VInput.sass'

// Utilities
import { defineComponent } from '@/util'
import { VIcon } from '@/components/VIcon'
import { makeDensityProps, useDensity } from '@/composables/density'

export const VInput = defineComponent({
  name: 'VInput',

  props: {
    appendIcon: String,
    prependIcon: String,

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

          { slots.details && (
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
