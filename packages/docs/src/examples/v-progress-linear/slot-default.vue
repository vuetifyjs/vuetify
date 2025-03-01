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
