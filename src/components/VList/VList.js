require('../../stylus/components/_lists.styl')

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-list',

  provide () {
    return {
      listClick: this.listClick,
      listClose: this.listClose
    }
  },

  mixins: [Themeable],

  data () {
    return {
      uid: null,
      groups: []
    }
  },

  props: {
    dense: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  computed: {
    classes () {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--subheader': this.subheader,
        'theme--dark dark--bg': this.dark,
        'theme--light light--bg': this.light
      }
    }
  },

  watch: {
    uid () {
      this.$children.filter(i => i.$options._componentTag === 'v-list-group').forEach(i => i.toggle(this.uid))
    }
  },

  methods: {
    listClick (uid, force) {
      if (force) {
        this.uid = uid
      } else {
        this.uid = this.uid === uid ? null : uid
      }
    },

    listClose (uid) {
      if (this.uid === uid) {
        this.uid = null
      }
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid }
    }

    return h('ul', data, [this.$slots.default])
  }
}
