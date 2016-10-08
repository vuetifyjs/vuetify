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
        transitioning: false,
        cycle_interval: {},
        hydrated: false
      }
    },

    props: {
      cycle: {
        type: Boolean,
        default: true
      },

      interval: {
        type: Number,
        default: 8000
      }
    },

    computed: {
      current_slide () {
        return this.items[this.current]
      },

      previous_slide () {
        let previous = this.current === 0 ? this.items.length - 1 : this.current - 1

        return this.items[previous]
      },

      next_slide () {
        let next = this.current === this.items.length - 1 ? 0 : this.current + 1

        return this.items[next]
      }
    },

    watch: {
      current () {
        clearInterval(this.cycle_interval)
        this.$nextTick(this.startCycle)
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      change (direction = true) {
        const node = this.$children.find(i => i._uid === this.current_slide)

        if (this.hydrated) {
          this.transitioning = true
        }

        node.$el.addEventListener('transitionend', () => {
          this.transitioning = false

          if (!this.hydrated) {
            this.hydrated = true
          }
        }, { once: true })

        this.$vuetify.bus.pub(
          `slider-item:switch`,
          this.current_slide,
          this.next_slide,
          this.previous_slide
        )
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

        this.current = this.items.indexOf(this.next_slide)
        this.change()
      },

      prev () {
        if (this.transitioning) {
          return
        }

        this.current = this.items.indexOf(this.previous_slide)
        this.change()      
      },

      select (i) {
        if (this.transitioning) {
          return
        }

        let from = this.current
        this.current = i
        this.change()
      }
    }
  }
</script>