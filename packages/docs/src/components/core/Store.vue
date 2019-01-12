<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.store')"
    flat
    style="min-width: 48px"
    href="https://store.vuetifyjs.com"
    target="_blank"
    rel="noopener"
    @click="$ga.event('toolbar', 'click', 'store')"
  >
    <span
      class="hidden-sm-and-down"
      v-text="$t('Vuetify.AppToolbar.store')"
    />
    <v-icon class="hidden-md-and-up">
      mdi-store
    </v-icon>
  </v-btn>
</template>
