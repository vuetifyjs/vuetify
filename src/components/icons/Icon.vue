<template lang="pug">
  i(
    class="material-icons icon"
    v-bind:class="classes"
  )
    slot
</template>

<script>
  export default {
    name: 'icon',
    
    data () {
      return {
        active: false
      }
    },

    props: {
      large: Boolean,

      left: Boolean,

      medium: Boolean,

      right: Boolean,

      xLarge: Boolean
    },

    computed: {
      classes () {
        return {
          'icon--large': this.large,
          'icon--left': this.left,
          'icon--medium': this.medium,
          'icon--right': this.right,
          'icon--x-large': this.xLarge
        }
      }
    }
  }
</script>