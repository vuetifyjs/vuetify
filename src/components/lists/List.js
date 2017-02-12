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
        'list--sub-header': this.subHeader
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
      this.$children.forEach(i => {
        if (i.$options._componentTag === 'v-list-group') {
          this.groups.push(i)
        }
      })
    },

    listClick (uid) {
      this.uid = this.uid === uid ? null : uid
    }
  },

  render (h) {
    const data = {
      'class': this.classes,
      attrs: {
        'data-uid': this._uid
      }
    }

    return h('ul', data, [this.$slots.default])
  }
}
