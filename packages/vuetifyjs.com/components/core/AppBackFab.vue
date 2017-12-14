<template lang="pug">
  v-tooltip(right)
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
    name: 'app-back-fab',

    props: {
      to: null
    }
  }
</script>
