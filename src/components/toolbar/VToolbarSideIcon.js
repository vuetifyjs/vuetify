import VBtn from '~components/buttons/VBtn'
import VIcon from '~components/icons/VIcon'

export default {
  name: 'v-toolbar-side-icon',

  functional: true,

  render (h, { slots, listeners }) {
    const data = {
      staticClass: 'toolbar__side-icon',
      props: {
        icon: true
      },
      on: listeners
    }

    const defaultSlot = slots().default

    return h(VBtn, data, defaultSlot || [h(VIcon, 'menu')])
  }
}
