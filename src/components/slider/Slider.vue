<template lang="pug">
  div(class="slider")
    div(class="slider__left")
      v-btn(
        icon
        v-on:click.native="prev"
      )
        v-icon chevron_left

    div(class="slider__right")
      v-btn(
        icon
        v-on:click.native="next"
      )
        v-icon chevron_right

    div(class="slider__controls")
      v-btn(
        class="slider__controls__item"
        icon
        v-bind:class="{ 'slider__controls__item--active': index === current }"
        v-for="(n, index) in items.length"
      )
        v-icon(v-on:click.native="select(index)") fiber_manual_record
    div(
      class="slider__slides"
      v-bind:class="classes"
    )
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
        set: true,
        reverse: false
      }
    },

    props: {
      cycle: Boolean,  

      interval: {
        type: Number,
        default: 8000
      }
    },

    computed: {
      classes () {
        return {
          'slider__slides--is-reversing': this.reverse,
          'slider__slides--is-set': this.set
        }
      }
    },

    watch: {
      current () {
        this.startInterval()
        this.order()
        this.transition()
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      init () {
        this.items = this.$children.filter(i => {
          return i.$el.classList && i.$el.classList.contains('slider__item')
        })

        this.current = 0

        if (this.cycle) {
          this.startInterval()
        }
      },

      order () {
        let pos = 0
        let iter = this.items.length

        if (this.current === 0) {
          pos = iter - 1  
        } else {
          pos = this.current - 1
        }

        for (let i = 1; i <= iter; i++) {
          this.items[pos].order = i
          pos = pos + 1 === iter ? 0 : pos + 1
        }
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
        if (index === this.current) {
          return
        }

        let i = index > this.current ? false : true
        let method = index > this.current ? this.next : this.prev
        this.reverse = index < this.current

        method()

        var interval = setInterval(() => {
          if (index == this.current) {
            return clearInterval(interval)
          }

          method()
        }, 200)
      },

      startInterval () {
        clearInterval(this.slide_interval)

        this.slide_interval = setInterval(this.next, this.interval)
      },

      transition () {
        this.set = false
        setTimeout(() => this.set = true, 50)
      }
    }
  }
</script>