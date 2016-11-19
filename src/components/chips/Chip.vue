<template lang="pug">
  span(
    class="chip"
    v-bind:class="classes"
    v-show="active"
  )
    slot
    v-btn(
      class="chip__close"
      icon
      v-if="close"
      v-on:click.prevent="active = false"
    )
      v-icon(right) cancel
</template>

<script>
  export default {
    name: 'chip',
    
    data () {
      return {
        active: true
      }
    },

    props: {
      close: Boolean,

      label: Boolean,

      outline: Boolean,

      small: Boolean
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