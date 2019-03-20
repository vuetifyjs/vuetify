// Components
import VOverlay from '../../components/VOverlay'

// Utilities
import { addOnceEventListener } from '../../util/helpers'

// Types
import Vue from 'vue'

interface Toggleable extends Vue {
  isActive?: boolean
}

interface Stackable extends Vue {
  activeZIndex: number
}

interface options {
  absolute?: boolean
  $refs: {
    dialog?: HTMLElement
    content?: HTMLElement
  }
}

/* @vue/component */
export default Vue.extend<Vue & Toggleable & Stackable & options>().extend({
  name: 'overlayable',

  props: {
    hideOverlay: Boolean
  },

  data () {
    return {
      overlay: null as InstanceType<typeof VOverlay> | null
    }
  },

  watch: {
    hideOverlay (value) {
      if (value) this.removeOverlay()
      else this.genOverlay()
    }
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    createOverlay () {
      const overlay = new VOverlay({
        propsData: {
          absolute: this.absolute,
          value: false
        }
      })

      overlay.$mount()

      const parent = this.absolute
        ? this.$el.parentNode
        : document.querySelector('[data-app]')

      parent && parent.insertBefore(overlay.$el, parent.firstChild)

      this.overlay = overlay
    },
    genOverlay () {
      if (!this.overlay) this.createOverlay()

      requestAnimationFrame(() => {
        if (!this.overlay) return

        if (this.activeZIndex !== undefined) {
          this.overlay.zIndex = String(this.activeZIndex - 1)
        }

        this.overlay.value = true
      })

      return true
    },
    /** removeOverlay(false) will not restore the scollbar afterwards */
    removeOverlay () {
      if (this.overlay) {
        addOnceEventListener(this.overlay.$el, 'transitionend', () => {
          if (
            !this.overlay ||
            !this.overlay.$el ||
            !this.overlay.$el.parentNode
          ) return

          this.overlay.$el.parentNode.removeChild(this.overlay.$el)
          this.overlay.$destroy()
          this.overlay = null
        })

        this.overlay.value = false
      }
    }
  }
})
