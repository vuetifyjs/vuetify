import { provide as RegistrableProvide } from './registrable'
import { consoleWarn } from '../util/console'

export default {
  name: 'button-group',

  mixins: [RegistrableProvide('buttonGroup')],

  data () {
    return {
      buttons: [],
      listeners: [],
      destroying: false
    }
  },

  watch: {
    buttons () {
      this.update()
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

      for (let i = 0; i < this.buttons.length; i++) {
        const elm = this.buttons[i].$el
        const button = this.buttons[i]

        elm.removeAttribute('data-only-child')

        if (this.isSelected(i)) {
          !button.to && (button.isActive = true)
          selected.push(i)
        } else {
          !button.to && (button.isActive = false)
        }
      }

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true)
      }

      this.ensureMandatoryInvariant(selected.length > 0)
    },
    register (button) {
      const index = this.buttons.length
      this.buttons.push(button)
      this.listeners.push(this.updateValue.bind(this, index))
      button.$on('click', this.listeners[index])
    },
    unregister (buttonToUnregister) {
      // Basic cleanup if we're destroying
      if (this.destroying) {
        const index = this.buttons.indexOf(buttonToUnregister)
        if (index !== -1) {
          buttonToUnregister.$off('click', this.listeners[index])
        }
        return
      }

      this.redoRegistrations(buttonToUnregister)
    },
    redoRegistrations (buttonToUnregister) {
      let selectedCount = 0

      const buttons = []
      for (let index = 0; index < this.buttons.length; ++index) {
        const button = this.buttons[index]
        if (button !== buttonToUnregister) {
          buttons.push(button)
          if (this.isSelected(index)) {
            ++selectedCount
          }
        }

        button.$off('click', this.listeners[index])
      }

      this.buttons = []
      this.listeners = []

      for (let index = 0; index < buttons.length; ++index) {
        const button = buttons[index]
        this.register(button)
      }

      this.ensureMandatoryInvariant(selectedCount > 0)
      this.updateAllValues && this.updateAllValues()
    },
    ensureMandatoryInvariant (hasSelectedAlready) {
      // Preserve the mandatory invariant
      if (this.mandatory && !hasSelectedAlready) {
        if (!this.listeners.length) {
          consoleWarn('v-btn-toggle must contain at least one v-btn if the mandatory property is true.')
          return
        }

        this.listeners[0]()
      }
    }
  },

  mounted () {
    this.update()
  },

  beforeDestroy () {
    this.destroying = true
  }
}
