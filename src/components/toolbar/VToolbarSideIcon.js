import VBtn from '../buttons/VBtn'
import VIcon from '../icons/VIcon'

export default {
  name: 'v-toolbar-side-icon',

  functional: true,

  render (h, { slots, listeners, props, data }) {
    const classes = data.staticClass
     ? `${data.staticClass} toolbar__side-icon`
     : 'toolbar__side-icon'

    const d = {
      staticClass: classes,
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    }

    const defaultSlot = slots().default

    return h(VBtn, d, defaultSlot || [h(VIcon, 'menu')])
  }
}
