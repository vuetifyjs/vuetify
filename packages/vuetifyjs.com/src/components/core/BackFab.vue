<template lang="pug">
  v-tooltip(lazy right)
    v-btn(
      fab
      dark
      fixed
      top
      left
      :to="to"
      color="primary"
      slot="activator"
    )
      v-icon keyboard_arrow_left
    span Back to Documentation
</template>

<script>
  export default {
    name: 'AppBackFab',

    props: {
      to: {
        type: null,
        default: null
      }
    }
  }
</script>
