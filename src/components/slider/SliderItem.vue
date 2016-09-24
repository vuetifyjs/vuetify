<template lang="pug">
    div(
      class="slider__item"
      v-bind:class="classes"
      v-bind:style="styles"
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
        left: false,
        right: false,
        next: false
      }
    },

    props: {
      src: {
        type: String,
        required: true
      }
    },

    computed: {
      classes () {
        return {
          'slider__item--active': this.active,
          'slider__item--left': this.left,
          'slider__item--right': this.right,
          'slider__item--next': this.next
        }
      },

      events () {
        return [
          [`slider-item:activate:${this._uid}`, d => this.activate(d)],
          [`slider-item:deactivate:${this._uid}`, d => this.deactivate(d)]
        ]
      },

      styles () {
        return { 
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      activate (direction) {
        this[direction] = true
        this.next = true
        this.active = true

        setTimeout(() => {
          this.next = false
          this[direction] = false
        }, 10)
      },

      deactivate (direction) {
        setTimeout(() => {
          this[direction] = true
        }, 10)

        // Need to figure out transition event for this
        setTimeout(() => {
          this.active = false
          this[direction] = false
        }, 700)
      }
    }
  }
</script>