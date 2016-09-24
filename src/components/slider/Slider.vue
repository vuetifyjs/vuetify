<template lang="pug">
  div(
    class="slider"
  )
    div(
      class="slider__left"
      @click="prev"
    )

    div(
      class="slider__right"
      @click="next"
    )

    ul(
      class="slider__controls"
    )
      li(v-for="(n, index) in items.length") 
        a(
          class="slider__controls__item"
          href="#!",
          v-bind:class="{ 'active': index === current }"
          @click="select(index)"
        )

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
      }
    },

    watch: {
      current () {
        clearInterval(this.cycle_interval)
        this.$nextTick(this.startCycle)
      }
    },

    components: {
      'v-slider-progress': {
        name: 'slider-progress',

        functional: true,

        render: (h, { data }) => {
          data.staticClass = 'slider__progress'
          
          return h('div', data)
        }
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
      },

      progress: {
        type: Boolean,
        default: true
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      change (direction) {
        this.$vuetify.bus.pub(`slider-item:activate:${this.items[this.current]}`, direction)
        this.$vuetify.bus.pub(`slider-item:deactivate:${this.items[this.previous]}`, direction)
        this.transitioning = true
        
        const node = this.$children.find(i => i._uid === this.items[this.current])

        if (!node) {
          return
        }

        var cb = e => {
          this.transitioning = false

          e.target.removeEventListener(e.type, cb)
        }

        node.$el.addEventListener('transitionend', cb)
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