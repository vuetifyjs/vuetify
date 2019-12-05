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
    <v-badge
      v-model="badge"
      color="red"
      left
    >
      <template v-slot:badge>
        <v-icon>mdi-tag-text</v-icon>
      </template>

      <base-nav-text>Vuetify.AppToolbar.store</base-nav-text>
    </v-badge>

    <v-icon right>
      mdi-open-in-new
    </v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'BaseStoreLink',

    data () {
      const start = (new Date('November 28, 2019 18:00:00')).getTime()
      const stop = (new Date('December 2, 2019 23:59:59')).getTime()
      const now = Date.now()

      return {
        badge: (
          now >= start &&
          now <= stop
        ),
      }
    },
  }
</script>
