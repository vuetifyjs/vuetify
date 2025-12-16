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
            :icon="`mdi-numeric-${n}`"
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
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1479-4851&t=tWnPBMI0RfGlNRgq-4"
  }
</example-meta>
