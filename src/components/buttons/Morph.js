import Toggleable from '../../mixins/toggleable'
import Fab from './mixins/fab'

export default {
  name: 'morph',

  mixins: [Fab, Toggleable],

  data () {
    return {
      containerWidth: 0
    }
  },

  props: {
    transition: {
      type: String,
      default: 'morph-transition'
    }
  },

  computed: {
    classes () {
      return {
        'morph': true,
        'morph--fixed': true
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      console.log(this)
      this.containerWidth = this.$parent.$el.clientWidth
    })
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

    if (this.isActive) {
      children = this.$slots.default.map((b, i) => {
        b.key = i

        return b
      })
    }

    const transition = h('transition-group', {
      props: {
        name: this.transition,
        tag: 'div'
      }
    }, children)

    const content = h('div', {
      class: {
        'morph--content': true
      },
      style: {
        width: `${this.containerWidth}px`
      }
    }, [transition])

    return h('div', data, [this.$slots.activator, content])
  }
}
