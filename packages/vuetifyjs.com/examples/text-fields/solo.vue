<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field solo label="First Name" v-model="first"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field solo-inverted label="Last Name" v-model="last"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      first: 'John',
      last: 'Doe'
    })
  }
</script>
