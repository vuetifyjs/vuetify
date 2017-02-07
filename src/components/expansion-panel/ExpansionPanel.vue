<template lang="pug">
  ul(
    class="expansion-panel"
  )
    slot
</template>

<script>
  export default {
    name: 'expansion-panel',

    props: {
      expand: Boolean
    },

    computed: {
      params () {
        return {
          expand: this.expand
        }
      }
    }
  }
</script>