import { createSimpleFunctional } from '../../util/helpers'

import MobileRow from './MobileRow'
import Row from './Row'
import RowGroup from './RowGroup'
import VDataTable from './VDataTable'
import VDataTableHeader from './VDataTableHeader'
import VDataTableHeaderDesktop from './VDataTableHeaderDesktop'
import VDataTableHeaderMobile from './VDataTableHeaderMobile'
import VEditDialog from './VEditDialog'
import VSimpleTable from './VSimpleTable'
import VVirtualTable from './VVirtualTable'

const VTableOverflow = createSimpleFunctional('v-table__overflow')

export {
  MobileRow,
  Row,
  RowGroup,
  VDataTable,
  VEditDialog,
  VTableOverflow,
  VDataTableHeader,
  VDataTableHeaderDesktop,
  VDataTableHeaderMobile,
  VSimpleTable,
  VVirtualTable,
}

export default {
  $_vuetify_subcomponents: {
    MobileRow,
    Row,
    RowGroup,
    VDataTable,
    VDataTableHeader,
    VDataTableHeaderDesktop,
    VDataTableHeaderMobile,
    VEditDialog,
    VTableOverflow,
    VSimpleTable,
    VVirtualTable,
  },
}
