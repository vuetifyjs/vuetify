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
  import { addOnceEventListener } from '../../util/helpers'

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
      enter (el, done) {
        el.style.height = null
        el.style.display = 'block'
        let height = `${el.clientHeight}px`
        el.style.height = 0
        
        setTimeout(() => {
          el.style.height = height
          addOnceEventListener(el, 'transitionend', done)
        }, 50)
      },

      leave (el, done) {
        el.style.height = 0

        addOnceEventListener(el, 'transitionend', done)
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