// Extensions
import VMain from '../VMain/VMain'
import { deprecate } from '../../util/console'

/* @vue/component */
export default VMain.extend({
  name: 'v-main',

  created () {
    deprecate('v-content', 'v-main', this)
  },
})
