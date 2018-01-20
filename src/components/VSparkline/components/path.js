import { genPath } from '../helpers/path'
import { genPoints } from '../helpers/core'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id'],

  render (h) {
    const { data, boundary, smooth, id } = this
    const points = genPoints(data, boundary)
    const radius = smooth === true ? 8 : Number(smooth)
    const d = genPath(points, radius)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${id})` }
    })
  }
}
