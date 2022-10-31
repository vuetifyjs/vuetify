<template>
  <v-container fluid>
    <p>{{ people }}</p>
    <v-switch
      v-model="people"
      color="primary"
      label="John"
      model-value="John"
      hide-details
    ></v-switch>
    <v-switch
      v-model="people"
      color="primary"
      label="Jacob"
      model-value="Jacob"
      hide-details
    ></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        people: ['John'],
      }
    },
  }
</script>
