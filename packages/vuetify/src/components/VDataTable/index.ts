import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataTableHeader from './VDataTableHeader'
import VRow from './VRow'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VRow, VRowGroup, VDataTableHeader }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataTableHeader,
    VRow,
    VRowGroup,
    VEditDialog,
    VTableOverflow
  }
}
