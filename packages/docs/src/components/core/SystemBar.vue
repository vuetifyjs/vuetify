<template>
  <v-system-bar
    v-if="!hasClosedBanner"
    id="core-system-bar"
    app
    color="black"
    dark
    window
    class="justify-center"
  >
    <div class="px-6">
      <strong>Join us</strong>

      at the upcoming VueConf Toronto to learn about the future of Vuetify! Use&nbsp;

      <a
        href="https://vuetoronto.com/tickets"
        target="_blank"
      >
        VUETIFYTO for 15% off!

        <v-icon
          color="primary"
          small
        >
          mdi-arrow-right
        </v-icon>
      </a>
    </div>

    <v-icon
      class="core-system-bar__close"
      @click="close"
    >
      mdi-close-circle
    </v-icon>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'CoreSystemBar',

    data: () => ({
      hasClosedBanner: true,
    }),

    mounted () {
      this.hasClosedBanner = localStorage.getItem('vuetify__vueconf_to__banner') === 'true'
    },

    methods: {
      close () {
        this.hasClosedBanner = true
        localStorage.setItem('vuetify__vueconf_to__banner', true)
      },
    },
  }
</script>

<style lang="sass">
  #core-system-bar
    a
      text-decoration: none

    .core-system-bar__close
      position: absolute
      right: 0
</style>
