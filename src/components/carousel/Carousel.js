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
    genControls () {
      return this.$createElement('div', {
        staticClass: 'carousel__controls'
      }, this.genItems())
    },
    genIcon (direction, fn) {
      return this.$createElement('div', {
        staticClass: `carousel__${direction}`
      }, [
        this.$createElement(Button, {
          props: {
            icon: true,
            dark: true
          },
          on: { click: fn }
        }, [this.$createElement(Icon, `chevron_${direction}`)])
      ])
    },
    genItems () {
      return this.items.map((item, index) => {
        return this.$createElement(Button, {
          class: {
            'carousel__controls__item': true,
            'carousel__controls__item--active': index === this.current
          },
          props: {
            icon: true,
            dark: true
          },
          key: index,
          on: { click: this.select.bind(this, index) }
        }, [this.$createElement(Icon, this.icon)])
      })
    },
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
    return h('div', {
      staticClass: 'carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }]
    }, [
      this.genIcon('left', this.prev),
      this.genIcon('right', this.next),
      this.genControls(),
      this.$slots.default
    ])
  }
}
