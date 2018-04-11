import VDataIterator from '../VDataIterator'
import VCellCheckbox from './VCellCheckbox'
import VPagination from '../VPagination'

export default {
  name: 'v-data-table',
  inheritAttrs: false,
  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    showSelectAll: {
      type: Boolean
    }
  },
  methods: {
    genSelectAll (h, props) {
      return h(VCellCheckbox, {
        attrs: {
          inputValue: props.everyItem,
          indeterminate: !props.everyItem && props.someItems
        },
        on: {
          change: props.toggleSelected
        }
      })
    },
    genHeaders (h, props) {
      const columns = this.columns.map(c => {
        const align = c.align || 'text-xs-left'

        return h('div', {
          staticClass: [align],
        }, [c.text])
      })

      if (this.showSelectAll) columns.unshift(this.genSelectAll(h, props))

      return h('div', {
        staticClass: 'd-flex',
      }, columns)
    },
    genFooters (h, props) {
      return h(VPagination, {
        props: {
          value: props.page,
          length: props.pageCount
        },
        on: {
          input: v => props.page = v
        }
      })
    }
  },
  render (h) {
    const children = []

    const scopedSlots = {
      header: props => this.genHeaders(h, props),
      footer: props => this.genFooters(h, props)
    }

    if (this.$scopedSlots.item) {
      scopedSlots['item'] = props => this.$scopedSlots.item(props)
    }

    // TODO: Is there a cleaner way of doing this?
    // That preferrably does not wrap slot in an extra div
    // Not sure why simply doing children.push(...this.$slots.whatever) is not working
    const slotKeys = Object.keys(this.$slots)
    const slots = slotKeys.map(key => {
      return this.$slots[key].map(vnode => {
        return h('div', {
          slot: key
        }, [vnode])
      })
    })

    children.push(slots)

    return h(VDataIterator, {
      props: {
        classPrefix: 'v-data-table',
        ...this.$attrs
      },
      scopedSlots
    }, children)
  }
}
