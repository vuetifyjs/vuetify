<<<<<<< HEAD
import c1 from './VCheckbox'
import c2 from './VRadioGroup'
import c3 from './VRadio'
import c4 from './VSwitch'

import shared from '../../stylus/components/_input-groups.styl' // eslint-disable-line no-unused-vars
import styles from '../../stylus/components/_selection-controls.styl' // eslint-disable-line no-unused-vars

export function VCheckbox (Vue) {
  Vue.component('v-checkbox', c1)
}

export function VRadioGroup (Vue) {
  Vue.component('v-radio-group', c2)
}

export function VRadio (Vue) {
  Vue.component('v-radio', c3)
}

export function VSwitch (Vue) {
  Vue.component('v-switch', c4)
}
