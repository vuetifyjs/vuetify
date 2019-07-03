// Utilities
import { removed } from '../../util/console'

// Types
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
    eager: Boolean,
  },

  data: () => ({
    isBooted: false,
  }),

  computed: {
    hasContent (): boolean | undefined {
      return this.isBooted || this.eager || this.isActive
    },
  },

  watch: {
    isActive () {
      this.isBooted = true
    },
  },

  created () {
    /* istanbul ignore next */
    if ('lazy' in this.$attrs) {
      removed('lazy', this)
    }
  },

  methods: {
    showLazyContent (content?: VNode[]): VNode[] | undefined {
      return this.hasContent ? content : undefined
    },
  },
})
