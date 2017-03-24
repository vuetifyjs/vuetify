import { closestParentTag, addOnceEventListener } from '../../util/helpers'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'list-group',

  mixins: [Toggleable],

  data () {
    return {
      booted: this.value,
      height: 0
    }
  },

  props: {
    group: String,
    noAction: Boolean
  },

  computed: {
    classes () {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      }
    },
    list () {
      return closestParentTag.call(this, 'v-list')
    },
    styles () {
      return {
        height: `${this.height}px`
      }
    }
  },

  watch: {
    isActive () {
      this.booted = true

      if (!this.isActive) {
        this.list.listClose(this._uid)
      }
    },
    '$route' (to) {
      this.isActive = this.matchRoute(to.path)

      if (this.group && this.isActive) {
        this.list.listClick(this._uid, true)
      }
    }
  },

  mounted () {
    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path)
    }

    if (this.isActive) {
      this.list.listClick(this._uid)
    }

    this.height = this.$refs.group.scrollHeight
  },

  methods: {
    click () {
      this.list.listClick(this._uid)
    },
    toggle (uid) {
      this.isActive = this._uid === uid
    },
    enter (el, done) {
      el.style.display = 'block'
      this.height = 0

      setTimeout(() => (this.height = el.scrollHeight), 50)

      addOnceEventListener(el, 'transitionend', done)
    },
    leave (el, done) {
      this.height = 0
      addOnceEventListener(el, 'transitionend', done)
    },
    matchRoute (to) {
      if (!this.group) return false
      return to.match(this.group) !== null
    }
  },

  render (h) {
    const group = h('ul', {
      'class': 'list list--group',
      style: this.styles,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, this.booted ? this.$slots.default : [])

    const item = h('div', {
      'class': this.classes,
      on: { click: this.click }
    }, [this.$slots.item])

    const transition = h('transition', {
      on: {
        enter: this.enter,
        leave: this.leave
      }
    }, [group])

    return h('div', { 'class': 'list--group__container' }, [item, transition])
  }
}
