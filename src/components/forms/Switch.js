import Checkbox from '../../mixins/checkbox'

export default {
  name: 'switch',

  mixins: [Checkbox],

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
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--dark': this.dark,
        'input-group--selection-controls__container--disabled': this.disabled,
        'primary--text': this.primary,
        'secondary--text': this.secondary,
        'error--text': this.error,
        'success--text': this.success,
        'info--text': this.info,
        'warning--text': this.warning
      }
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
      on: { click: this.toggle },
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

    return this.genInputGroup(h, [
      container,
      h('label', { on: { click: this.toggle }}, this.label)
    ])
  }
}
