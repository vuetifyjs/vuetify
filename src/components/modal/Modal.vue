<template lang="pug">
  div(class="modal__container")

    div(
      class="modal__activator"
      v-on:click="isActive = !isActive" 
      ref="button"
    )
      slot(name="button")

    v-overlay(
      v-bind:active="isActive"
      v-bind:class="overlayClasses"
    )
      component(
        v-bind:is="computedTransition"
        v-bind:origin="computedOrigin"
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
  import Toggleable from '../../mixins/toggleable'
  
  export default {
    name: 'modal',

    mixins: [Toggleable],

    props: {
      bottom: Boolean,

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
      },

      computedOrigin () {
        if (this.origin !== 'center center') {
          return this.origin
        }

        return this.bottom ? 'bottom' : this.origin
      },

      computedTransition () {
        if (this.transition !== 'v-modal-transition') {
          return this.transition
        }

        return this.bottom ? 'v-slide-y-transition' : this.transition
      },

      overlayClasses () {
        return {
          'overlay--modal-bottom': this.bottom
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