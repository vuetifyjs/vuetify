import VSelect from './VSelect'
import VOverflowBtn from '../VOverflowBtn'
import VAutocomplete from '../VAutocomplete'
import rebuildSlots from '../../util/rebuildFunctionalSlots'
import { deprecate } from '../../util/console'

const wrapper = {
  functional: true,

  $_wrapperFor: VSelect,

  props: {
    // VAutoComplete
    autocomplete: Boolean,
    combobox: Boolean,
    tags: Boolean,

    // VOverflowBtn
    editable: Boolean,
    overflow: Boolean,
    segmented: Boolean
  },

  render (h, { props, data, slots, parent }) {
    const children = rebuildSlots(slots(), h)

    if (props.autocomplete) {
      deprecate('<v-select autocomplete>', '<v-autocomplete>', wrapper, parent)
    }
    if (props.combobox) {
      deprecate('<v-select combobox>', '<v-autocomplete combobox>', wrapper, parent)
    }
    if (props.tags) {
      deprecate('<v-select tags>', '<v-autocomplete tags>', wrapper, parent)
    }

    if (props.overflow) {
      deprecate('<v-select overflow>', '<v-overflow-btn>', wrapper, parent)
    }
    if (props.segmented) {
      deprecate('<v-select segmented>', '<v-overflow-btn segmented>', wrapper, parent)
    }
    if (props.editable) {
      deprecate('<v-select editable>', '<v-overflow-btn editable>', wrapper, parent)
    }

    if (props.autocomplete || props.combobox || props.tags) {
      data.attrs.combobox = props.combobox
      data.attrs.tags = props.tags
      return h(VAutocomplete, data, children)
    } else if (props.overflow || props.segmented || props.editable) {
      data.attrs.segmented = props.segmented
      data.attrs.editable = props.editable
      return h(VOverflowBtn, data, children)
    } else {
      return h(VSelect, data, children)
    }
  }
}

/* istanbul ignore next */
wrapper.install = function install (Vue) {
  Vue.component(VSelect.name, wrapper)
}

export { wrapper as VSelect }

export default wrapper
