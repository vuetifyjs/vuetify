import Vue from 'vue'
import mixins from '../../util/mixins'
import VDataTable from './VDataTable';

type VDataTableInstance = InstanceType<typeof VDataTable>

interface options extends Vue {
  dataTable: VDataTableInstance
}

export default mixins<options>().extend({
  name: 'v-table-body'
})
