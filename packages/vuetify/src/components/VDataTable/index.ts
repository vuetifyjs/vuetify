import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataTableHeader from './VDataTableHeader'
import VRow from './VRow'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'
import VSimpleTable from './VSimpleTable'
import VVirtualTable from './VVirtualTable'
import VMobileRow from './VMobileRow'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VRow, VRowGroup, VDataTableHeader, VSimpleTable, VVirtualTable, VMobileRow }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataTableHeader,
    VRow,
    VMobileRow,
    VRowGroup,
    VEditDialog,
    VTableOverflow,
    VSimpleTable,
    VVirtualTable
  }
}
