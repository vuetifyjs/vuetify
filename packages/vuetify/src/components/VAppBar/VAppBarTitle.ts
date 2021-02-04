// Mixins
import { inject } from '../../mixins/registrable'

// Types
import { VNode } from 'vue'
import { ExtractVue } from '../../util/mixins'
import VAppBar from './VAppBar'

// Utilities
import { convertToUnit } from '../../util/helpers'
import { easeInOutCubic } from '../../services/goto/easing-patterns'

const base = inject<'VAppBar', typeof VAppBar>('VAppBar', 'v-app-bar-title', 'v-app-bar')

interface options extends ExtractVue<typeof base> {
  $refs: {
    content: Element
    placeholder: Element
  }
}

export default base.extend<options>().extend({
  name: 'v-app-bar-title',

  data: () => ({
    contentWidth: 0,
    left: 0,
    width: 0,
  }),

  watch: {
    '$vuetify.breakpoint.width': 'updateDimensions',
  },

  computed: {
    styles (): object {
      if (!this.contentWidth) return {}

      const min = this.width
      const max = this.contentWidth
      const ratio = easeInOutCubic(Math.min(1, this.VAppBar.scrollRatio * 1.5))
      return {
        width: convertToUnit(min + (max - min) * ratio),
        visibility: this.VAppBar.scrollRatio ? 'visible' : 'hidden',
      }
    },
  },

  mounted () {
    this.updateDimensions()
  },

  methods: {
    updateDimensions (): void {
      const dimensions = this.$refs.placeholder.getBoundingClientRect()
      this.width = dimensions.width
      this.left = dimensions.left
      this.contentWidth = this.$refs.content.scrollWidth
    },
  },

  render (h): VNode {
    return h('div', {
      class: 'v-toolbar__title v-app-bar-title',
    }, [
      h('div', {
        class: 'v-app-bar-title__content',
        style: this.styles,
        ref: 'content',
      }, [this.$slots.default]),
      h('div', {
        class: 'v-app-bar-title__placeholder',
        style: {
          visibility: this.VAppBar.scrollRatio ? 'hidden' : 'visible',
        },
        ref: 'placeholder',
      }, [this.$slots.default]),
    ])
  },
})
