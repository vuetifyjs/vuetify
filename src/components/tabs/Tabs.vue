<template lang="pug">
  div(
    class="tabs"
    v-bind:class="classes"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tabs',

    props: {
      centered: Boolean,
      
      grow: Boolean
    },

    mounted () {
      this.init()
    },

    activated () {
      this.init()
    },

    computed: {
      classes () {
        return {
          'tabs--grow': this.grow,
          'tabs--centered': this.centered
        }
      }
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