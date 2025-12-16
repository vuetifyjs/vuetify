<template>
  <v-card
    class="mx-auto"
    elevation="1"
    max-width="500"
  >
    <v-card-title class="py-5 font-weight-black">Securely access your tax form</v-card-title>

    <v-card-text>
      To download your tax form from GitHub Sponsors on Stripe Express, you must also verify the Tax ID number used on your tax forms, as they contain sensitive personal information.
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2 font-weight-black mb-1">Last 4 digits of your SSN</div>

      <v-text-field
        label="Enter value here"
        variant="outlined"
        single-line
      ></v-text-field>

      <v-btn
        :disabled="loading"
        :loading="loading"
        class="text-none mb-4"
        color="indigo-darken-3"
        size="x-large"
        variant="flat"
        block
        @click="loading = !loading"
      >
        Verify and continue
      </v-btn>

      <v-btn
        class="text-none"
        color="grey-lighten-3"
        size="x-large"
        variant="flat"
        block
      >
        Cancel
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const loading = ref(false)

  watch(loading, val => {
    if (!val) return
    setTimeout(() => (loading.value = false), 2000)
  })
</script>

<script>
  export default {
    data: () => ({
      loading: false,
    }),

    watch: {
      loading (val) {
        if (!val) return

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1479-92504&t=tWnPBMI0RfGlNRgq-4"
  }
</example-meta>
