<template>
  <v-container fluid>
    <v-select
      v-model="radio"
      :items="['Option 1', 'Option 2']"
      label="Select Option"
    ></v-select>
    <v-radio
      v-model="radio"
      false-value="Option 2"
      label="Option 1"
      true-value="Option 1"
      readonly
    ></v-radio>
    <v-radio
      v-model="radio"
      false-value="Option 1"
      label="Option 2"
      true-value="Option 2"
      readonly
    ></v-radio>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radio = ref('Option 1')
</script>

<script>
  export default {
    data () {
      return {
        radio: 'Option 1',
      }
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2070-80768&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
