<template>
  <div class="d-flex justify-center">
    <v-locale-provider locale="sv">
      <v-date-picker></v-date-picker>
    </v-locale-provider>
  </div>
</template>

<playground-resources lang="json">
{
  "imports": {
    "vuetify/locale": "https://cdn.jsdelivr.net/npm/vuetify/lib/locale/index.mjs/+esm",
    "@date-io/date-fns": "https://cdn.jsdelivr.net/npm/@date-io/date-fns@2.17.0/build/index.esm.js/+esm",
    "date-fns/locale/en-US": "https://cdn.jsdelivr.net/npm/date-fns@2.30.0/esm/locale/en-US/index.js/+esm",
    "date-fns/locale/sv": "https://cdn.jsdelivr.net/npm/date-fns@2.30.0/esm/locale/sv/index.js/+esm"
  }
}
</playground-resources>

<playground-setup>
import { createVuetify } from 'vuetify'
import { sv } from 'vuetify/locale'
import DateFnsAdapter from '@date-io/date-fns'
import enUS from 'date-fns/locale/en-US'
import svSE from 'date-fns/locale/sv'

export const vuetify = createVuetify({
  locale: {
    messages: { sv },
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      en: enUS,
      sv: svSE,
    },
  },
})
</playground-setup>
