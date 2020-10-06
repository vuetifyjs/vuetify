<template>
  <v-row>
    <v-btn
      :color="color"
      :href="`https://tidelift.com/subscription/pkg/npm-vuetify${parameters}`"
      class="mx-2"
      outlined
      rel="noopener"
      target="_blank"
    >
      {{ $t('tidelift.more') }}
    </v-btn>

    <v-btn
      :color="color"
      :href="`https://tidelift.com/subscription/request-a-demo${parameters}`"
      class="mx-2 white--text"
      depressed
      rel="noopener"
      target="_blank"
    >
      {{ $t('tidelift.demo') }}
    </v-btn>
  </v-row>
</template>

<script>
  export default {
    name: 'TideliftBtns',

    data: () => ({
      color: '#F6914D',
      parameters: '?utm_source=npm-vuetify&utm_medium=referral&utm_campaign=enterprise',
    }),
  }
</script>
