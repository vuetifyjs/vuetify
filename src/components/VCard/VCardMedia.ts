// Components
import VImg from '../VImg/VImg'

// Utils
import { deprecate } from '../../util/console'

/* @vue/component */
export default VImg.extend({
  name: 'v-card-media',

  mounted () {
    deprecate('v-card-media', this.src ? 'v-img' : 'v-responsive', this)
  }
})
