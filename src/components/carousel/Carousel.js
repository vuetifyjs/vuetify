import Bootable from '~mixins/bootable'
import Button from '~components/buttons/Button'
import Icon from '~components/icons/Icon'

export default {
  name: 'carousel',

  mixins: [Bootable],

  data () {
    return {
      current: null,
      items: [],
      slideInterval: {},
      reverse: false
    }
  },

  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'fiber_manual_record'
    },
    interval: {
      type: Number,
      default: 6000
    }
  },

  computed: {
    defaultState () {
      return {
        current: null,
        reverse: false
      }
    }
  },

  watch: {
    current () {
      // Evaluate items when current changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(i => {
        return i.$el.classList && i.$el.classList.contains('carousel__item')
      })

      this.items.forEach(i => i.open(this.items[this.current]._uid, this.reverse))

      !this.isBooted && this.cycle && this.restartInterval()
      this.isBooted = true
    },
    cycle (val) {
      val && this.restartInterval() || clearInterval(this.slideInterval)
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    restartInterval () {
      clearInterval(this.slideInterval)
      this.$nextTick(this.startInterval)
    },
    init () {
      this.current = 0
    },
    next () {
      this.reverse = false

      if (this.current + 1 === this.items.length) {
        return (this.current = 0)
      }

      this.current++
    },
    prev () {
      this.reverse = true

      if (this.current - 1 < 0) {
        return (this.current = this.items.length - 1)
      }

      this.current--
    },
    select (index) {
      this.reverse = index < this.current
      this.current = index
    },
    startInterval () {
      this.slideInterval = setInterval(this.next, this.interval)
    }
  },

  render (h) {
    const genIcon = (name, fn) => {
      return h(Button, {
        props: {
          icon: true,
          dark: true
        },
        on: {
          click: fn
        }
      }, [h(Icon, name)])
    }

    const prev = h('div', { class: 'carousel__left' }, [genIcon('chevron_left', this.prev)])
    const next = h('div', { class: 'carousel__right' }, [genIcon('chevron_right', this.next)])

    const items = this.items.map((item, index) => {
      return h(Button, {
        class: {
          'carousel__controls__item': true,
          'carousel__controls__item--active': index === this.current
        },
        props: {
          icon: true,
          dark: true
        },
        key: index,
        on: {
          click: this.select.bind(this, index)
        }
      }, [h(Icon, this.icon)])
    })

    const controls = h('div', { class: 'carousel__controls' }, items)
    const directives = [
      {
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }
    ]

    return h('div', { class: 'carousel', directives }, [prev, next, controls, this.$slots.default])
  }
}
