<template lang="pug">
  component(
    v-bind:is="transition" 
    v-bind:origin="origin"
  )
    ul(
      class="dropdown"
      v-bind:class="classes"
      v-bind:data-top="top"
      v-bind:data-right="right"
      v-bind:data-bottom="bottom"
      v-bind:data-left="left"
      v-bind:data-hover="hover"
      v-bind:data-offset="offset"
    )
</template>

<script>
  import Toggleable from '../../mixins/toggleable'
  import Transitionable from '../../mixins/transitionable'

  export default {
    name: 'dropdown',

    mixins: [Toggleable, Transitionable],

    props: {
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

      offset: Boolean,

      right: Boolean,

      top: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      classes () {
        return {
          'dropdown--open-from-right': this.right
        }
      },

      customEvents () {
        return [
          [`${this.$options.name}:opened`, this.opened]
        ]
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