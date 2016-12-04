<template lang="pug">
  i(
    class="material-icons icon"
    v-bind:class="classes"
  )
    span(v-show="active")
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
    },

    mounted () {
      this.$vuetify.load(this.init)
    },

    methods: {
      init () {
        // Prevent FOUT
        setTimeout(() => this.active = true, 100)
      }
    }
  }
</script>