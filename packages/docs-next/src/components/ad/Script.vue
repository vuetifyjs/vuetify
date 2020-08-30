<template>
  <div :id="id" />
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'AdScript',

    props: {
      id: {
        type: String,
        required: true,
      },
      scriptId: {
        type: String,
        required: true,
      },
      src: {
        type: String,
        required: true,
      },
    },

    data: () => ({ script: null }),

    async created () {
      if (!IN_BROWSER) return

      const script = document.createElement('script')
      const onError = () => this.$emit('script:error')

      script.type = 'text/javascript'
      script.id = this.scriptId
      script.src = this.src
      script.onload = () => this.$emit('script:load')
      script.onerror = onError

      this.script = script

      await wait(1000)

      // If script fails or is blocked
      // will only contain script el
      if (this.$el.children.length <= 1) onError()
    },

    mounted () {
      this.$el && this.$el.appendChild(this.script)
    },

    beforeDestroy () {
      this.$el && this.$el.removeChild(this.script)
    },
  }
</script>
