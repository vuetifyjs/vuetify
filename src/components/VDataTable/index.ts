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

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VEditDialog,
    VTableOverflow,
    VRow,
    VRowGroup,
    VRowExpandable,
    VCell,
    VCellCheckbox,
    VTableActions,
    VTableHeaders,
    VTableProgress
  }
}
