<template lang="pug">
  div(
    v-bind:class="classes"
    @click="click"
  )
    slot
</template>

<script>
  export default {
    name: 'collapsible-header',
    
    computed: {
      classes () {
        return {
          'collapsible__header': true
        }
      }
    },

    methods: {
      click () {
        this.$vuetify.bus.pub(
          `collapse:toggle:${this.$parent._uid}`,
          this.$el.nextSibling.getAttribute('uid')
        )
      }
    }
  }
</script>