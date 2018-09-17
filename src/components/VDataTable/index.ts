import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataHeader from './VDataHeader'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'
import VRowSimple from './VRowSimple'
import VCellCheckbox from './VCellCheckbox'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow, VDataHeader, VRowGroup, VRowSimple, VCellCheckbox }

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VDataHeader,
    VRowGroup,
    VRowSimple,
    VEditDialog,
    VTableOverflow,
    VCellCheckbox
  }
}
