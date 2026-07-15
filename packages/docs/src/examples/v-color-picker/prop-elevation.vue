<template>
  <div class="d-flex justify-space-around">
    <v-color-picker
      v-model="picker"
      elevation="0"
    ></v-color-picker>

    <v-color-picker
      v-model="picker"
      elevation="4"
    ></v-color-picker>
  </div>
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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2771-94625&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
