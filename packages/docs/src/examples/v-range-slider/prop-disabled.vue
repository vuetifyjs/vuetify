<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-range-slider
          v-model="value"
          label="Disabled"
          disabled
        ></v-range-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([30, 60])
</script>

<script>
  export default {
    data () {
      return {
        value: [30, 60],
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2073-38210"
  }
</example-meta>
