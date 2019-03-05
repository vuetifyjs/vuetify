import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataTableHeader from './VDataTableHeader'
import VRow from './VRow'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'
import VSimpleTable from './VSimpleTable'
import VVirtualTable from './VVirtualTable'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VRow, VRowGroup, VDataTableHeader, VSimpleTable, VVirtualTable }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataTableHeader,
    VRow,
    VRowGroup,
    VEditDialog,
    VTableOverflow,
    VSimpleTable,
    VVirtualTable
  }
}
