import VSelect from './VSelect'
import VSelectList from './VSelectList'
import VAutocomplete from '../VAutocomplete'
import rebuildSlots from '@/util/rebuildFunctionalSlots'

const wrapper = {
  functional: true,

  props: {
    autocomplete: Boolean,
    combobox: Boolean,
    tags: Boolean
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

    if (props.autocomplete || props.combobox || props.tags) {
      data.attrs.combobox = props.combobox
      data.attrs.tags = props.tags
      return h(VAutocomplete, data, children)
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
