export default {
  name: 'list',

  data () {
    return {
      uid: null,
      groups: []
    }
  },

  props: {
    dense: Boolean,
    subHeader: Boolean,
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
        'list--subheader': this.subHeader
      }
    }
  },

  watch: {
    uid () {
      this.groups.forEach(i => i.toggle(this.uid))
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.groups = this.$children.filter(i => i.$options._componentTag === 'v-list-group')
    },

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
