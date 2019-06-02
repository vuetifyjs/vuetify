import Vue from 'vue'

const typography = name => ({
  name: `v-${name}`,

  render (h) {
    return h('div', {
      staticClass: name,
    }, this.$slots.default)
  },
})

Vue.component('v-headline', typography('headline'))
Vue.component('v-display-1', typography('display-1'))
Vue.component('v-display-2', typography('display-2'))
Vue.component('v-overline', typography('overline'))
Vue.component('v-subtitle-1', typography('subtitle-1'))
Vue.component('v-subtitle-2', typography('subtitle-2'))
