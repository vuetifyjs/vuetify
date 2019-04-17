import Vue, { VNode } from 'vue'
import { wrapInArray } from '../../util/helpers'

export default Vue.extend({
  name: 'v-picker-btn',

  functional: true,

  props: {
    active: Boolean,
    readonly: Boolean,
  },

  render (h, { data, props, slots }): VNode {
    const computedSlots = slots()

    const click = (event: Event) => {
      event.stopPropagation()
      if (data.on && data.on.click) wrapInArray(data.on.click).forEach(f => f())
    }

    const staticClass = ['v-picker__title__btn', data.staticClass].filter(v => !!v).join(' ')

    return h('div', {
      staticClass: staticClass.trim(),
      class: {
        'v-picker__title__btn--active': props.active,
        'v-picker__title__btn--readonly': props.readonly,
      },
      on: (props.active || props.readonly) ? undefined : { click },
    }, computedSlots.default)
  },
})
