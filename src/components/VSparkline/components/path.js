import { genPath } from '../helpers/path'

export default {
  props: ['smooth', 'radius', 'id', 'points'],

  render (h) {
    const { smooth, id } = this
    const radius = smooth === true ? 8 : Number(smooth)
    const d = genPath(this.points, radius)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${id})` }
    })
  }
}
