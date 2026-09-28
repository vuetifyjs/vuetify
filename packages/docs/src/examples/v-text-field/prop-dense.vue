<template>
  <v-card
    class="mx-auto"
    color="surface-light"
    max-width="400"
  >
    <v-card-text>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const loaded = ref(false)
  const loading = ref(false)

  function onClick () {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      loaded.value = true
    }, 2000)
  }
</script>

<script>
  export default {
    data: () => ({
      loaded: false,
      loading: false,
    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2103-37391&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
