import VProgressLinear from '../VProgressLinear'
import VRow from './VRow'


export default {
  name: 'v-table-progress',
  inject: ['dataTable'],
  render (h) {
    return h('div', {
      staticClass: 'thead v-data-table__progress'
    }, [this.dataTable.loading && h(VRow, [
      h(VProgressLinear, {
        props: {
          height: 2,
          active: true,
          indeterminate: true
        }
      })
    ])])
  }
}
