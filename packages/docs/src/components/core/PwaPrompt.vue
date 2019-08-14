<template>
  <v-btn
    v-if="showInstallBanner"
    :aria-label="$t('Vuetify.AppToolbar.pwa')"
    text
    style="min-width: 48px"
    @click="install"
  >
    <v-icon>mdi-download-network</v-icon>
  </v-btn>
</template>

<script>
  export default {
    data: () => ({
      showInstallBanner: false,
      installEvent: null,
    }),
    created () {
      if (!this.$ssrContext) {
        window.addEventListener('beforeinstallprompt', e => {
          e.preventDefault()
          this.installEvent = e
          this.showInstallBanner = true
        })
      }
    },
    methods: {
      install () {
        this.showInstallBanner = false
        this.installEvent.prompt()
      },
    },
  }
</script>
