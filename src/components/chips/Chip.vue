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
      @click.prevent="active = false"
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
      close: {
        type: Boolean,
        default: false
      },

      label: {
        type: Boolean,
        default: false
      },

      outline: {
        type: Boolean,
        default: false
      },

      small: {
        type: Boolean,
        default: false
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