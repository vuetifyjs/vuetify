<template lang="pug">
  transition(
    v-on:enter="enter"
    v-on:leave="leave"
  )
    div(
      class="collapsible__body"
      v-bind:uid="_uid"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'collapsible-body',

    mixins: [
      Eventable
    ],

    data () {
      return {
        active: false
      }
    },

    computed: {
      events () {
        return [
          [`collapse:toggle:${this.$parent._uid}`, this.toggle]
        ]
      }
    },

    methods: {
      enter (el) {
        el.style.display = 'block'
        el.style.height = 0
        el.style.height = `${el.scrollHeight}px`
      },

      leave (el) {
        el.style.height = 0
      },

      toggle (uid) {
        if (uid !== this._uid
            && !this.$parent.params.expand
        ) {
          return this.active = false
        }

        if (uid === this._uid) {
          this.active = !this.active
        }
      }
    }
  }
</script>