<template lang="pug">
  v-fab-transition
    //- style="bottom: 52px"
    v-btn(
      fab
      dark
      fixed
      bottom
      right
      color="red"
      v-scroll="onScroll"
      v-show="fab"
      @click="toTop"
    )
      v-icon keyboard_arrow_up
</template>

<script>
  export default {
    name: 'AppFab',

    data: () => ({
      fab: false
    }),

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
