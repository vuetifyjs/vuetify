<template lang="pug">
  component(
    v-bind:is="computedTransition"
  )
    div(
      class="slider__item"
      v-bind:class="{ 'reverse': reverse }"
      v-bind:style="styles"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'

  export default {
    name: 'slider-item',

    mixins: [Eventable],

    data () {
      return {
        active: false,
        reversing: false
      }
    },

    props: {
      src: {
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
        return this.reversing ? this.reverseTransition : this.transition
      },

      events () {
        return [
          [`slider:open:${this.$parent._uid}`, this.open]
        ]
      },

      styles () {
        return { 
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      open (target, reversing = false) {
        this.active = this._uid === target
        this.reversing = reversing
      }
    }
  }
</script>