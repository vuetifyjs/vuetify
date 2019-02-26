// Mixins
import Bootable from './bootable'

// Utilities
import { ExtractVue } from './../util/mixins'
import { consoleWarn } from '../util/console'
import mixins from '../util/mixins'

// Types
import Vue from 'vue'
import { VNode } from 'vue/types'
import { getObjectValueByPath } from '../util/helpers'

interface options extends Vue {
  $el: HTMLElement
  $refs: {
    content: HTMLElement
  }
}

function validateAttachTarget (val: any) {
  const type = typeof val

  if (type === 'boolean' || type === 'string') return true

  return val.nodeType === Node.ELEMENT_NODE
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
      validator: validateAttachTarget
    },
    contentClass: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    activatorNode: null as null | VNode | VNode[],
    hasDetached: false
  }),

  watch: {
    attach () {
      this.hasDetached = false
      this.initDetach()
    },
    hasContent: 'initDetach'
  },

  beforeMount () {
    this.$nextTick(() => {
      if (this.activatorNode) {
        const activator = Array.isArray(this.activatorNode) ? this.activatorNode : [this.activatorNode]

        activator.forEach(node => {
          node.elm &&
            this.$el.parentNode &&
            this.$el.parentNode.insertBefore(node.elm, this.$el)
        })
      }
    })
  },

  mounted () {
    !this.lazy && this.initDetach()
  },

  deactivated () {
    this.isActive = false
  },

  beforeDestroy () {
    const content = this.$refs.content

    if (!content || !content.parentNode) return

    // IE11 Fix
    try {
      content.parentNode.removeChild(content)
    } catch (e) { console.log(e) }
  },

  methods: {
    getScopeIdAttrs () {
      const scopeId = getObjectValueByPath(this.$vnode, 'context.$options._scopeId')

      return scopeId && {
        [scopeId]: ''
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

      target.insertBefore(
        this.$refs.content,
        target.firstChild
      )

      this.hasDetached = true
    }
  }
})
