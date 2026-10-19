<template>
  <v-row class="align-center justify-space-around">
    <v-time-picker
      v-model="picker"
      disabled
    ></v-time-picker>
    <v-time-picker
      v-model="picker"
      :landscape="$vuetify.display.smAndUp"
      disabled
    ></v-time-picker>
  </v-row>
</template>

<script setup>
  import { ref } from 'vue'

  const picker = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14752-321110"
  }
</example-meta>
