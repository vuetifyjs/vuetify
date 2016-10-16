<template lang="pug">
  ul(
    class="pagination"
    v-bind:class="classes"
  )
    li
      a(
        href="#!"
        class="pagination__navigation"
        v-bind:class="{ 'pagination__navigation--disabled': value === 1 }"
        v-on:click.prevent="$emit('input', value - 1)"
      )
        v-icon chevron_left
    li(
      v-for="n in items"
    )
      a(
        href="#!"
        class="pagination__item"
        v-bind:class="{ 'pagination__item--active': n === selected }"
        v-if="!isNaN(n)"
        v-on:click.prevent="$emit('input', n)"
        v-text="n"
      )
      span(
        v-else
        class="pagination__more"
        v-text="n"
      )
    li
      a(
        href="#!"
        class="pagination__navigation"
        v-bind:class="{ 'pagination__navigation--disabled': value === length }"
        v-on:click.prevent="$emit('input', value + 1)"
      )
        v-icon chevron_right
</template>

<script>
  export default {
    name: 'pagination',
    
    data () {
      return {
        selected: null
      }
    },

    props: {
      circle: Boolean,

      length: {
        type: Number,
        default: 0
      },

      value: {
        type: Number,
        default: 0
      }
    },

    watch: {
      value () {
        this.init()
      }
    },

    computed: {
      classes () {
        return {
          'pagination--circle': this.circle
        }
      },

      items () {
        if (this.length <= 5) {
          return this.range(1, this.length)
        }

        let min = this.value - 3
        min = min > 0 ? min : 1

        let max = min + 6
        max = max <= this.length ? max : this.length

        if (max === this.length) {
          min = this.length - 6
        }

        let range = this.range(min, max)

        if (this.value >= 4 && this.length > 6) {
          range.splice(0, 2, 1, '...')
        }

        if (this.value + 3 < this.length && this.length > 6) {
          range.splice(range.length - 2, 2, '...', this.length)
        }

        return range
      }
    },

    mounted () {
      this.$vuetify.load.call(this, this.init)
    },

    methods: {
      init () {
        this.selected = null

        // Change this
        setTimeout(() => this.selected = this.value, 100)
      },

      range (from, to) {
        let range = []

        from = from > 0 ? from : 1

        for (let i = from; i <= to; i++) {
          range.push(i)
        }

        return range
      }
    }
  }
</script>