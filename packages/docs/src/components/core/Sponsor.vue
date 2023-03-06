<template>
  <v-btn
    :aria-label="$t('Vuetify.AppToolbar.store')"
    flat
    style="min-width: 48px"
    href="https://vuetifyjs.com/introduction/sponsors-and-backers/"
    target="_blank"
    rel="noopener"
    @click="$ga.event('toolbar', 'click', 'sponsor')"
  >
    <span
      class="hidden-sm-and-down"
      v-text="$t('Vuetify.AppToolbar.sponsor')"
    />
    <v-icon class="hidden-md-and-up">mdi-trophy-outline</v-icon>
  </v-btn>
</template>
