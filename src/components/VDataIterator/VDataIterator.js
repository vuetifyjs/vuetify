require('../../stylus/components/_data-iterator.styl')

import DataIterable from '../../mixins/data-iterable'

export default {
  name: 'v-data-iterator',

  mixins: [DataIterable],

  inheritAttrs: false,

  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    classes () {
      return {
        'dataiterator': true,
        'dataiterator--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      }
    }
  },

  methods: {
    createProps (item, index) {
      const props = { item, index }
      const key = this.itemKey

      Object.defineProperty(props, 'selected', {
        get: () => this.selected[item[this.itemKey]],
        set: (value) => {
          let selected = this.value.slice()
          if (value) selected.push(item)
          else selected = selected.filter(i => i[key] !== item[key])
          this.$emit('input', selected)
        }
      })

      return props
    },
    genContent () {
      const children = this.genItems()

      const data = {
        attrs: { ...this.$attrs }
      }

      return this.$createElement(this.tag, data, children)
    },
    genEmptyItems (content) {
      return this.$createElement('div', {
        'class': 'text-xs-center',
        style: 'width: 100%'
      }, content)
    },
    genFilteredItems () {
      const items = []
      this.filteredItems.forEach((item, index) => {
        const props = this.createProps(item, index)
        const itemSlot = this.$scopedSlots.item
          ? this.$scopedSlots.item(props)
          : []

        items.push(itemSlot)
      })

      return items
    },
    genItems () {
      const children = []

      if (!this.itemsLength && !this.items.length) {
        const noData = this.$slots['no-data'] || this.noDataText
        children.push(this.genEmptyItems(noData))
      } else if (!this.filteredItems.length) {
        const noResults = this.$slots['no-results'] || this.noResultsText
        children.push(this.genEmptyItems(noResults))
      } else {
        children.push(this.genFilteredItems())
      }

      return children
    },
    genFooter () {
      const children = []

      if (this.$slots.footer) {
        children.push(this.$slots.footer)
      }

      if (!this.hideActions) {
        children.push(this.$createElement('div', this.genActions())
        )
      }

      if (!children.length) return null
      return this.$createElement('div', children)
    }
  },

  created () {
    this.initPagination()
  },

  render (h) {
    return h('div', {
      'class': this.classes
    }, [
      this.genContent(),
      this.genFooter()
    ])
  }
}
