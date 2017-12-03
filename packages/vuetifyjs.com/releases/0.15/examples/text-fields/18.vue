<template>
  <div>
    <v-card class="grey lighten-4 elevation-0">
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="body-2">Light Theme</div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box label="First Name" v-model="first"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box label="Last Name" v-model="last"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              box
              label="Email address"
              :rules="emailRules"
              v-model="email"
              hint="Enter your email!"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field box multi-line label="Bio"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-card dark>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="body-2 white--text">Dark Theme</div>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box dark label="First Name" v-model="first"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field box dark label="Last Name" v-model="last"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              box dark
              label="Email address"
              :rules="emailRules"
              v-model="email"
              hint="Enter your email!"
              persistent-hint
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field box dark multi-line label="Bio"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
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
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    })
  }
</script>