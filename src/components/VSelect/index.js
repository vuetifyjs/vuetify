import VSelect from './VSelect'
import VOverflowBtn from '../VOverflowBtn'
import VAutocomplete from '../VAutocomplete'
import VCombobox from '../VCombobox'
import rebuildSlots from '../../util/rebuildFunctionalSlots'
import dedupeModelListeners from '../../util/dedupeModelListeners'
import { deprecate } from '../../util/console'

/* @vue/component */
const wrapper = {
  functional: true,

  $_wrapperFor: VSelect,

  props: {
    // VAutoComplete
    /** @deprecated */
    autocomplete: Boolean,
    /** @deprecated */
    combobox: Boolean,
    multiple: Boolean,
    /** @deprecated */
    tags: Boolean,
    // VOverflowBtn
    /** @deprecated */
    editable: Boolean,
    /** @deprecated */
    overflow: Boolean,
    /** @deprecated */
    segmented: Boolean
  },

  render (h, { props, data, slots, parent }) {
    dedupeModelListeners(data)
    const children = rebuildSlots(slots(), h)

    if (props.autocomplete) {
      deprecate('<v-select autocomplete>', '<v-autocomplete>', wrapper, parent)
    }
    if (props.combobox) {
      deprecate('<v-select combobox>', '<v-combobox>', wrapper, parent)
    }
    if (props.tags) {
      deprecate('<v-select tags>', '<v-combobox multiple>', wrapper, parent)
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

    if (props.combobox || props.tags) {
      data.attrs.multiple = props.tags
      return h(VCombobox, data, children)
    } else if (props.autocomplete) {
      data.attrs.multiple = props.multiple
      return h(VAutocomplete, data, children)
    } else if (props.overflow || props.segmented || props.editable) {
      data.attrs.segmented = props.segmented
      data.attrs.editable = props.editable
      return h(VOverflowBtn, data, children)
    } else {
      data.attrs.multiple = props.multiple
      return h(VSelect, data, children)
    }
  }
}

export { wrapper as VSelect }

export default wrapper
