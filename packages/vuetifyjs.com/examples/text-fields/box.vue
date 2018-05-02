<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-text-field v-model="first" box label="First Name"></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field v-model="last" box label="Last Name"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          :rules="emailRules"
          v-model="email"
          box
          label="Email address"
          hint="Enter your email!"
          persistent-hint
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field box multi-line label="Bio"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      first: 'John',
      last: 'Doe',
      email: '',
      emailRules: [
        v => {
          return !!v || 'E-mail is required'
        },
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    })
  }
</script>
