import {
  createSimpleFunctional
} from '../../util/helpers'

import VDataTable from './VDataTable'
import VEditDialog from './VEditDialog'

VDataTable.install = function install (Vue) {
  const VTableOverflow = createSimpleFunctional('table__overflow')

  Vue.component(VDataTable.name, VDataTable)
  Vue.component(VEditDialog.name, VEditDialog)
  Vue.component('v-table-overflow', VTableOverflow)
}

export default VDataTable
