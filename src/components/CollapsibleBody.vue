<template lang="pug">
  div(
    v-bind:class="classes"
    v-bind:uid="uid"
  )
    slot
</template>

<script>
  import Eventable from '../mixins/eventable'

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
      classes () {
        return {
          'collapsible__body': true
        }
      },

      events () {
        return [
          [`collapse:toggle:${this.$parent._uid}`, this.toggle]
        ]
      },

      parent () {
        return this.$el.parentNode
      },

      uid () {
        return this._uid
      }
    },

    watch: {
      active (bool) {
        if (bool) {
          this.open()
        } else {
          this.close()
        }
      }
    },

    methods: {
      close () {
        this.parent.classList.remove('collapsible--active')
        this.parent.style.height = `${this.parent.clientHeight - this.$el.clientHeight}px`
      },

      open () {
        this.parent.classList.add('collapsible--active')
        this.parent.style.height = `${this.parent.clientHeight + this.$el.clientHeight}px`
      },

      toggle (uid) {
        if (uid != this._uid
            && !this.$parent.params.expand
        ) {
          return this.active = false
        }

        if (uid == this._uid) {
          this.active = !this.active
        }
      }
    }
  }
</script>