<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 v-for="field in fields" :key="field">
        <v-text-field :label="field"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      fields: ['One', 'two', 'three', 'four', 'five', 'six']
    })
  }
</script>
