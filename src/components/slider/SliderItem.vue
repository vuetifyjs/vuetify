<template lang="pug">
  transition(v-bind:name="transition")
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

    mixins: [
      Eventable
    ],

    data () {
      return {
        active: false,
        reverse: false
      }
    },

    props: {
      src: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'shift'
      }
    },

    computed: {
      events () {
        return [
          ['slider:open', this.open]
        ]
      },

      styles () {
        return { 
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      open (target, reverse = false) {
        this.active = this._uid === target
        this.reverse = reverse
      }
    }
  }
</script>