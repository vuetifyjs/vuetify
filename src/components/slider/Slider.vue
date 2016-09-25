<template lang="pug">
  div(
    class="slider"
  )
    div(
      class="slider__left"
    )
      v-btn(
        icon
        @click.native="prev"
      )
        v-icon chevron_left

    div(
      class="slider__right"
    )
      v-btn(
        icon
        @click.native="next"
      )
        v-icon chevron_right

    div(
      class="slider__controls"
    )
      v-btn(
        class="slider__controls__item"
        icon
        v-for="(n, index) in items.length"
        v-bind:class="{ 'slider__controls__item--active': index === current }"
      )
        v-icon(
          @click.native="select(index)"
        ) fiber_manual_record
    slot
</template>

<script>
  export default {
    name: 'slider',

    data () {
      return {
        current: 0,
        items: [],
        previous: 2,
        transitioning: false,
        cycle_interval: {},
        hydrated: false
      }
    },

    watch: {
      current () {
        clearInterval(this.cycle_interval)
        this.$nextTick(this.startCycle)
      }
    },

    props: {
      cycle: {
        type: Boolean,
        default: true
      },

      interval: {
        type: Number,
        default: 5000
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      change (direction) {
        const node = this.$children.find(i => i._uid === this.items[this.current])

        if (this.hydrated) {
          this.transitioning = true
        }

        var cb = e => {
          this.transitioning = false

          if (!this.hydrated) {
            this.hydrated = true
          }

          e.target.removeEventListener(e.type, cb)
        }

        node.$el.addEventListener('transitionend', cb)

        this.$vuetify.bus.pub(`slider-item:deactivate:${this.items[this.previous]}`, direction)
        this.$vuetify.bus.pub(`slider-item:activate:${this.items[this.current]}`, direction)
      },

      init () {
        this.items = this.$children.filter(i => i.$el.classList.contains('slider__item')).map(i => i._uid)
        this.previous = this.items.length - 1
        this.change()

        if (this.cycle) {
          this.startCycle()
        }
      },

      startCycle () {
        this.cycle_interval = setInterval(this.next, this.interval)
      },

      next () {
        if (this.transitioning) {
          return
        }

        if (this.current + 1 < this.items.length) {
          this.previous = this.current
          this.current = this.current + 1
          this.change('left')
          
        } else {
          this.previous = this.current
          this.current = 0
          this.change('left')
        }
      },

      prev () {
        if (this.transitioning) {
          return
        }

        if (this.current !== 0) {
          this.previous = this.current
          this.current = this.current - 1
          this.change('right')
          
        } else {
          this.previous = this.current
          this.current = this.items.length - 1
          this.change('right')
        }       
      },

      select (i) {
        if (this.transitioning) {
          return
        }

        this.previous = this.current
        this.current = i
        this.change(this.previous < this.current ? 'left' : 'right')
      }
    }
  }
</script>