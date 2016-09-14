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

    ul(class="slider__controls")
      li(v-for="(i, index) in items.length") 
        a(
          href="#!",
          v-bind:class="{ 'active': index === current }"
          @click="select(index)"
        )
          v-icon fiber_manual_record

    v-slider-item(
      v-bind:item="active"
      v-if="active"
    )
</template>

<script>
  export default {
    name: 'slider',

    data () {
      return {
        current: 0,
        cycle_interval: {},
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

    watch: {
      current () {
        clearInterval(this.cycle_interval)
        this.startCycle()
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

      items: {
        type: Array,
        default: () => []
      },

      progress: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      active () {
        return this.items[this.current]
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      init () {
        if (this.cycle) {
          this.startCycle()
        }
      },

      startCycle () {
        this.cycle_interval = setInterval(this.next, this.interval)
      },

      next () {
        if (this.current === this.items.length - 1) {
          this.current = 0
        } else {
          this.current++
        }
      },

      prev () {
        if (this.current === 0) {
          this.current = this.items.length - 1
        } else {
          this.current--
        }        
      },

      select (i) {
        this.progress_time = 0
        this.current = i
      }
    }
  }
</script>