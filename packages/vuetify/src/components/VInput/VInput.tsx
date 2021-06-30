// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Utilities
import { computed, defineComponent } from 'vue'
import { getUid, makeProps } from '@/util'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: makeProps({
    appendIcon: String,
    backgroundColor: {
      type: String,
      default: '',
    },
    dense: Boolean,
    height: [Number, String],
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hideSpinButtons: Boolean,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    persistentHint: Boolean,
    prependIcon: String,
    value: null as any as PropType<any>,
  }),

  setup (props, { attrs, slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)

    return () => {
      //

      return (
        <div
          class={[
            'v-input',
          ]}
        >
          { slots.default?.({}) }
        </div>
      )
    }
  },
})
