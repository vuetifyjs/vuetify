<template>
  <v-card
    class="px-6 py-3 d-flex justify-center align-center"
    color="#4B5168"
    dark
    flat
    href="https://tidelift.com/subscription/npm/vuetify?utm_source=vuetify&utm_medium=referral&utm_campaign=homepage"
    rel="noopener"
    target="_blank"
    tile
  >
    <v-img
      alt="Tidelift"
      class="mr-4"
      left
      max-width="24px"
      src="https://cdn.vuetifyjs.com/images/affiliates/tidelift-dark.svg"
    />

    <span class="body-2 text-uppercase font-weight-regular hidden-sm-and-down">
      Vuetify For Enterprise Available via Tidelift
    </span>

    <span class="body-2 text-uppercase font-weight-regular hidden-md-and-up">
      Get Enterprise Support
    </span>
  </v-card>
</template>

<script>
  export default {
    name: 'HomeTidelift',
  }
</script>
