import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataHeader from './VDataHeader'
import VDataHeaderMobile from './VDataHeaderMobile'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'
import VRow from './VRow'
import VRowFunctional from './VRowFunctional'
import VRowRegular from './VRowRegular'
import VRowExpansion from './VRowExpansion'
import VCellCheckbox from './VCellCheckbox'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export {
  VDataTable,
  VEditDialog,
  VTableOverflow,
  VDataHeader,
  VDataHeaderMobile,
  VRowGroup,
  VCellCheckbox,
  VRow,
  VRowRegular,
  VRowFunctional,
  VRowExpansion
}

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VEditDialog,
    VTableOverflow,
    VDataHeader,
    VDataHeaderMobile,
    VRowGroup,
    VCellCheckbox,
    VRow,
    VRowRegular,
    VRowFunctional,
    VRowExpansion
  }
}
