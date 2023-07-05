// Mixins
import Bootable from '../bootable'

// Utilities
import { getObjectValueByPath } from '../../util/helpers'
import mixins, { ExtractVue } from '../../util/mixins'
import { consoleWarn } from '../../util/console'

// Types
import { PropOptions } from 'vue'
import { VNode } from 'vue/types'

interface options {
  $el: HTMLElement
  $refs: {
    content?: HTMLElement
  }
}

function validateAttachTarget (val: any) {
  const type = typeof val

  if (type === 'boolean' || type === 'string') return true

  return val.nodeType === Node.ELEMENT_NODE
}

function removeActivator (activator: VNode[]) {
  activator.forEach(node => {
    node.elm &&
    node.elm.parentNode &&
    node.elm.parentNode.removeChild(node.elm)
  })
}

/* @vue/component */
export default mixins<options &
  /* eslint-disable indent */
  ExtractVue<typeof Bootable>
  /* eslint-enable indent */
>(Bootable).extend({
  name: 'detachable',

  props: {
    attach: {
      default: false,
      validator: validateAttachTarget,
    } as PropOptions<boolean | string | Element>,
    contentClass: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    activatorNode: null as null | VNode | VNode[],
    hasDetached: false,
  }),

  watch: {
    attach () {
      this.hasDetached = false
      this.initDetach()
    },
    hasContent () {
      this.$nextTick(this.initDetach)
    },
  },

  beforeMount () {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode]

        activator.forEach(node => {
          if (!node.elm) return
          if (!this.$el.parentNode) return

          const target = this.$el === this.$el.parentNode.firstChild
            ? this.$el
            : this.$el.nextSibling

          this.$el.parentNode.insertBefore(node.elm, target)
        })
      }
    })
  },

  mounted () {
    this.hasContent && this.initDetach()
  },

  deactivated () {
    this.isActive = false
  },

  beforeDestroy () {
    if (
      this.$refs.content &&
      this.$refs.content.parentNode
    ) {
      this.$refs.content.parentNode.removeChild(this.$refs.content)
    }
  },

  destroyed () {
    if (this.activatorNode) {
      const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode]
      if (this.$el.isConnected) {
        // Component has been destroyed but the element still exists, we must be in a transition
        // Wait for the transition to finish before cleaning up the detached activator
        const observer = new MutationObserver(list => {
          if (
            list.some(record => Array.from(record.removedNodes).includes(this.$el))
          ) {
            observer.disconnect()
            removeActivator(activator)
          }
        })
        observer.observe(this.$el.parentNode!, { subtree: false, childList: true })
      } else {
        removeActivator(activator)
      }
    }
  },

  methods: {
    getScopeIdAttrs () {
      const scopeId = getObjectValueByPath(this.$vnode, 'context.$options._scopeId')

      return scopeId && {
        [scopeId]: '',
      }
    },
    initDetach () {
      if (this._isDestroyed ||
        !this.$refs.content ||
        this.hasDetached ||
        // Leave menu in place if attached
        // and dev has not changed target
        this.attach === '' || // If used as a boolean prop (<v-menu attach>)
        this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
        this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) return

      let target
      if (this.attach === false) {
        // Default, detach to app
        target = document.querySelector('[data-app]')
      } else if (typeof this.attach === 'string') {
        // CSS selector
        target = document.querySelector(this.attach)
      } else {
        // DOM Element
        target = this.attach
      }

      if (!target) {
        consoleWarn(`Unable to locate target ${this.attach || '[data-app]'}`, this)
        return
      }

      target.appendChild(this.$refs.content)

      this.hasDetached = true
    },
  },
})
