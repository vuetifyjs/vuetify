<template lang="pug">
  span(
    class="chip"
    v-bind:class="classes"
    v-if="active"
  )
    slot
    a(
      class="chip__close"
      href="#!"
      v-if="close"
      v-on:click.prevent="active = false"
    )
      v-icon(
        right
        v-text="cancel"
      )
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