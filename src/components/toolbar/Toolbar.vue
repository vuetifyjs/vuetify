<template lang="pug">
  nav(
    class="toolbar"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    name: 'toolbar',

    props: {
      fixed: Boolean
    },

    computed: {
      classes () {
        return {
          'toolbar--fixed': this.fixed
        }
      }
    }
  }
</script>