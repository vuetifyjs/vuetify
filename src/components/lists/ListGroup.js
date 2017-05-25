import { closestParentTag } from '../../util/helpers'
import Expand from '../../mixins/expand-transition'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'list-group',

  mixins: [Expand, Toggleable],

  data () {
    return {
      isBooted: this.value,
      height: 0
    }
  },

  props: {
    group: String,
    lazy: Boolean,
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
      this.isBooted = true

      if (!this.isActive) {
        this.list.listClose(this._uid)
      }
    },
    '$route' (to) {
      const isActive = this.matchRoute(to.path)

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.list.listClick(this._uid)
        }
        this.isActive = isActive
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
      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        this.list.listClick(this._uid)
      }
    },
    toggle (uid) {
      this.isActive = this._uid === uid
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
    }, [this.lazy && !this.isBooted ? null : this.$slots.default])

    const item = h('div', {
      'class': this.classes,
      on: { click: this.click },
      ref: 'item'
    }, [this.$slots.item])

    const transition = h('transition', {
      on: {
        enter: this.enter,
        afterEnter: this.afterEnter,
        leave: this.leave
      }
    }, [group])

    return h('div', { 'class': 'list--group__container' }, [item, transition])
  }
}
