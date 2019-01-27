<template>
  <v-card>
    <v-card-text>
      <v-layout align-center>
        <v-checkbox v-model="includeFiles" hide-details class="shrink mr-2"></v-checkbox>
        <v-text-field label="Include files"></v-text-field>
      </v-layout>
      <v-layout align-center>
        <v-checkbox v-model="enabled" hide-details class="shrink mr-2"></v-checkbox>
        <v-text-field :disabled="!enabled" label="I only work if you check the box"></v-text-field>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      includeFiles: true,
      enabled: false
    })
  }
</script>
