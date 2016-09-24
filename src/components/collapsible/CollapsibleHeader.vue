<template lang="pug">
  div(
    v-bind:class="classes"
    @click="click"
  )
    slot
</template>

<script>
  import Transitionable from '../../util/transitionable'
  export default {
    name: 'collapsible-header',

    mixins: [
      Transitionable
    ],

    data () {
      return {
        body_uid: null,
        transitioning: false
      }
    },
    
    computed: {
      classes () {
        return {
          'collapsible__header': true
        }
      },

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