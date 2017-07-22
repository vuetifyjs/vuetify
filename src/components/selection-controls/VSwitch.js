import Selectable from '~mixins/selectable'

export default {
  name: 'switch',

  mixins: [Selectable],

  computed: {
    classes () {
      return {
        'input-group--selection-controls switch': true
      }
    },
    rippleClasses () {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      }
    },
    containerClasses () {
      return this.addColorClassChecks({
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      })
    },
    toggleClasses () {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      }
    }
  },

  render (h) {
    const ripple = h('div', {
      'class': this.rippleClasses,
      on: Object.assign({}, {
        click: this.toggle
      }, this.$listeners),
      directives: [
        {
          name: 'ripple',
          value: { center: true }
        }
      ]
    })

    const container = h('div', {
      'class': this.containerClasses
    }, [
      h('div', { 'class': this.toggleClasses }),
      ripple
    ])

    return this.genInputGroup([container])
  }
}
