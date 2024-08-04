<template>
  <v-card
    class="px-2 mx-auto"
    max-width="300"
    rounded="lg"
    text="How satisfied are you with developing using Vuetify?"
    theme="dark"
    title="SURVEY"
    variant="flat"
  >
    <template v-slot:append>
      <div class="me-n2">
        <v-btn
          density="comfortable"
          icon="$close"
          variant="plain"
        ></v-btn>
      </div>
    </template>

    <v-item-group
      v-model="model"
      class="d-flex justify-sm-space-between px-6 pt-2 pb-6"
    >
      <v-item
        v-for="n in 5"
        :key="n"
      >
        <template v-slot:default="{ toggle }">
          <v-btn
            :active="model != null && model + 1 >= n"
            :icon="icons[n]"
            height="40"
            variant="text"
            width="40"
            border
            @click="toggle"
          ></v-btn>
        </template>
      </v-item>
    </v-item-group>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref(null)
  const icons = [
    'i-mdi:numeric-1',
    'i-mdi:numeric-2',
    'i-mdi:numeric-3',
    'i-mdi:numeric-4',
    'i-mdi:numeric-5',
  ]
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
