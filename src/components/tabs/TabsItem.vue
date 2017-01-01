<template lang="pug">
  component(v-bind:is="transition")
    div(
      class="tabs__item shift"
      v-bind:id="id"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'tabs-item',
    
    data () {
      return {
        active: false
      }
    },

    mixins: [Eventable],

    props: {
      id: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'shift'
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