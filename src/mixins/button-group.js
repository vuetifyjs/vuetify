export default {
  data () {
    return {
      buttons: [],
      listeners: []
    }
  },

  methods: {
    getValue (i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value
      }

      return i
    },
    update () {
      const selected = []

      this.buttons
        .forEach((button, i) => {
          const elm = button.$el

          // Fix for testing, dataset does not exist on elm?
          if (!elm.dataset) elm.dataset = {}

          elm.removeAttribute('data-only-child')

          if (this.isSelected(i)) {
            elm.setAttribute('data-selected', true)

            if (!elm.classList.contains('btn--router')) {
              elm.classList.add('btn--active')
            }

            selected.push(i)
          } else {
            elm.removeAttribute('data-selected')

            if (!elm.classList.contains('btn--router')) {
              elm.classList.remove('btn--active')
            }
          }

          elm.dataset.index = i
        })

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true)
      }
    }
  },

  mounted () {
    this.$vuetify.load(() => {
      this.buttons = this.$children

      this.buttons.forEach((button, i) => {
        this.listeners.push(this.updateValue.bind(this, i))
        button.$on('click', this.listeners[i])
      })

      this.update()
    })
  },

  beforeDestroy () {
    this.buttons.forEach((button, i) => {
      button.$off('click', this.listeners[i])
    })
  }
}
