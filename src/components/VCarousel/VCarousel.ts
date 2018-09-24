// Styles
import '../../stylus/components/_carousel.styl'

// Components
import VBtn from '../VBtn'
import VIcon from '../VIcon'

// Mixins
import Themeable from '../../mixins/themeable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Directives
import Touch from '../../directives/touch'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'
import { VNodeDirective } from 'vue/types/vnode'

type CarouselItemInstance = {
  uid: number
  open: (uid: number, reverse: boolean) => void
}

export default mixins(
  Themeable,
  RegistrableProvide('carousel')
  /* @vue/component */
).extend({
  name: 'v-carousel',

  directives: { Touch },

  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    delimiterIcon: {
      type: String,
      default: '$vuetify.icons.delimiter'
    },
    hideControls: Boolean,
    hideDelimiters: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: (value: string | number) => value > 0
    },
    nextIcon: {
      type: [Boolean, String],
      default: '$vuetify.icons.next'
    },
    prevIcon: {
      type: [Boolean, String],
      default: '$vuetify.icons.prev'
    },
    value: Number
  },

  data () {
    return {
      inputValue: this.value,
      items: [] as CarouselItemInstance[],
      slideTimeout: undefined as number | undefined,
      reverse: false
    }
  },

  computed: {
    isDark (): boolean {
      return this.dark || !this.light
    }
  },

  watch: {
    items () {
      if (this.inputValue >= this.items.length) {
        this.inputValue = this.items.length - 1
      }
    },
    inputValue () {
      // Evaluates items when inputValue changes to
      // account for dynamic changing of children

      const selectedItem = this.items[this.inputValue]

      if (!selectedItem) return

      for (let index = this.items.length; --index >= 0;) {
        this.items[index].open(selectedItem.uid, this.reverse)
      }

      this.$emit('input', this.inputValue)
      this.restartTimeout()
    },
    value (val) {
      this.inputValue = val
    },
    interval () {
      this.restartTimeout()
    },
    cycle (val) {
      if (val) {
        this.restartTimeout()
      } else {
        clearTimeout(this.slideTimeout)
        this.slideTimeout = undefined
      }
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    genDelimiters (): VNode {
      return this.$createElement('div', {
        staticClass: 'v-carousel__controls'
      }, this.genItems())
    },
    genIcon (
      direction: 'prev' | 'next',
      icon: string,
      fn: () => void
    ): VNode {
      return this.$createElement('div', {
        staticClass: `v-carousel__${direction}`
      }, [
        this.$createElement(VBtn, {
          props: {
            icon: true
          },
          on: { click: fn }
        }, [
          this.$createElement(VIcon, {
            props: { 'size': '46px' }
          }, icon)
        ])
      ])
    },
    genIcons (): VNode[] {
      const icons = []

      const prevIcon = this.$vuetify.rtl
        ? this.nextIcon
        : this.prevIcon

      if (prevIcon && typeof prevIcon === 'string') {
        icons.push(this.genIcon('prev', prevIcon, this.prev))
      }

      const nextIcon = this.$vuetify.rtl
        ? this.prevIcon
        : this.nextIcon

      if (nextIcon && typeof nextIcon === 'string') {
        icons.push(this.genIcon('next', nextIcon, this.next))
      }

      return icons
    },
    genItems (): VNode[] {
      return this.items.map((item, index) => {
        return this.$createElement(VBtn, {
          class: {
            'v-carousel__controls__item': true,
            'v-carousel__controls__item--active': index === this.inputValue
          },
          props: {
            icon: true,
            small: true
          },
          key: index,
          on: { click: this.select.bind(this, index) }
        }, [this.$createElement(VIcon, {
          props: { size: '18px' }
        }, this.delimiterIcon)])
      })
    },
    restartTimeout () {
      this.slideTimeout && clearTimeout(this.slideTimeout)
      this.slideTimeout = undefined

      const raf = requestAnimationFrame || setTimeout
      raf(this.startTimeout)
    },
    init () {
      if (this.value == null) {
        this.inputValue = 0
      } else {
        this.startTimeout()
      }
    },
    next () {
      this.reverse = false
      this.inputValue = (this.inputValue + 1) % this.items.length
    },
    prev () {
      this.reverse = true
      this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length
    },
    select (index: number) {
      this.reverse = index < this.inputValue
      this.inputValue = index
    },
    startTimeout () {
      if (!this.cycle) return

      this.slideTimeout = window.setTimeout(this.next, this.interval > 0 ? this.interval : 6000)
    },
    register (uid: number, open: () => void) {
      this.items.push({ uid, open })
    },
    unregister (uid: number) {
      this.items = this.items.filter(i => i.uid !== uid)
    }
  },

  render (h): VNode {
    const children = []

    if (!this.hideControls) {
      children.push(this.genIcons())
    }

    if (!this.hideDelimiters) {
      children.push(this.genDelimiters())
    }

    return h('div', {
      staticClass: 'v-carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }] as VNodeDirective[]
    }, [children, this.$slots.default])
  }
})
