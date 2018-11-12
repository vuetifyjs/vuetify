import Vue from 'vue'
import { test } from '@/test'
import Groupable from '@/mixins/groupable'

const registrableWarning = '[Vuetify] The v-item component must be used inside a v-item-group'

const Mock = {
  mixins: [Groupable],
  render: h => h('div')
}

test('groupable.ts', ({ mount }) => {
  it('should register and unregister', async () => {
    //
  })
})
