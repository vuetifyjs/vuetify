<template lang="pug">
  v-container(fill-height)
    v-layout(align-center)
      v-flex.text-xs-center
        h1.display-2.primary--text Whoops, 404
        p The page you were looking for does not exist
        v-btn(
          :to="`${to}getting-started/quick-start`"
          outline
          color="primary"
        ) Get me out of here!
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        default: '/'
      }
    },

    created () {
      this.$ssrContext && this.$ssrContext.res.status(404)
    }
  }
</script>
