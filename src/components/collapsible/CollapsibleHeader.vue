<template lang="pug">
  div(
    class="collapsible__header"
    v-on:click="click"
  )
    slot
</template>

<script>
  import Transitionable from '../../mixins/transitionable'
  
  export default {
    name: 'collapsible-header',

    mixins: [
      Transitionable
    ],

    data () {
      return {
        body_uid: null
      }
    },
    
    computed: {
      transitions () {
        return [
          [this.$el.parentNode, () => this.transitioning = false]
        ]
      }
    },

    mounted () {
      this.body_uid = Number(this.$el.nextSibling.getAttribute('uid'))
    },

    methods: {
      click () {
        if (!this.transitioning) {
          this.transitioning = true

          this.$vuetify.bus.pub(
            `collapse:toggle:${this.$parent._uid}`,
            this.body_uid
          )
        }
      }
    }
  }
</script>