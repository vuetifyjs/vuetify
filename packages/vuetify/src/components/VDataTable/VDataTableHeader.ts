import './VDataTableHeader.sass'

import Vue from 'vue'
import dedupeModelListeners from '../../util/dedupeModelListeners'
import rebuildSlots from '../../util/rebuildFunctionalSlots'

import VDataTableHeaderMobile from './VDataTableHeaderMobile'
import VDataTableHeaderDesktop from './VDataTableHeaderDesktop'

export default Vue.extend({
  name: 'v-data-table-header',

  functional: true,

  props: {
    mobile: Boolean,
  },

  render (h, { props, data, slots }) {
    dedupeModelListeners(data)
    const children = rebuildSlots(slots(), h)

    if (props.mobile) {
      return h(VDataTableHeaderMobile, data, children)
    } else {
      return h(VDataTableHeaderDesktop, data, children)
    }
  },
})
