<template>
  <div :id="id"><!-- Ad --></div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: undefined,
      },
      scriptId: {
        type: String,
        default: undefined,
      },
      src: {
        type: String,
        default: undefined,
      },
    },

    data: () => ({
      isBooted: false,
      script: null,
    }),

    watch: {
      '$route.path' () {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(this.serve, 100)
      },
    },

    mounted () {
      if (!this.src) return

      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = this.src
      script.id = this.scriptId

      if (this.$el) this.$el.append(script)
      else console.warn('%cPlease consider allowing ads, we\'ve gotta eat too :(', 'font-size: 24px')
    },

    methods: {
      serve: () => {}, /* noop */
    },
  }
</script>
