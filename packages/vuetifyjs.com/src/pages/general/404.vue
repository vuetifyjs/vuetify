<template>
  <v-container
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-layout align-center>
      <v-flex text-xs-center>
        <h1 class="display-2 primary--text">
          Whoops, 404
        </h1>
        <p>The page you were looking for does not exist</p>
        <v-btn
          :to="`/${lang}/getting-started/quick-start`"
          outline
          color="primary"
        >
          Get me out of here!
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FourOhFour',

    props: {
      lang: {
        type: String,
        default: 'en'
      }
    },

    created () {
      this.$ssrContext && this.$ssrContext.res.status(404)
    }
  }
</script>
