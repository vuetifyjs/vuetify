import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataTableHeader from './VDataTableHeader'
import VEditDialog from './VEditDialog'
import VSimpleTable from './VSimpleTable'
import VVirtualTable from './VVirtualTable'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VDataTableHeader, VSimpleTable, VVirtualTable }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataTableHeader,
    VEditDialog,
    VTableOverflow,
    VSimpleTable,
    VVirtualTable,
  },
}
