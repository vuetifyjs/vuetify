<template lang="pug">
  div(class="carousel")
    div(class="carousel__left")
      v-btn(icon v-on:click.native.stop="prev" dark)
        v-icon chevron_left

    div(class="carousel__right")
      v-btn(icon v-on:click.native.stop="next" dark)
        v-icon chevron_right

    div(class="carousel__controls")
      v-btn(
        class="carousel__controls__item"
        icon
        dark
        v-bind:class="{ 'carousel__controls__item--active': index === current }"
        v-for="(item, index) in items"
        v-on:click.native.stop="select(index)"
      )
        v-icon {{ icon }}
    slot
</template>

<script>
  import Bootable from '~mixins/bootable'

  export default {
    name: 'carousel',

    mixins: [Bootable],

    data () {
      return {
        current: null,
        items: [],
        slideInterval: {},
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

    computed: {
      defaultState () {
        return {
          current: null,
          reverse: false
        }
      }
    },

    watch: {
      current () {
        // Evaluate items when current changes to account for
        // dynamic changing of children
        this.items = this.$children.filter(i => {
          return i.$el.classList && i.$el.classList.contains('carousel__item')
        })

        this.items.forEach(i => i.open(this.items[this.current]._uid, this.reverse))

        !this.isBooted && this.cycle && this.restartInterval()
        this.isBooted = true
      },
      cycle (val) {
        val && this.restartInterval() || clearInterval(this.slideInterval)
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      restartInterval () {
        clearInterval(this.slideInterval)
        this.$nextTick(this.startInterval)
      },
      init () {
        this.current = 0
      },
      next () {
        this.reverse = false

        if (this.current + 1 === this.items.length) {
          return (this.current = 0)
        }

        this.current++
      },
      prev () {
        this.reverse = true

        if (this.current - 1 < 0) {
          return (this.current = this.items.length - 1)
        }

        this.current--
      },
      select (index) {
        this.reverse = index < this.current
        this.current = index
      },
      startInterval () {
        this.slideInterval = setInterval(this.next, this.interval)
      }
    }
  }
</script>