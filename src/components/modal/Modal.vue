<template lang="pug">
  div(class="modal__container")

    div(v-on:click="isActive = !isActive" ref="button")
      slot(name="button")

    v-overlay(v-bind:active="isActive")
      component(
        v-bind:is="transition"
        v-bind:origin="origin"
      )
        div(
          class="modal"
          v-bind:class="classes"
          v-bind:id="id"
          v-show="isActive"
          v-click-outside="closeConditional"
          ref="modal"
        )
          slot
</template>

<script>
  export default {
    name: 'modal',

    data () {
      return {
        isActive: this.active
      }
    },

    props: {
      active: Boolean,

      origin: {
        type: String,
        default: 'center center'
      },

      transition: {
        type: String,
        default: 'v-modal-transition'
      }
    },

    computed: {
      classes () {
        return {
          'modal--active': this.isActive,
          'modal--bottom': this.bottom
        }
      }
    },

    watch: {
      active () {
        this.isActive = this.active
      },

      isActive () {
        if (this.isActive !== this.active) {
          this.$emit('active', this.isActive)
        }
      }
    },

    methods: {
      closeConditional (e) {
        return this.$refs.modal !== e.target &&
          !this.$refs.modal.contains(e.target) &&
          this.$refs.button !== e.target &&
          !this.$refs.button.contains(e.target)
      }
    }
  }
</script>