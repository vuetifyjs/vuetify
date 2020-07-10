<template>
  <v-container
    class="text-center fill-height"
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">
          Whoops, 404
        </h1>

        <p>The page you were looking for does not exist</p>

        <v-btn
          :to="`/${locale}/getting-started/quick-start`"
          color="primary"
          outlined
        >
          Get me out of here!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'FourOhFour',

    computed: {
      locale: get('route/params@locale'),
    },

    created () {
      this.$ssrContext && this.$ssrContext.res.status(404)
    },
  }
</script>
