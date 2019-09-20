// Styles
import './VSkeletonLoader.sass'

// Mixins
import Elevatable from '../../mixins/elevatable'
import Measurable from '../../mixins/measurable'
import Themeable from '../../mixins/themeable'

// Utilities
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

/* @vue/component */
export default mixins(
  Elevatable,
  Measurable,
  Themeable
).extend({
  name: 'VSkeletonLoader',

  props: {
    boilerplate: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: '',
    },
    types: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    classes (): object {
      return {
        'v-skeleton-loader--boilerplate': this.boilerplate,
        'v-skeleton-loader--tile': this.tile,
        ...this.themeClasses,
        ...this.elevationClasses,
      }
    },
    rootTypes (): Record<string, string> {
      return {
        actions: 'button@2',
        article: 'heading, paragraph',
        avatar: 'avatar',
        button: 'button',
        card: 'image, card-heading',
        'card-avatar': 'image, list-item-avatar',
        'card-heading': 'heading',
        chip: 'chip',
        'date-picker': 'list-item, card-heading, divider, date-picker-options, date-picker-days, actions',
        'date-picker-options': 'text, avatar@2',
        'date-picker-days': 'avatar@28',
        heading: 'heading',
        image: 'image',
        'list-item': 'text',
        'list-item-avatar': 'avatar, text',
        'list-item-two-line': 'sentences',
        'list-item-avatar-two-line': 'avatar, sentences',
        'list-item-three-line': 'paragraph',
        'list-item-avatar-three-line': 'avatar, paragraph',
        paragraph: 'text@3',
        sentences: 'text@2',
        table: 'table-heading, table-thead, table-tbody, table-tfoot',
        'table-heading': 'heading, text',
        'table-thead': 'heading@6',
        'table-tbody': 'table-row-divider@6',
        'table-row-divider': 'table-row, divider',
        'table-row': 'table-cell@6',
        'table-cell': 'text',
        'table-tfoot': 'text@2, avatar@2',
        text: 'text',
        ...this.types,
      }
    },
  },

  methods: {
    genBone (text: string, children: VNode[]) {
      return this.$createElement('div', {
        staticClass: `v-skeleton-loader__${text} v-skeleton-loader__bone`,
      }, children)
    },
    genBones (bone: string): VNode[] {
      // e.g. 'text@3'
      const [type, length] = bone.split('@') as [string, number]
      const generator = () => this.genSkeleton(type)

      // Generate a length array based upon
      // value after @ in the bone string
      return Array.from({ length }).map(generator)
    },
    genSkeleton (type?: string): any {
      let children = []
      type = type || this.type || ''
      const bone = this.rootTypes[type] || ''

      // Do nothing
      /* eslint-disable-next-line no-empty, brace-style */
      if (type === bone) {}
      // End of recursion - e.g. heading, paragraph, text@2'
      else if (type.indexOf(',') > -1) return this.mapBones(type)
      // Array of values - e.g. 'paragraph@4'
      else if (type.indexOf('@') > -1) return this.genBones(type)
      // Array of values - e.g. 'card@2
      else if (bone.indexOf(',') > -1) children = this.mapBones(bone)
      // Array of values - e.g. 'list-item@2
      else if (bone.indexOf('@') > -1) children = this.genBones(bone)
      // Single value - e.g. 'card-heading'
      else if (bone) children.push(this.genSkeleton(bone))

      return [this.genBone(type, children)]
    },
    mapBones (bones: string) {
      // Remove spaces and return array of skeletons
      return bones.replace(/\s/g, '').split(',').map(this.genSkeleton)
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-skeleton-loader',
      attrs: !this.boilerplate ? {
        'aria-busy': true,
        'aria-live': 'polite',
        role: 'alert',
        ...this.$attrs,
      } : {},
      on: this.$listeners,
      class: this.classes,
      style: this.measurableStyles,
    }, [this.genSkeleton()])
  },
})
