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
      if (!this.sorting) return this.items

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
    genHeader (item, index) {
      const beingSorted = this.sorting === index
      const icon = beingSorted && this.asc
        ? 'arrow_upward'
        : 'arrow_downward'

      return this.$createElement('th', {
        'class': {
          'active': beingSorted
        },
        on: {
          click: () => this.sort(index)
        }
      }, [this.$createElement('v-icon', icon), item])
    },
    sort (index) {
      if (!this.sorting) {
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
    }
  },

  render (h) {
    const head = h('thead', [
      h('tr', this.headers.map((o, i) => this.genHeader(o, i)))
    ])

    const body = h('tbody', this.filteredItems.map(i => this.$scopedSlots.items({ item: i })))

    return h('table', {
      'class': 'datatable'
    }, [head, body])
  }
}
