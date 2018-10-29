import { createSimpleFunctional } from '../../util/helpers'

import VDataTable from './VDataTable'
import VDataHeader from './VDataHeader'
import VDataHeaderMobile from './VDataHeaderMobile'
import VRowGroup from './VRowGroup'
import VEditDialog from './VEditDialog'
import VRow from './VRow'
import VRowExpansion from './VRowExpansion'
import VTableVirtual from './VTableVirtual'
import VTable from './VTable'
import VDataTableServer from './VDataTableServer'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export {
  VDataTable,
  VEditDialog,
  VTableOverflow,
  VDataHeader,
  VDataHeaderMobile,
  VRowGroup,
  VRow,
  VRowExpansion,
  VTableVirtual,
  VTable,
  VDataTableServer
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
    VRowExpansion,
    VTableVirtual,
    VTable,
    VDataTableServer
  }
}
