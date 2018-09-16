import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataHeader from './VDataHeader'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VDataHeader, VRowGroup }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataHeader,
    VRowGroup,
    VEditDialog,
    VTableOverflow
  }
}
