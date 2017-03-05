<template lang="pug">
  div(class="modal__container")

    div(
      class="modal__activator"
      v-on:click="isActive = !isActive" 
      ref="activator"
      v-if="$slots.activator"
    )
      slot(name="activator")

    v-overlay(
      v-model="isActive"
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
      persistent: Boolean,
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

        return this.bottom ? 'v-slide-y-reverse-transition' : this.transition
      },

      overlayClasses () {
        return {
          'overlay--modal-bottom': this.bottom
        }
      }
    },

    methods: {
      closeConditional (e) {
        if (this.persistent) {
          return false
        }

        return this.$refs.modal !== e.target &&
          !this.$refs.modal.contains(e.target) && 
          (!this.$refs.activator || this.$refs.activator &&
            !this.$refs.activator.contains(e.target) &&
            this.$refs.activator !== e.target)
      }
    }
  }
</script>