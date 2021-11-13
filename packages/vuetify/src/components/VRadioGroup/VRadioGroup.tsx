// Components
import { VSelectionControlGroup } from '../VSelectionControlGroup'

// Utility
import { defineComponent } from 'vue'
import { useRender } from '@/util'

export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: {
    column: {
      type: Boolean,
      default: true,
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
    onIcon: {
      type: String,
      default: '$radioOn',
    },
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    row: Boolean,
    type: {
      type: String,
      default: 'radio',
    },
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    useRender(() => (
      <VSelectionControlGroup
        class={[
          'v-radio-group',
          {
            'v-radio-group--column': props.column && !props.row,
            'v-radio-group--row': props.row,
          },
        ]}
        onIcon={ props.onIcon }
        offIcon={ props.offIcon }
        type={ props.type }
        role="radiogroup"
        v-slots={ slots }
      />
    ))

    return {}
  },
})
