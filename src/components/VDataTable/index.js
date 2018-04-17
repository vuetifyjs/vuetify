import {
  createSimpleFunctional
} from '../../util/helpers'

import VDataTable from './VDataTable'
import VEditDialog from './VEditDialog'
import VRow from './VRow'
import VCell from './VCell'
import VCellCheckbox from './VCellCheckbox'
import VTableActions from './VTableActions'
import VTableHeaders from './VTableHeaders'
import VRowExpandable from './VRowExpandable'
import VRowGroup from './VRowGroup'
import VTableProgress from './VTableProgress'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VRow, VCell, VCellCheckbox, VTableActions }

/* istanbul ignore next */
VDataTable.install = function install (Vue) {
  Vue.component(VDataTable.name, VDataTable)
  Vue.component(VEditDialog.name, VEditDialog)
  Vue.component(VTableOverflow.name, VTableOverflow)
  Vue.component(VCell.name, VCell)
  Vue.component(VCellCheckbox.name, VCellCheckbox)
  Vue.component(VRow.name, VRow)
  Vue.component(VTableActions.name, VTableActions)
  Vue.component(VTableHeaders.name, VTableHeaders)
  Vue.component(VRowExpandable.name, VRowExpandable)
  Vue.component(VRowGroup.name, VRowGroup)
  Vue.component(VTableProgress.name, VTableProgress)
}

export default VDataTable
