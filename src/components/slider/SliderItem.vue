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
        next: false,
        previous: false
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
          'slider__item--next': this.next,
          'slider__item--previous': this.previous,
        }
      },

      events () {
        return [
          [`slider-item:switch`, (cur, next, prev, d) => this.switch(cur, next, prev, d)]
        ]
      },

      styles () {
        return { 
          backgroundImage: `url(${this.src})`
        }
      }
    },

    methods: {
      switch (cur, next, prev) {
        if (prev === this._uid) {
          this.previous = true
          this.active = false

          setTimeout(() => {
            this.next = false
          }, 500)
        } else if (cur === this._uid) {
          this.active = true
          this.$nextTick(() => {
            this.previous = false
            this.next = false
          })
        } else {
          this.next = true
          this.active = false
          
          setTimeout(() => {
            this.previous = false
          }, 500)
        }
      }
    }
  }
</script>