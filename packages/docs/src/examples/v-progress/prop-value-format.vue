<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-progress
          label="Uploading..."
          max="76.8"
          model-value="15.2"
          value-format="[value] / [max] GB"
        ></v-progress>
      </v-col>

      <v-col cols="12" md="6">
        <v-progress
          :value-format="formatUploaded"
          label="Processing..."
          max="120"
          model-value="65"
        ></v-progress>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  function formatUploaded ({ value, max }) {
    return `${Math.floor(value)} out of ${max} items`
  }
</script>
