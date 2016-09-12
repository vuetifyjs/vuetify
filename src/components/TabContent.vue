<template lang="pug">
  div
    transition(
      v-bind:name="transition"
    )
      div(
        class="tabs__content",
        v-bind:class="classes",
        v-bind:id="id",
        v-if="active"
      )
        slot
</template>

<script>
  import Eventable from '../mixins/eventable'

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

      target: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'tabs__content'
      }
    },

    computed: {
      classes () {
        return {
          'tabs__content--active': this.active
        }
      },

      events () {
        return [
          [`tab:open:${this.target}`, this.open]
        ]
      }
    },

    methods: {
      open (target) {
        if (this.id === target) {
          this.timeout = setTimeout(() => this.active = true, 300)
        } else {
          clearInterval(this.timeout)
          this.active = false
        }
      }
    }
  }
</script>