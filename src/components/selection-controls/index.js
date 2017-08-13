import c1 from './VCheckbox'
import c2 from './VRadio'
import c3 from './VSwitch'

import shared from '../../stylus/components/_input-groups.styl' // eslint-disable-line no-unused-vars
import styles from '../../stylus/components/_selection-controls.styl' // eslint-disable-line no-unused-vars

export function VCheckbox (Vue) {
  Vue.component('v-checkbox', c1)
}

export function VRadio (Vue) {
  Vue.component('v-radio', c2)
}

export function VSwitch (Vue) {
  Vue.component('v-switch', c3)
}
