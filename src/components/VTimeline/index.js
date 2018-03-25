import VTimeline from './VTimeline'

export { VTimeline }

/* istanbul ignore next */
VTimeline.install = function install (Vue) {
  Vue.component(VTimeline.name, VTimeline)
}

export default VTimeline
