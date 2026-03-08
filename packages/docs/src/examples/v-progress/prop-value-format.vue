<script lang="ts" setup>
  import { shallowRef } from 'vue'

  const value = shallowRef(75)

  function format (v: number) {
    return `${Math.round(v)} out of 100 items`
  }
</script>

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-progress
        :model-value="value"
        color="primary"
        value-format="[value] of 100"
      >
        <template v-slot:label="{ formattedValue }">
          {{ formattedValue }}
        </template>
      </v-progress>
    </v-col>

    <v-col cols="12" md="6">
      <v-progress
        :model-value="value"
        :value-format="format"
        color="info"
      >
        <template v-slot:label="{ formattedValue }">
          {{ formattedValue }}
        </template>
      </v-progress>
    </v-col>
  </v-row>
</template>
