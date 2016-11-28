<template lang="pug">
  div(class="modal-overlay" v-bind:class="{ 'modal-overlay--open': this.active }")
    transition(name="modal")
      div(
        class="modal"
        v-bind:class="classes"
        v-bind:id="id"
        v-show="active"
        ref="modal"
      )
        slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'modal',

    mixins: [ 
      Toggleable 
    ],

    data () {
      return {
        closeOnClick: false,
        overlay: {}
      }
    },

    props: {
      bottom: Boolean,

      id: {
        type: String,
        required: true
      }
    },

    computed: {
      classes () {
        return {
          'modal--bottom': this.bottom
        }
      }
    },

    methods: {
      close (e, force = false) {
        if (force) {
          return this.active = false
        }

        if (e.target === this.$refs.modal || this.$refs.modal.contains(e.target)) {
          return
        }

        if (this.activator === null) {
          return
        }
        
        try {
          if (e.target === this.activator
              || this.activator.contains(e.target)
          ) {
            return
          }
        } catch (e) {}

        this.active = false
      }
    }
  }
</script>