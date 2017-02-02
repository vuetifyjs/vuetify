<template lang="pug">
  component(v-bind:is="computedTransition")
    div(
      class="tabs__item"
      v-bind:id="id"
      v-show="isActive"
    )
      slot
</template>

<script>
  export default {
    name: 'tabs-item',

    data () {
      return {
        isActive: false,
        reverse: false
      }
    },

    props: {
      id: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'v-tab-transition'
      },

      reverseTransition: {
        type: String,
        default: 'v-tab-reverse-transition'
      }
    },

    computed: {
      computedTransition () {
        return this.reverse ? this.reverseTransition : this.transition
      }
    },

    methods: {
      toggle (target) {
        this.isActive = true
        // this.isActive = target === this.id
      }
    }
  }
</script>