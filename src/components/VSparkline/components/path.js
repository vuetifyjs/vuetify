import { genLinearPath, genSmoothPath } from '../helpers/path'
import { genPoints } from '../helpers/core'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id'],

  render (h) {
    const points = genPoints(this.data, this.boundary)
    const d = (this.smooth ? genSmoothPath : genLinearPath)(points, this.radius)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${this.id})` }
    })
  }
}
