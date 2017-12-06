import {
  createSimpleFunctional
} from '../../util/helpers'

import VDataTable from './VDataTable'
import VEditDialog from './VEditDialog'

const VTableOverflow = createSimpleFunctional('table__overflow')

export { VDataTable, VEditDialog, VTableOverflow }

/* istanbul ignore next */
VDataTable.install = function install (Vue) {
  Vue.component(VDataTable.name, VDataTable)
  Vue.component(VEditDialog.name, VEditDialog)
  Vue.component(VTableOverflow.name, VTableOverflow)
}

export default VDataTable
