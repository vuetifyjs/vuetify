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
      v-bind:id="id"
      v-show="active"
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

<<<<<<< 01b361a25a45e0c3c0eb64a1ba589710d1a7b66a
=======
      origin: {
        type: String,
        default: 'top left'
      },

>>>>>>> updated dropdown api
      right: Boolean,

      top: {
        type: Boolean,
        default: true
<<<<<<< 01b361a25a45e0c3c0eb64a1ba589710d1a7b66a
=======
      },

      transition: {
        type: String,
        default: 'v-scale-transition'
>>>>>>> updated dropdown api
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