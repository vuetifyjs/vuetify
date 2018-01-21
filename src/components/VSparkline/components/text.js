export default {
  props: ['points', 'boundary', 'offsetX'],

  render (h) {
    const offsetX = (this.offsetX || 0) / 2

    return h(
      'g',
      {
        style: {
          fontSize: '8',
          textAnchor: 'middle',
          dominantBaseline: 'mathematical',
          fill: this.$vuetify.theme.secondary
        }
      },
      this.points.map((item, index) => {
        return h(
          'text',
          {
            attrs: {
              x: item.x - offsetX,
              y: this.boundary.maxY + 2
            }
          },
          item.value
        )
      })
    )
  }
}
