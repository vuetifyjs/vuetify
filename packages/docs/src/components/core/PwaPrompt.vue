<template>
  <v-menu
    v-model="pwaDialog"
    attach
    bottom
    left
    offset-y
  >
    <v-btn
      v-if="showInstallBanner"
      slot="activator"
      :aria-label="$t('Vuetify.AppToolbar.pwa')"
      flat
      style="min-width: 48px"
    >
      <v-icon>mdi-cogs</v-icon>
    </v-btn>
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
          mdi-info
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
      installEvent: null
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
          }
          this.installEvent = null
        })
      }
    }
  }
</script>
