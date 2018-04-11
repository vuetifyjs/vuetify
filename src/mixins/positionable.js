import Vue from 'vue'
import { filterObjectOnKeys } from '../util/helpers'

const props = Object.freeze({
  absolute: Boolean,
  bottom: Boolean,
  fixed: Boolean,
  left: Boolean,
  right: Boolean,
  top: Boolean
})

export function factory (selected = []) {
  return Vue.extend({
    props: selected.length ? filterObjectOnKeys(props, selected) : props
  })
}

export default factory()
