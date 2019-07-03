<template>
  <v-menu
    v-model="pwaDialog"
    bottom
    left
    offset-y
  >
    <template #activator="{ on }">
      <v-btn
        v-if="showInstallBanner"
        :aria-label="$t('Vuetify.AppToolbar.pwa')"
        text
        style="min-width: 48px"
        v-on="on"
      >
        <v-icon>mdi-download-network</v-icon>
      </v-btn>
    </template>
    <v-sheet
      color="blue"
      dark
    >
      <v-layout
        align-center
      >
        <v-icon
          dark
          class="ml-3"
        >
          mdi-information
        </v-icon>
        <v-spacer />
        <span>{{ this.$t('Vuetify.AppToolbar.pwaMenu') }}</span>
        <v-btn
          :ripple="false"
          icon
          color="green"
          class="ml-3"
          @click="install"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-layout>
    </v-sheet>
  </v-menu>
</template>

<script>
  export default {
    data: () => ({
      pwaDialog: false,
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
        console.log('meows')
        this.showInstallBanner = false
        this.installEvent.prompt()
        this.installEvent.userChoice.then(res => {
          if (res.outcome === 'accepted') {
            // display loader and download cache
            console.log('meow')
          }
          this.installEvent = null
        })
      },
    },
  }
</script>
