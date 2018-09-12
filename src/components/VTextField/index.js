import VTextField from './VTextField'
import VTextarea from '../VTextarea/VTextarea'
import rebuildSlots from '../../util/rebuildFunctionalSlots'
import dedupeModelListeners from '../../util/dedupeModelListeners'
import { deprecate } from '../../util/console'

// TODO: remove this in v2.0
/* @vue/component */
const wrapper = {
  functional: true,

  $_wrapperFor: VTextField,

  props: {
    textarea: Boolean,
    multiLine: Boolean
  },

  render (h, { props, data, slots, parent }) {
    dedupeModelListeners(data)

    const children = rebuildSlots(slots(), h)

    if (props.textarea) {
      deprecate('<v-text-field textarea>', '<v-textarea outline>', wrapper, parent)
    }

    if (props.multiLine) {
      deprecate('<v-text-field multi-line>', '<v-textarea>', wrapper, parent)
    }

    if (props.textarea || props.multiLine) {
      data.attrs.outline = props.textarea
      return h(VTextarea, data, children)
    } else {
      return h(VTextField, data, children)
    }
  }
}

export { wrapper as VTextField }
export default wrapper
