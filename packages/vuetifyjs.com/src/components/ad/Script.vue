<template>
  <div :id="id"><!-- Ad --></div>
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'

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
      isBooted: false,
      script: null
    }),

    computed: {
      ...mapState('app', ['isLoading'])
    },

    watch: {
      isLoading (val) {
        if (!this.isBooted) {
          return (this.isBooted = true)
        }

        clearTimeout(this.timeout)

        if (val) return

        this.timeout = setTimeout(this.serve, 100)
      }
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
      serve: () => {} /* noop */
    }
  }
</script>
