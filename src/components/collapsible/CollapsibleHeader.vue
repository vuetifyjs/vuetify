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
          Number(this.getNextSibling(this.$el).getAttribute('uid'))
        )
      },
      
      getNextSibling (el) {
        if (!(el = el.nextSibling)) return null
        
        while (el.nodeType != 1) {
          if (!(el = el.nextSibling)) return null
        }
      
        return el
      }
    }
  }
</script>