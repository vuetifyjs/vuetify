// Utilities
import { defineComponent, h, VNode } from 'vue'
import { removed } from '../../util/console'

// interface Toggleable extends Vue {
//   isActive?: boolean
// }

/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
export default defineComponent({
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
    showLazyContent (content?: () => VNode[]): VNode[] {
      return (this.hasContent && content) ? content() : [h('')]
    },
  },
})
