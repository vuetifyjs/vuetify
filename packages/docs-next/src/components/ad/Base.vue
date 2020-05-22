<template>
  <v-sheet
    outlined
    rounded
    width="362"
  >
    <div :id="id">
      <!-- Ad -->
    </div>
  </v-sheet>
</template>

<script>
  export default {
    name: 'BaseAd',

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

    data: () => ({
      hasError: false,
      script: null,
    }),

    created () {
      const script = document.createElement('script')

      script.type = 'text/javascript'
      script.id = this.scriptId
      script.src = this.src
      script.onerror = () => (this.hasError = true)

      this.script = script
    },

    mounted () {
      this.$el && this.$el.appendChild(this.script)
    },
  }
</script>
