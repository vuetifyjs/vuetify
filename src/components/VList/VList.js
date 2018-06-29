// Styles
import '../../stylus/components/_lists.styl'

// Mixins
import Themeable from '../../mixins/themeable'
import {
  provide as RegistrableProvide
} from '../../mixins/registrable'

/* @vue/component */
export default {
  name: 'v-list',

  mixins: [
    RegistrableProvide('list'),
    Themeable
  ],

  provide () {
    return {
      'listClick': this.listClick
    }
  },

  props: {
    dense: Boolean,
    expand: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  data: () => ({
    groups: []
  }),

  computed: {
    classes () {
      return {
        'v-list--dense': this.dense,
        'v-list--subheader': this.subheader,
        'v-list--two-line': this.twoLine,
        'v-list--three-line': this.threeLine,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    }
  },

  methods: {
    register (uid, cb) {
      this.groups.push({ uid, cb })
    },
    unregister (uid) {
      const index = this.groups.findIndex(g => g.uid === uid)

      if (index > -1) {
        this.groups.splice(index, 1)
      }
    },
    listClick (uid) {
      if (this.expand) return

      for (let i = this.groups.length; i--;) {
        this.groups[i].cb(uid)
      }
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-list',
      'class': this.classes
    }

    return h('div', data, [this.$slots.default])
  }
}
