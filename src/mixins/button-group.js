export default {
  data () {
    return {
      buttons: [],
      listeners: []
    }
  },

  methods: {
    getValue (i) {
      return this.buttons[i].value == null ? i : this.buttons[i].value
    },
    update () {
      const selected = []

      this.buttons.forEach((button, i) => {
        const elm = button.$el

        // Fix for testing, dataset does not exist on elm?
        if (!elm.dataset) elm.dataset = {}

        elm.removeAttribute('data-only-child')

        if (this.isSelected(i)) {
          elm.setAttribute('data-selected', true)
          elm.classList.add('btn--active')
          selected.push(i)
        } else {
          elm.removeAttribute('data-selected')
          elm.classList.remove('btn--active')
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
        .filter(button => button.$vnode.tag !== undefined)
        .map((button, i) => {
          this.listeners.push(this.updateValue.bind(this, i))
          button.$on('click', this.listeners[i])
          return button
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
