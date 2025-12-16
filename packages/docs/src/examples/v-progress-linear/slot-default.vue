<template>
  <div>
    <v-progress-linear
      v-model="power"
      color="amber"
      height="25"
    ></v-progress-linear>

    <br>

    <v-progress-linear
      v-model="skill"
      color="blue-grey"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>

    <br>

    <v-progress-linear
      v-model="knowledge"
      height="25"
    >
      <strong>{{ Math.ceil(knowledge) }}%</strong>
    </v-progress-linear>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const skill = ref(20)
  const knowledge = ref(33)
  const power = ref(78)
</script>

<script>
  export default {
    data: () => ({
      skill: 20,
      knowledge: 33,
      power: 78,
    }),
  }
</script>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2747-79615&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>