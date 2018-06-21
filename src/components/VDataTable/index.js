import {
  createSimpleFunctional
} from '../../util/helpers'

import VDataTable from './VDataTable'
import VEditDialog from './VEditDialog'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export { VDataTable, VEditDialog, VTableOverflow }

VDataTable.$_vuetify_subcomponents = {
  VEditDialog,
  VTableOverflow
}

export default VDataTable
