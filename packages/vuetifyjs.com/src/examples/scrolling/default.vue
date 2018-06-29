<template>
  <v-layout v-scroll="onScroll" column align-center justify-center>
    <v-subheader>Offset Top</v-subheader>
    {{ offsetTop }}
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      offsetTop: 0
    }),

    methods: {
      onScroll (e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      }
    }
  }
</script>
