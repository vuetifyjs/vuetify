<template lang="pug">
  ul(
    v-bind:class="classes"
  )
    slot
</template>

<script>
  import Storable from '../../mixins/storable'

  export default {
    name: 'collapsible',

    mixins: [Storable],

    props: {
      expand: Boolean
    },

    computed: {
      classes () {
        return {
          'collapsible': true
        }
      },

      defaultState () {
        return {
          items: [],
          expand: this.expand
        }
      },

      params () {
        return {
          expand: this.expand
        }
      }
    }
  }
</script>