<template lang="pug">
  div(
    class="collapsible__header"
    v-on:click="click"
  )
    slot
</template>

<script>  
  export default {
    name: 'collapsible-header',

    methods: {
      click () {
        this.$vuetify.bus.pub(
          `collapse:toggle:${this.$parent._uid}`,
          Number(this.$el.nextSibling.getAttribute('uid'))
        )
      }
    }
  }
</script>