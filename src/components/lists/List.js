import Schemable from '../../mixins/schemable'

export default {
  name: 'list',

  provide () {
    return {
      listClick: this.listClick,
      listClose: this.listClose
    }
  },

  mixins: [Schemable],

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
        'dark--text dark--bg': this.dark,
        'light--text light--bg': this.light
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
