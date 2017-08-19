<script>
  export default {
    name: 'v-avatar',

    functional: true,

    props: {
      size: {
        type: String,
        default: '48px'
      },
      tile: Boolean
    },

    render (h, { data, props, children }) {
      data.staticClass = (`avatar ${data.staticClass || ''}`).trim()
      data.style = data.style || {}

      if (props.tile) data.staticClass += ' avatar--tile'

      data.style.height = props.size
      data.style.width = props.size

      return h('div', data, children)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_avatars.styl"></style>
