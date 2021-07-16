// Composables
import { makeTagProps } from '@/composables/tag'
// import { useGroup } from '@/composables/group'

// Directives
import { TouchDirectiveBinding } from '@/directives/touch'

// Styles
import './VWindow.sass'

// Utilities
import { defineComponent, PropType, withDirectives } from 'vue'
import { makeProps, useDirective } from '@/util'
import { TouchHandlers } from 'vuetify/types'

// const VWindowSymbol = Symbol.for('vuetify:v-window')

export default defineComponent({
  name: 'VWindow',

  props: makeProps({
    activeClass: {
      type: String,
      default: 'v-window-item--active',
    },
    continuous: Boolean,
    mandatory: {
      type: Boolean,
      default: true,
    },
    nextIcon: {
      type: [Boolean, String],
      default: '$next',
    },
    prevIcon: {
      type: [Boolean, String],
      default: '$prev',
    },
    reverse: Boolean,
    showArrows: Boolean,
    showArrowsOnHover: Boolean,
    touch: Object as PropType<TouchHandlers>,
    touchless: Boolean,
    value: {
      required: false,
    },
    vertical: Boolean,

    ...makeTagProps(),
  }),

  setup (props, ctx) {
    // const { next, prev } = useGroup(props, VWindowSymbol) // I'm not sure if this inject key arg is correct.

    return () => withDirectives(
      <props.tag class="v-window">
        { ctx.slots.default?.() }
      </props.tag>,
      useDirective<TouchDirectiveBinding>({
        value: props.touch,
      }),
    )
  },
})
