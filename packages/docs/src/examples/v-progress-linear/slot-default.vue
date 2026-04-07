<template>
  <v-container>
    <v-progress-linear
      :model-value="power"
      color="amber"
      height="25"
    ></v-progress-linear>

    <br>

    <v-progress-linear
      :model-value="knowledge"
      height="25"
    >
      <!-- your value, no need to round unless you want to -->
      <strong>{{ knowledge }}%</strong>
    </v-progress-linear>

    <br>

    <v-progress-linear
      :model-value="skill"
      color="blue-grey"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ roundingEnabled ? value.toFixed(1) : value }}%</strong>
      </template>
    </v-progress-linear>

    <v-switch
      v-model="roundingEnabled"
      color="success"
      label="with rounding"
      hide-details
    ></v-switch>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const skill = ref(28.3)
  const knowledge = ref(33)
  const power = ref(78)

  const roundingEnabled = ref(true)
</script>

<script>
  export default {
    data: () => ({
      skill: 20,
      knowledge: 33,
      power: 78,
      powroundingEnableder: true,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2747-79615&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>
