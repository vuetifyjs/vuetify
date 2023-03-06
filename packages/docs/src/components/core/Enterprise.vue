<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.store')"
    flat
    style="min-width: 48px"
    href="https://support.vuetifyjs.com"
    target="_blank"
    rel="noopener"
    @click="$ga.event('toolbar', 'click', 'enterprise')"
  >
    <span
      class="hidden-sm-and-down"
      v-text="$t('Vuetify.AppToolbar.enterprise')"
    />

    <v-chip
      class="hidden-sm-and-down"
      small
      color="success"
      dark
    >
      NEW
    </v-chip>

    <v-icon class="hidden-md-and-up">mdi-shield-outline</v-icon>
  </v-btn>
</template>
