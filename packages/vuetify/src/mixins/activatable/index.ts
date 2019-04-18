// Mixins
import Delayable from '../delayable'
import Toggleable from '../toggleable'

// Utilities
import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'

// Types
import { PropValidator } from 'vue/types/options'

const baseMixins = mixins(
  Delayable,
  Toggleable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'activatable',

  props: {
    activateOnHover: Boolean,
    activator: {
      default: null,
      validator: (val: string | object) => {
        return ['string', 'object'].includes(typeof val)
      }
    } as PropValidator<string | HTMLElement>,
    disabled: Boolean,
    internalActivator: Boolean
  },

  methods: {
    genActivator () {
      const listeners: Record<string, (e: Event) => void> = {}

      if (this.activateOnHover) {
        listeners.mouseenter = this.onMouseenter
        listeners.mouseleave = this.onMouseleave
      } else {
        listeners.click = this.onClick
      }

      return getSlot(this, 'activator', { on: listeners })
    },
    getActivator (e?: Event): HTMLElement | null {
      let activator = null

      if (this.activator) {
        const target = this.internalActivator ? this.$el : document

        activator = typeof this.activator === 'string'
          ? target.querySelector(this.activator)
          : this.activator
      } else if (e) {
        activator = e.currentTarget || e.target
      }

      if (!activator) return null

      return activator as HTMLElement
    },
    onClick (e: Event) {
      if (this.disabled) return

      const activator = this.getActivator(e)

      if (activator) activator.focus()

      this.isActive = !this.isActive
    },
    onMouseenter () {
      if (this.disabled) return

      this.runDelay('open', () => {
        this.isActive = true
      })
    },
    onMouseleave () {
      if (this.disabled) return

      this.runDelay('close', () => {
        this.isActive = false
      })
    }
  }
})
