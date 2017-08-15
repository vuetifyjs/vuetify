export default {
  data () {
    return {
      buttons: [],
      listeners: []
    }
  },

  methods: {
    getValue (i) {
      return ('value' in this.buttons[i]) && !!this.buttons[i].value
        ? this.buttons[i].value
        : i
    },
    update () {
      this.buttons
        .forEach((elm, i) => {
          // Fix for testing, dataset does not exist on elm?
          if (!elm.dataset) elm.dataset = {}

          if (this.isSelected(i)) elm.setAttribute('data-selected', true)
          else elm.removeAttribute('data-selected')

          elm.dataset.index = i
        })
    }
  },

  mounted () {
    const options = { passive: true }
    this.$vuetify.load(() => {
      this.buttons = this.$slots.default
        .filter(vnode => vnode.tag !== undefined)
        .map((vnode, i) => {
          this.listeners.push(this.updateValue.bind(this, i))
          vnode.elm.addEventListener('click', this.listeners[i], options)
          return vnode.elm
        })

      this.update()
    })
  },

  beforeDestroy () {
    this.buttons.forEach((elm, i) => {
      elm.removeEventListener('click', this.listeners[i])
    })
  }
}
