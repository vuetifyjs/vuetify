// Components
import { VBtn } from '@/components/VBtn'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VAppBarNavIcon',

  props: {
    icon: {
      type: String,
      default: '$menu',
    },
  },

  setup (props, { slots }) {
    return () => (
      <VBtn class="v-app-bar-nav-icon" icon={ props.icon }>
        { slots.default?.() }
      </VBtn>
    )
  },

  // functional: true,

  // render (h, { slots, listeners, props, data }) {
  //   const d = Object.assign(data, {
  //     staticClass: (`v-app-bar__nav-icon ${data.staticClass || ''}`).trim(),
  //     props: {
  //       ...props,
  //       icon: true,
  //     },
  //     on: listeners,
  //   })

  //   const defaultSlot = slots().default

  //   return h(VBtn, d, defaultSlot || [h(VIcon, '$menu')])
  // },
})
