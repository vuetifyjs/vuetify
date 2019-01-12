<template>
  <v-fab-transition>
    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      :style="{
        bottom: value ? '80px' : ''
      }"
      fab
      dark
      fixed
      bottom
      right
      color="red"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
  // Utilities
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'AppFab',

    data: () => ({
      fab: false
    }),

    computed: {
      ...mapState('snackbar', ['value'])
    },

    methods: {
      onScroll () {
        if (typeof window === 'undefined') return

        const top = window.pageYOffset ||
          document.documentElement.offsetTop ||
          0

        this.fab = top > 300
      },
      toTop () {
        this.$router.push({ hash: '' })
        this.$vuetify.goTo(0)
      }
    }
  }
</script>
