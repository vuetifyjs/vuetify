<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.store')"
    href="https://store.vuetifyjs.com"
    rel="noopener"
    style="min-width: 48px"
    target="_blank"
    text
    @click="$ga.event('toolbar', 'click', 'store')"
  >
    <base-nav-text class="hidden-sm-and-down">Vuetify.AppToolbar.store</base-nav-text>

    <v-icon
      class="hidden-sm-and-down"
      right
    >
      mdi-open-in-new
    </v-icon>

    <v-icon class="hidden-md-and-up">
      mdi-store
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'BaseStoreLink',
  }
</script>
