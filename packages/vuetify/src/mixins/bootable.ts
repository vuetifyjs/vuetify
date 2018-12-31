import Vue, { VNode } from 'vue'

interface Toggleable extends Vue {
  isActive?: boolean
}

/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* @vue/component */
export default Vue.extend<Vue & Toggleable>().extend({
  name: 'bootable',

  props: {
    lazy: Boolean
  },

  data: () => ({
    isBooted: false
  }),

  computed: {
    hasContent (): boolean | undefined {
      return this.isBooted || !this.lazy || this.isActive
    }
  },

  watch: {
    isActive () {
      this.isBooted = true
    }
  },

  methods: {
    showLazyContent (content?: VNode[]): VNode[] | undefined {
      return this.hasContent ? content : undefined
    }
  }
})
