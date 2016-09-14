<template lang="pug">
  ul(
    class="dropdown"
    v-bind:class="classes"
    v-bind:data-right="right"
    v-bind:id="id"
    ref="dropdown"
  )
    li(v-for="item in items")
      a(
        v-bind:href="item.href"
        v-html="item.text"
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
      id: {
        type: String,
        required: true
      },

      items: {
        type: Array,
        default: () => []
      },

      right: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'dropdown--open': this.active,
          'dropdown--open-from-right': this.right
        }
      }
    }
  }
</script>