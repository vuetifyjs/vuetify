<template>
  <v-card
    class="px-6 py-3 d-flex justify-center align-center"
    color="#4B5168"
    dark
    flat
    href="https://tidelift.com/subscription/pkg/npm-vuetify?utm_source=npm-vuetify&utm_medium=referral&utm_campaign=enterprise"
    rel="noopener"
    target="_blank"
    tile
    @click="$ga.event('home', 'click', ' tidelift')"
  >
    <v-img
      alt="Tidelift"
      class="mr-4"
      left
      max-width="24px"
      src="https://cdn.vuetifyjs.com/images/affiliates/tidelift-dark.svg"
    />

    <span class="body-2 text-uppercase font-weight-regular hidden-sm-and-down">
      Vuetify For <strong>Enterprise</strong> Available via Tidelift
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
