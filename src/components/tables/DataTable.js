import Head from './mixins/head'
import Body from './mixins/body'
import Foot from './mixins/foot'

export default {
  name: 'datatable',

  mixins: [Head, Body, Foot],

  data () {
    return {
      asc: null,
      page: 1,
      rowsPerPage: 5,
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
    },
    rowsPerPageItems: {
      type: Array,
      default () {
        return [5, 10, 25]
      }
    }
  },

  computed: {
    pageStart () {
      return (this.page - 1) * this.rowsPerPage
    },
    pageStop () {
      return this.page * this.rowsPerPage
    },
    filteredItems () {
      const items = this.items.sort((a, b) => {
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

      return items.slice(this.pageStart, this.pageStop)
    }
  },

  watch: {
    rowsPerPage () {
      this.page = 1
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
    genTR (children) {
      return this.$createElement('tr', {}, children)
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
