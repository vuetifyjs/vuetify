<template>
  <v-row>
    <v-btn
      class="mx-2"
      outlined
      color="#F6914D"
      href="https://tidelift.com/subscription/pkg/npm-vuetify?utm_source=npm-vuetify&utm_medium=referral&utm_campaign=enterprise"
    >
      {{ $i18n.t('tidelift.more') }}
    </v-btn>
    <v-btn
      class="mx-2"
      color="#F6914D"
      href="https://tidelift.com/subscription/request-a-demo?utm_source=npm-vuetify&utm_medium=referral&utm_campaign=enterprise"
    >
      {{ $i18n.t('tidelift.demo') }}
    </v-btn>
  </v-row>
</template>

<script>
  export default {
    name: 'TideliftButtons',
  }
</script>
