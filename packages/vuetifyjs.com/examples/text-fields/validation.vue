<template>
  <v-container fluid>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar color="teal">
            <v-btn icon>
              <v-icon color="white">arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="white">more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="title"
                  :rules="[rules.required]"
                  label="Title"
                  counter
                  max="15"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="E-mail"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Preliminary report',
        email: '',
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    }
  }
</script>
