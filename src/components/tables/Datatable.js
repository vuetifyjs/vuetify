export default {
  name: 'datatable',

  data () {
    return {
      asc: null,
      sorting: null
    }
  },

  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filteredItems () {
      if (this.sorting === null) return this.items
      return this.items.sort((a, b) => {
        const sortA = a[Object.keys(a)[this.sorting]]
        const sortB = b[Object.keys(b)[this.sorting]]

        if (this.asc) {
          if (sortA < sortB) return -1
          if (sortA > sortB) return 1
          return 0
        } else {
          if (sortA < sortB) return 1
          if (sortA > sortB) return -1
          return 0
        }
      })
    }
  },

  methods: {
    sort (index) {
      if (this.sorting === null) {
        this.sorting = index
        this.asc = true
      } else if (this.sorting === index && this.asc) {
        this.asc = false
      } else if (this.sorting !== index) {
        this.sorting = index
        this.asc = true
      } else {
        this.sorting = null
        this.asc = null
      }
    },

    genNextIcon () {
      return this.$createElement('v-icon', {

      }, 'chevron_right')
    },
    genPrevIcon () {
      return this.$createElement('v-icon', {

      }, 'chevron_left')
    },
    genHeader (item, index) {
      const beingSorted = this.sorting === index
      const icon = beingSorted && this.asc
        ? 'arrow_upward'
        : 'arrow_downward'

      return this.$createElement('th', {
        'class': {
          'active': beingSorted
        },
        on: { click: () => this.sort(index) }
      }, [
        this.$createElement('v-icon', icon),
        this.$scopedSlots.headers ? this.$scopedSlots.headers({ item }) : item
      ])
    },
    genSelect () {
      return this.$createElement('div', {}, 'Rows per page:')
    },
    genPagination () {
      return this.$createElement('div', {}, '1-10 of 100')
    },
    genActions () {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [
        this.genSelect(),
        this.genPagination(),
        this.genPrevIcon(),
        this.genNextIcon()
      ])]
    },
    genTR (children) {
      return this.$createElement('tr', {}, children)
    },
    genTHead () {
      const children = this.headers.map((o, i) => this.genHeader(o, i))
      const checkbox = this.$createElement('v-checkbox', {
        props: {
          'hide-details': true,
          primary: true
        }
      })

      children.unshift(this.$createElement('th', [checkbox]))

      return this.$createElement('thead', [this.genTR(children)])
    },
    genTBody () {
      return this.$createElement('tbody', this.filteredItems.map(item => this.$scopedSlots.items({ item })))
    },
    genTFoot () {
      return this.$createElement('tfoot', [
        this.genTR([
          this.$createElement('td', {
            domProps: { colspan: '100%' }
          }, this.genActions())
        ])
      ])
    }
  },

  render (h) {
    return h('v-table-overflow', {}, [
      h('table', {
        'class': 'datatable'
      }, [
        this.genTHead(),
        this.genTBody(),
        this.genTFoot()
      ])
    ])
  }
}
