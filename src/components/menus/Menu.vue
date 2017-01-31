<template lang="pug">
  component(
    v-bind:is="transition"
    v-bind:origin="computedOrigin"
  )
    div(
      class="menu"
      v-bind:class="classes"
      v-bind:data-auto="auto"
      v-bind:data-top="top"
      v-bind:data-right="right"
      v-bind:data-bottom="bottom"
      v-bind:data-left="left"
      v-bind:data-hover="hover"
      v-bind:data-offset-x="offsetX"
      v-bind:data-offset-y="offsetY"
      v-bind:data-scrollable="maxHeight !== 'auto'"
      v-bind:id="id"
      v-bind:style="styles"
      v-show="active"
    )
      v-list(v-if="items.length")
        v-list-item(v-for="(item, index) in items")
          v-list-tile(
            v-bind:item="item"
            v-on:click.stop.native="updateValue(item)"
            v-bind:class="{ 'list__tile--active': inputValue === item }"
          )
      slot
</template>

<script>
  export default {
    name: 'menu',

    data () {
      return {
        inputValue: {}
      }
    },

    props: {
      auto: Boolean,

      bottom: Boolean,

      id: {
        type: String,
        required: true
      },

      hover: Boolean,

      items: {
        type: Array,
        default: () => []
      },

      left: Boolean,

      maxHeight: {
        type: [String, Number],
        default: 'auto'
      },

      offsetX: Boolean,

      offsetY: Boolean,

      origin: {
        type: String,
        default: 'top left'
      },

      right: Boolean,

      top: Boolean,

      transition: {
        type: String,
        default: 'v-menu-transition'
      },

      value: {
        requied: false
      }
    },

    computed: {
      classes () {
        return {
          'menu--open-from-right': this.right
        }
      },

      computedOrigin () {
        if (this.index === -1 || !this.auto) {
          return this.origin
        }

        if (this.index === 0) {
          return 'top left'
        } else if (this.index === this.items.length - 1) {
          return 'bottom left'
        } else {
          return 'left center'
        }
      },

      index () {
        return this.items.indexOf(this.inputValue)
      },

      styles () {
        return {
          'max-height': isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`
        }
      }
    },

    watch: {
      active () {
        this.$emit('active', this.active)
      },

      value () {
        this.inputValue = this.value
      }
    },

    methods: {
      closeConditional (e) {
        return this.$el.contains(e.target)
      },

      updateValue (item) {
        this.$emit('input', item)
      }
    }
  }
</script>