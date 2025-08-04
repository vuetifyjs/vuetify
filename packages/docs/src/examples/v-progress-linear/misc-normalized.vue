<template>
  <v-container>
    <v-progress-linear
      v-for="(percentage, index) of percentages"
      :key="index"
      :model-value="percentage"
      color="blue-grey"
      height="25"
    >
      <template v-slot:default="{ value }">
        <strong>
          {{ value }}%
        </strong>
      </template>
    </v-progress-linear>
  </v-container>
</template>

<script setup>
  const percentages = [28, 29]
</script>

<script>
  export default {
    data: () => ({
      percentages: [28, 29],
    }),
  }
</script>
