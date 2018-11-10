<template>
  <div :id="id"><!-- Ad --></div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: undefined
      },
      scriptId: {
        type: String,
        default: undefined
      },
      src: {
        type: String,
        default: undefined
      }
    },

    data: () => ({
      timeout: null
    }),

    watch: {
      '$route.path': 'serve'
    },

    mounted () {
      if (!this.src) return

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = this.src

        if (this.scriptId) script.id = this.scriptId

        this.$el.append(script)
      }, 300)
    },

    methods: {
      serve: () => {} /* noop */
    }
  }
</script>
