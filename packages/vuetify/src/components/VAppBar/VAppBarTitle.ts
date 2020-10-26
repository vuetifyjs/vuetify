// Mixins
import { inject } from '../../mixins/registrable'

// Types
import { VNode } from 'vue'
import { ExtractVue } from '../../util/mixins'
import VAppBar from './VAppBar'

// Helpers
import { convertToUnit } from '../../util/helpers'

const base = inject<'VAppBar', typeof VAppBar>('VAppBar', 'v-app-bar-title', 'v-app-bar')

interface options extends ExtractVue<typeof base> {
  $refs: {
    content: Element
  }
}

export default base.extend<options>().extend({
  name: 'v-app-bar-title',

  data: () => ({
    width: 0,
    contentWidth: 0,
    left: 0,
  }),

  watch: {
    '$vuetify.breakpoint.width': 'updateDimensions',
  },

  computed: {
    styles (): object {
      if (!this.contentWidth) return {}

      const min = this.width
      const max = this.contentWidth
      return {
        width: convertToUnit(min + (max - min) * this.VAppBar.scrollRatio),
        visibility: this.VAppBar.scrollRatio ? 'visible' : 'hidden',
      }
    },
  },

  mounted () {
    this.updateDimensions()
    this.contentWidth = this.$refs.content.getBoundingClientRect().width
  },

  methods: {
    updateDimensions (): void {
      const dimensions = this.$el.getBoundingClientRect()
      this.width = dimensions.width
      this.left = dimensions.left
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
      }, [this.$slots.default]),
    ])
  },
})
