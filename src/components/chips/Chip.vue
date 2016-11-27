<template lang="pug">
  span(
    class="chip"
    v-bind:class="classes"
    v-show="value"
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
  export default {
    name: 'chip',

    props: {
      close: Boolean,

      label: Boolean,

      outline: Boolean,

      small: Boolean,

      value: {
        type: Boolean,
        default: true
      }
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