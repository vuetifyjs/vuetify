// Mixins
import Delayable from '../delayable'
import Toggleable from '../toggleable'

// Utilities
import mixins from '../../util/mixins'
import { getSlot, getSlotType } from '../../util/helpers'
import { consoleError } from '../../util/console'

// Types
import { VNode, PropType } from 'vue'

type Listeners = Dictionary<(e: MouseEvent & KeyboardEvent & FocusEvent) => void>

const baseMixins = mixins(
  Delayable,
  Toggleable
)

/* @vue/component */
export default baseMixins.extend({
  name: 'activatable',

  props: {
    activator: {
      default: null as unknown as PropType<string | HTMLElement | VNode | Element | null>,
      validator: (val: string | object) => {
        return ['string', 'object'].includes(typeof val)
      },
    },
    disabled: Boolean,
    internalActivator: Boolean,
    openOnHover: Boolean,
    openOnFocus: Boolean,
  },

  data: () => ({
    // Do not use this directly, call getActivator() instead
    activatorElement: null as HTMLElement | null,
    activatorNode: [] as VNode[],
    events: ['click', 'mouseenter', 'mouseleave', 'focus'],
    listeners: {} as Listeners,
  }),

  watch: {
    activator: 'resetActivator',
    openOnFocus: 'resetActivator',
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

      const listeners: Listeners = {}

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

          e.stopPropagation()

          this.isActive = !this.isActive
        }
      }

      if (this.openOnFocus) {
        listeners.focus = (e: FocusEvent) => {
          this.getActivator(e)

          e.stopPropagation()

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
      } else if (this.activatorNode.length === 1 || (this.activatorNode.length && !e)) {
        // Use the contents of the activator slot
        // There's either only one element in it or we
        // don't have a click event to use as a last resort
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
      } else if (e) {
        // Activated by a click or focus event
        activator = (e.currentTarget || e.target) as HTMLElement
      }

      // The activator should only be a valid element (Ignore comments and text nodes)
      this.activatorElement = activator?.nodeType === Node.ELEMENT_NODE ? activator : null

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
      this.removeActivatorEvents()
      this.activatorElement = null
      this.getActivator()
      this.addActivatorEvents()
    },
  },
})
