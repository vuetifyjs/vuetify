import {
  createSimpleFunctional
} from '../../util/helpers'

import VDataTable from './VDataTable'
import VEditDialog from './VEditDialog'

export default function install (Vue) {
  const VTableOverflow = createSimpleFunctional('table__overflow')

  Vue.component('v-data-table', VDataTable)
  Vue.component('v-edit-dialog', VEditDialog)
  Vue.component('v-table-overflow', VTableOverflow)
}
