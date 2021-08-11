<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-atom.svg`"
    :width="size"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HomeVuetifyLogo',

    props: {
      size: String,
    },

  })
</script>
