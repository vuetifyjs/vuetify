<template lang="pug">
  component(
    v-bind:is="transition" 
    v-bind:origin="origin"
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
      v-bind:data-offset="offset"
      v-bind:id="id"
      v-bind:style="styles"
      v-show="active"
    )
      v-list
        v-list-item(v-for="(item, index) in items")
          v-list-tile(
            v-bind:item="item" 
            v-on:click.native="$emit('input', item)"
            v-bind:class="{ 'list__tile--active': inputValue === item }"
          )
</template>

<script>
  import Toggleable from '../../mixins/toggleable'
  import Transitionable from '../../mixins/transitionable'

  export default {
    name: 'menu',

    mixins: [Toggleable, Transitionable],

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

      left: {
        type: Boolean,
        default: true
      },

      maxHeight: {
        type: [String, Number],
        default: 200
      },

      offset: Boolean,

      origin: {
        type: String,
        default: 'top left'
      },

      right: Boolean,

      top: {
        type: Boolean,
        default: true
      },

      transition: {
        type: String,
        default: 'v-scale-transition'
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

      customEvents () {
        return [
          [`${this.$options.name}:opened`, this.opened]
        ]
      },

      styles () {
        return {
          'max-height': `${this.maxHeight}px`
        }
      }
    },

    watch: {
      value () {
        this.inputValue = this.value
      }
    },

    mounted () {
      this.$vuetify.bus.sub(this.customEvents)
    },

    beforeDestroy () {
      this.$vuetify.bus.unsub(this.customEvents)
    },

    methods: {
      opened (id) {
        this.active = id === this.id
      }
    }
  }
</script>