<template>
  <v-container fluid>
    <p>Selected Button: {{ radios }}</p>
    <v-radio-group v-model="radios">
      <v-radio label="Option One" value="one"></v-radio>
      <v-radio label="Option 2 (string)" value="2"></v-radio>
      <v-radio :value="3" label="Option 3 (integer)"></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radios = ref('one')
</script>

<script>
  export default {
    data () {
      return {
        radios: 'one',
      }
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2070-80534&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
