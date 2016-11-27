<template lang="pug">
  div(
    class="tabs"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tabs',

    mounted () {
      this.init()
    },

    activated () {
      this.init()
    },

    methods: {
      init () {
        if (window.location.hash === '') {
          return
        }

        let active = window.location.hash.substr(1)
        
        this.$children.forEach(i => {
          if (active === i.$el.id) {
            this.$vuetify.bus.pub('tab:open', i.$el.id)
          }
        })
      }
    }
  }
</script>