<template lang="pug">
  div(
    class="tabs"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Eventable from '../mixins/eventable'

  export default {
    name: 'tabs',

    mixins: [
      Eventable
    ],
    
    props: {
      id: {
        type: String,
        required: true
      }
    },

    computed: {
      events () {
        return [
          [`tab:open:${this.id}`, this.activate]
        ]
      }
    },

    methods: {
      activate (href, uid) {
        this.$vuetify.bus.pub(`tab:activate:${this.id}`, uid)
      }
    }
  }
</script>