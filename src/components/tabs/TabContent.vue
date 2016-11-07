<template lang="pug">
  transition(v-bind:name="transition")
    div(
      class="tabs__content"
      v-bind:id="id"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    data () {
      return {
        active: false,
        timeout: {}
      }
    },

    mixins: [
      Eventable
    ],

    props: {
      id: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'tabs__content'
      }
    },

    computed: {
      events () {
        return [
          ['tab:open', this.open]
        ]
      }
    },

    methods: {
      open (target) {
        this.active = this.id === target
      }
    }
  }
</script>