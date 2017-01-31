<template lang="pug">
  div(
    class="modal-overlay" 
    v-bind:class="{ 'modal-overlay--open': this.active }"
  )
    component(
      v-bind:is="transition"
      v-bind:origin="origin"
    )
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
  export default {
    name: 'modal',

    props: {
      bottom: Boolean,

      id: {
        type: String,
        required: true
      },

      origin: {
        type: String,
        default: 'bottom center'
      },

      transition: {
        type: String,
        default: 'v-modal-transition'
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