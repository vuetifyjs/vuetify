import Btn from './Button'
import BtnToggle from './ButtonToggle.vue'
import Toggleable from '../../mixins/toggleable'
import Fab from './mixins/fab'

const SpeedDial = {
  name: 'speed-dial',

  mixins: [Fab, Toggleable],

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: (val) => {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    fling: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes () {
      return {
        'speed-dial': true,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed,
        [`speed-dial--direction-${this.direction}`]: true
      }
    },
    computedTransition () {
      return this.fling
        ? 'slide-y-reverse-transition'
        : this.transition
    }
  },

  render (h) {
    let children = []
    const data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: () => (this.isActive = !this.isActive)
      }
    }

    if (this.hover) {
      data.on.mouseenter = () => (this.isActive = true)
      data.on.mouseleave = () => (this.isActive = false)
    }

    if (this.isActive) {
      children = this.$slots.default.map((b, i) => {
        b.key = i
        return b
      })
    }

    const list = h('transition-group', {
      'class': 'speed-dial__list',
      props: {
        name: this.computedTransition,
        tag: 'div'
      }
    }, children)

    return h('div', data, [this.$slots.activator, list])
  }
}

export default {
  Btn,
  BtnToggle,
  SpeedDial
}
