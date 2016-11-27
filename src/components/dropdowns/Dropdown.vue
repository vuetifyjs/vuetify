<template lang="pug">
  ul(
    class="dropdown"
    v-bind:class="classes"
    v-bind:data-bottom="bottom"
    v-bind:data-hover="hover"
    v-bind:data-right="right"
    v-bind:id="id"
  )
    v-dropdown-item(
      v-for="item in items"
      v-bind:item="item"
    )
    slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'dropdown',

    mixins: [
      Toggleable
    ],

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

      right: Boolean
    },

    computed: {
      classes () {
        return {
          'dropdown--open': this.active,
          'dropdown--open-from-right': this.right
        }
      }
    },

    mounted () {
      this.$vuetify.bus.sub(`${this.$options.name}:opened`, this.opened)
    },

    methods: {
      opened (id) {
        this.active = id === this.id
      }
    }
  }
</script>