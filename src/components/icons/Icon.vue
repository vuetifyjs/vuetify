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
    
    props: {
      large: {
        type: Boolean,
        default: false
      },

      left: {
        type: Boolean,
        default: false
      },

      medium: {
        type: Boolean,
        default: false
      },

      right: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'icon--large': this.large,
          'icon--left': this.left,
          'icon--medium': this.medium,
          'icon--right': this.right
        }
      }
    }
  }
</script>