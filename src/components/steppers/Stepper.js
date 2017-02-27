export default {
  name: 'stepper',

  computed: {
    classes () {
      return {
        'stepper': true
      }
    }
  },

  render (h) {
    const children = []
    const steps = []
    const label = []

    const data = {
      'class': this.classes
    }

    for (let i = 0; i < 3; i++) {
      steps.push(h('div', { 'class': 'stepper__step' }, [
        h('span', {}, i)
      ]))

      if (i !== 2) {
        steps.push(h('v-divider'))
      }
    }

    for (let i = 0; i < 3; i++) {
      label.push(h('div', {}, `Label ${i}`))
    }

    const labels = h('div', {
      'class': 'stepper__labels'
    }, label)

    const header = h('div', {
      'class': 'stepper__header'
    }, [steps, labels])

    children.push(header)

    return h('div', data, children)
  }
}
