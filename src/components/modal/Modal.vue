<template lang="pug">
  div(
    class="modal-overlay" 
    v-bind:class="{ 'modal-overlay--open': this.active }"
  )
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

    mixins: [Toggleable],

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
      closeConditional (e) {
        return this.$refs.modal === e.target || this.$refs.modal.contains(e.target)
      }
    }
  }
</script>