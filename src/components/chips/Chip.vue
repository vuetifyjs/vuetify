<template lang="pug">
  span(
    class="chip"
    v-bind:class="classes"
    v-show="isActive"
  )
    slot
    a(
      class="chip__close"
      href="#!"
      v-if="close"
      v-on:click.prevent="$emit('input', false)"
    )
      v-icon(right) cancel
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'chip',

    mixins: [Toggleable],

    data () {
      return {
        isActive: true
      }
    },

    props: {
      close: Boolean,

      label: Boolean,

      outline: Boolean,

      small: Boolean,
    },

    computed: {
      classes () {
        return {
          'chip--label': this.label,
          'chip--outline': this.outline,
          'chip--small': this.small,
          'chip--removable': this.close
        }
      }
    }
  }
</script>