<template>
  <v-responsive
    class="mx-auto"
    max-width="344"
  >
    <v-text-field
      v-model="model"
      hide-details="auto"
      label="Last name"
      clearable
    ></v-text-field>
  </v-responsive>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref('Leider')
</script>

<script>
  export default {
    data: () => ({
      model: 'Leider',
    }),
  }
</script>
<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14348-5431"
}
</example-meta>
