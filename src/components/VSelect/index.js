import VSelect from './VSelect'
import VSelectList from './VSelectList'
import VOverflowBtn from '../VOverflowBtn'
import VAutocomplete from '../VAutocomplete'
import rebuildSlots from '../../util/rebuildFunctionalSlots'

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
      console.warn(`[Vuetify] '<v-select autocomplete>' is deprecated, use '<v-autocomplete>' instead in ${parent._name}`)
    }
    if (props.combobox) {
      console.warn(`[Vuetify] '<v-select combobox>' is deprecated, use '<v-autocomplete combobox>' instead in ${parent._name}`)
    }
    if (props.tags) {
      console.warn(`[Vuetify] '<v-select tags>' is deprecated, use '<v-autocomplete tags>' instead in ${parent._name}`)
    }

    if (props.overflow) {
      console.warn(`[Vuetify] '<v-select overflow>' is deprecated, use '<v-overflow-btn>' instead in ${parent._name}`)
    }
    if (props.segmented) {
      console.warn(`[Vuetify] '<v-select segmented>' is deprecated, use '<v-overflow-btn segmented>' instead in ${parent._name}`)
    }
    if (props.editable) {
      console.warn(`[Vuetify] '<v-select editable>' is deprecated, use '<v-overflow-btn editable>' instead in ${parent._name}`)
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
  Vue.component(VSelectList.name, VSelectList)
}

export { wrapper as VSelect, VSelectList }

export default wrapper
