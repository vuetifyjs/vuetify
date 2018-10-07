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
import VTableVirtual from './VTableVirtual'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export {
  VDataTable,
  VEditDialog,
  VTableOverflow,
  VDataHeader,
  VDataHeaderMobile,
  VRowGroup,
  VRow,
  VRowRegular,
  VRowFunctional,
  VRowExpansion,
  VTableVirtual
}

export default {
  $_vuetify_subcomponents: {
    VDataTable,
    VEditDialog,
    VTableOverflow,
    VDataHeader,
    VDataHeaderMobile,
    VRowGroup,
    VRow,
    VRowRegular,
    VRowFunctional,
    VRowExpansion,
    VTableVirtual
  }
}
