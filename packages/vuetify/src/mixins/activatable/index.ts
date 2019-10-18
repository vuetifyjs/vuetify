// Mixins
import Delayable from '../delayable'
import Toggleable from '../toggleable'

// Utilities
import mixins from '../../util/mixins'
import { getSlot, getSlotType } from '../../util/helpers'
import { consoleError } from '../../util/console'

// Types
import { PropValidator } from 'vue/types/options'
import { VNode } from 'vue'

const baseMixins = mixins(
  Delayable,
  Toggleable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'activatable',

  props: {
    activator: {
      default: null,
      validator: (val: string | object) => {
        return ['string', 'object'].includes(typeof val)
      },
    } as PropValidator<string | HTMLElement | VNode | Element | null>,
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean,
  },

  data: () => ({
    // Do not use this directly, call getActivator() instead
    activatorElement: null as HTMLElement | null,
    activatorNode: [] as VNode[],
    events: ['click', 'mouseenter', 'mouseleave'],
    listeners: {} as Record<string, (e: MouseEvent & KeyboardEvent) => void>,
  }),

  watch: {
    activator: 'resetActivator',
    openOnHover: 'resetActivator',
  },

  mounted () {
    const slotType = getSlotType(this, 'activator', true)

    if (slotType && ['v-slot', 'normal'].includes(slotType)) {
      consoleError(`The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`, this)
    }

    this.addActivatorEvents()
  },

  beforeDestroy () {
    this.removeActivatorEvents()
  },

  methods: {
    addActivatorEvents () {
      if (
        !this.activator ||
        this.disabled ||
        !this.getActivator()
      ) return

      this.listeners = this.genActivatorListeners()
      const keys = Object.keys(this.listeners)

      for (const key of keys) {
        this.getActivator()!.addEventListener(key, this.listeners[key] as any)
      }
    },
    genActivator () {
      const node = getSlot(this, 'activator', Object.assign(this.getValueProxy(), {
        on: this.genActivatorListeners(),
        attrs: this.genActivatorAttributes(),
      })) || []

      this.activatorNode = node

      return node
    },
    genActivatorAttributes () {
      return {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': String(this.isActive),
      }
    },
    genActivatorListeners () {
      if (this.disabled) return {}

      const listeners: Record<string, (e: MouseEvent & KeyboardEvent) => void> = {}

      if (this.openOnHover) {
        listeners.mouseenter = (e: MouseEvent) => {
          this.getActivator(e)
          this.runDelay('open')
        }
        listeners.mouseleave = (e: MouseEvent) => {
          this.getActivator(e)
          this.runDelay('close')
        }
      } else {
        listeners.click = (e: MouseEvent) => {
          const activator = this.getActivator(e)
          if (activator) activator.focus()

          this.isActive = !this.isActive
        }
      }

      return listeners
    },
    getActivator (e?: Event): HTMLElement | null {
      // If we've already fetched the activator, re-use
      if (this.activatorElement) return this.activatorElement

      let activator = null

      if (this.activator) {
        const target = this.internalActivator ? this.$el : document

        if (typeof this.activator === 'string') {
          // Selector
          activator = target.querySelector(this.activator)
        } else if ((this.activator as any).$el) {
          // Component (ref)
          activator = (this.activator as any).$el
        } else {
          // HTMLElement | Element
          activator = this.activator
        }
      } else if (e) {
        // Activated by a click event
        activator = (e.currentTarget || e.target) as HTMLElement
      } else if (this.activatorNode.length) {
        // Last resort, use the contents of the activator slot
        const vm = this.activatorNode[0].componentInstance
        if (
          vm &&
          vm.$options.mixins && //                         Activatable is indirectly used via Menuable
          vm.$options.mixins.some((m: any) => m.options && ['activatable', 'menuable'].includes(m.options.name))
        ) {
          // Activator is actually another activatible component, use its activator (#8846)
          activator = (vm as any).getActivator()
        } else {
          activator = this.activatorNode[0].elm as HTMLElement
        }
      }

      this.activatorElement = activator

      return this.activatorElement
    },
    getContentSlot () {
      return getSlot(this, 'default', this.getValueProxy(), true)
    },
    getValueProxy (): object {
      const self = this
      return {
        get value () {
          return self.isActive
        },
        set value (isActive: boolean) {
          self.isActive = isActive
        },
      }
    },
    removeActivatorEvents () {
      if (
        !this.activator ||
        !this.activatorElement
      ) return

      const keys = Object.keys(this.listeners)

      for (const key of keys) {
        (this.activatorElement as any).removeEventListener(key, this.listeners[key])
      }

      this.listeners = {}
    },
    resetActivator () {
      this.activatorElement = null
      this.getActivator()
      this.addActivatorEvents()
    },
  },
})
