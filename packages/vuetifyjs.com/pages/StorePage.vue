<template lang="pug">
  v-container(fill-height)#store
    v-layout(align-center justify-center column)
      v-flex(shrink).text-xs-center.pb-5
        img(src="/static/doc-images/logo.svg" width="150px")
        h1.display-4.grey--text.text--lighten-1.mb-3 Coming Soon
        span(style="font-weight: 100;").grey--text.text--darken-1.headline Shirts, cups, themes and more
</template>

<script>
  export default {
    created () {
      this.$store.commit('app/DRAWER', false)
    },

    beforeDestroy () {
      this.$store.commit('app/DRAWER', true)
    }
  }
</script>
