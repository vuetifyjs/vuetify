import VBtn from '../buttons/VBtn'
import VIcon from '../icons/VIcon'

export default {
  name: 'v-toolbar-side-icon',

  functional: true,

  render (h, { slots, listeners, props }) {
    const data = {
      staticClass: 'toolbar__side-icon',
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    }

    const defaultSlot = slots().default

    return h(VBtn, data, defaultSlot || [h(VIcon, 'menu')])
  }
}
