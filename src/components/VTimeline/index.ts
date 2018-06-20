import VTimeline from './VTimeline'
import VTimelineItem from './VTimelineItem'

export { VTimeline, VTimelineItem }

/* istanbul ignore next */
VTimeline.install = function install (Vue) {
  Vue.component(VTimeline.options.name, VTimeline)
  Vue.component(VTimelineItem.options.name, VTimelineItem)
}

export default VTimeline
