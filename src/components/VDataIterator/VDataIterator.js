import '../../stylus/components/_data-iterator.styl'

import DataIterable from '../../mixins/data-iterable'

/* @vue/component */
export default {
  name: 'v-data-iterator',

  mixins: [DataIterable],

  inheritAttrs: false,

  props: {
    contentTag: {
      type: String,
      default: 'div'
    },
    contentProps: {
      type: Object,
      required: false
    },
    contentClass: {
      type: String,
      required: false
    }
  },

  computed: {
    classes () {
      return {
        'v-data-iterator': true,
        'v-data-iterator--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    }
  },

  created () {
    this.initPagination()
  },

  methods: {
    genContent () {
      const children = this.genItems()

      const data = {
        'class': this.contentClass,
        attrs: this.$attrs,
        on: this.$listeners,
        props: this.contentProps
      }

      return this.$createElement(this.contentTag, data, children)
    },
    genEmptyItems (content) {
      return [this.$createElement('div', {
        'class': 'text-xs-center',
        style: 'width: 100%'
      }, content)]
    },
    genFilteredItems () {
      if (!this.$scopedSlots.item) {
        return null
      }

      const items = []
      for (let index = 0, len = this.filteredItems.length; index < len; ++index) {
        const item = this.filteredItems[index]
        const props = this.createProps(item, index)
        items.push(this.$scopedSlots.item(props))
      }

      return items
    },
    genFooter () {
      const children = []

      if (this.$slots.footer) {
        children.push(this.$slots.footer)
      }

      if (!this.hideActions) {
        children.push(this.genActions())
      }

      if (!children.length) return null
      return this.$createElement('div', children)
    },
    genHeader () {
      const children = []

      if (this.$slots.header) {
        children.push(this.$slots.header)
      }

      if (!children.length) return null
      return this.$createElement('div', children)
    }
  },

  render (h) {
    return h('div', {
      'class': this.classes
    }, [
      this.genHeader(),
      this.genContent(),
      this.genFooter()
    ])
  }
}
