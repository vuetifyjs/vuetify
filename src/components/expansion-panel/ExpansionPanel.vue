<template lang="pug">
  ul(
    v-bind:class="classes"
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
      classes () {
        return {
          'expansion-panel': true
        }
      },

      params () {
        return {
          expand: this.expand
        }
      }
    }
  }
</script>