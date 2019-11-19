<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.store')"
    class="hidden-xs-only"
    href="https://store.vuetifyjs.com"
    rel="noopener"
    style="min-width: 48px"
    target="_blank"
    text
    @click="$ga.event('toolbar', 'click', 'store')"
  >
    <base-nav-text>Vuetify.AppToolbar.store</base-nav-text>

    <v-icon right>
      mdi-open-in-new
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'BaseStoreLink',
  }
</script>
