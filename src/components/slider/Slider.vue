<template lang="pug">
  div(class="slider")
    div(class="slider__left")
      v-btn(icon v-on:click.native="prev")
        v-icon chevron_left

    div(class="slider__right")
      v-btn(icon v-on:click.native="next")
        v-icon chevron_right

    div(class="slider__controls")
      v-btn(
        class="slider__controls__item"
        icon
        v-bind:class="{ 'slider__controls__item--active': index === current }"
        v-for="(item, index) in items"
      )
        v-icon(v-on:click.native="select(index)") {{ icon }}

    slot
</template>

<script>
  export default {
    name: 'slider',

    data () {
      return {
        current: null,
        items: [],
        slide_interval: {},
        reverse: false
      }
    },

    props: {
      cycle: {
        type: Boolean,
        default: true
      },

      icon: {
        type: String,
        default: 'fiber_manual_record'
      },

      interval: {
        type: Number,
        default: 6000
      }
    },

    watch: {
      current () {
        // Evaulate items when current changes to account for
        // dynamic changing of children
        this.items = this.$children.filter(i => {
          return i.$el.classList && i.$el.classList.contains('slider__item')
        })

        if (this.cycle) {
          clearInterval(this.slide_interval)
          this.startInterval()
        }

        this.$vuetify.bus.pub('slider:open', this.items[this.current]._uid, this.reverse)
      }
    },

    mounted () {
      this.init()
    },

    activated () {
      this.init()
    },

    methods: {
      init () {
        this.current = 0
      },

      next () {
        this.reverse = false
        
        if (this.current + 1 === this.items.length) {
          return this.current = 0
        }

        this.current++
      },

      prev () {
        this.reverse = true

        if (this.current - 1 < 0) {
          return this.current = this.items.length - 1
        }

        this.current--
      },

      select (index) {
        this.reverse = index < this.current
        this.current = index
      },

      startInterval () {
        this.slide_interval = setInterval(this.next, this.interval)
      }
    }
  }
</script>