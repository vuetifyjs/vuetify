import mixins from '../util/mixins'

import { provide as RegistrableProvide } from './registrable'
import { consoleWarn } from '../util/console'

import VBtn from '../components/VBtn/VBtn'

type VBtnInstance = InstanceType<typeof VBtn>

/* @vue/component */
export default mixins(RegistrableProvide('buttonGroup')).extend({
  name: 'button-group',

  props: {
    mandatory: Boolean
  },

  data: () => ({
    buttons: [] as VBtnInstance[],
    listeners: [] as (() => void)[],
    isDestroying: false
  }),

  watch: {
    buttons: 'update'
  },

  mounted () {
    this.update()
  },

  beforeDestroy () {
    this.isDestroying = true
  },

  methods: {
    /** @abstract */
    isSelected (i: number): boolean {
      throw new Error('Not implemented !')
    },
    /** @abstract */
    updateValue (i: number): void {
      throw new Error('Not implemented !')
    },
    /** @abstract */
    updateAllValues (): void {
      throw new Error('Not implemented !')
    },
    getValue (i: number): any {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value
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
        this.buttons[selected[0]].$el.setAttribute('data-only-child', 'true')
      }

      this.ensureMandatoryInvariant(selected.length > 0)
    },
    register (button: VBtnInstance): void {
      const index = this.buttons.length
      this.buttons.push(button)
      this.listeners.push(this.updateValue.bind(this, index))
      button.$on('click', this.listeners[index])
    },
    unregister (buttonToUnregister: VBtnInstance): void {
      // Basic cleanup if we're destroying
      if (this.isDestroying) {
        const index = this.buttons.indexOf(buttonToUnregister)
        if (index !== -1) {
          buttonToUnregister.$off('click', this.listeners[index])
        }
        return
      }

      this.redoRegistrations(buttonToUnregister)
    },
    redoRegistrations (buttonToUnregister: VBtnInstance): void {
      let selectedCount = 0

      const buttons = []
      for (let index = 0; index < this.buttons.length; ++index) {
        const button = this.buttons[index]
        if (button !== buttonToUnregister) {
          buttons.push(button)
          selectedCount += Number(this.isSelected(index))
        }

        button.$off('click', this.listeners[index])
      }

      this.buttons = []
      this.listeners = []

      for (let index = 0; index < buttons.length; ++index) {
        this.register(buttons[index])
      }

      this.ensureMandatoryInvariant(selectedCount > 0)
      this.updateAllValues && this.updateAllValues()
    },
    ensureMandatoryInvariant (hasSelectedAlready: boolean): void {
      // Preserve the mandatory invariant by selecting the first tracked button, if needed

      if (!this.mandatory || hasSelectedAlready) return

      if (!this.listeners.length) {
        consoleWarn('There must be at least one v-btn child if the mandatory property is true.', this)
        return
      }

      this.listeners[0]()
    }
  }
})
