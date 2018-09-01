import Vue from 'vue'
import mixins, { ExtractVue } from './../../util/mixins'

import VItemGroup from './VItemGroup'

import Groupable from '../../mixins/groupable'

type VItemGroupInstance = InstanceType<typeof VItemGroup>

interface options extends Vue {
  itemGroup: VItemGroupInstance
}

export default mixins<options & ExtractVue<typeof Groupable>>(Groupable).extend({
  name: 'v-item',

  inject: ['itemGroup']
})
