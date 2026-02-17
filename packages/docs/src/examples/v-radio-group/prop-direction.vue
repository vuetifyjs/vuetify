<template>
  <v-container fluid>
    <v-radio-group v-model="column">
      <v-radio
        label="Option 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Option 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
    <hr>
    <v-radio-group
      v-model="inline"
      inline
    >
      <v-radio
        label="Option 1"
        value="radio-1"
      ></v-radio>
      <v-radio
        label="Option 2"
        value="radio-2"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const column = ref(null)
  const inline = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        column: null,
        inline: null,
      }
    },
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2073-36010&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
