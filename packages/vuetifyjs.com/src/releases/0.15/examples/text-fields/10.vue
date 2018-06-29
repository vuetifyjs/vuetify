<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with hint text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-10-1"
              label="Enter your password"
              hint="At least 8 characters"
              v-model="password"
              min="8"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
              counter
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Visible</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-10-2"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              :append-icon="e2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e2 = !e2)"
              value="wqfasds"
              class="input-group--focused"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Nonvisible</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-10-2"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              :append-icon="e3 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e3 = !e3)"
              value="wqfasds"
              type="password"
              class="input-group--focused"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Error</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-10-2"
              label="Enter your password"
              hint="At least 8 characters"
              min="8"
              :append-icon="e4 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e4 = !e4)"
              value="Pa"
              v-bind:rules="[() => ('The email and password you entered don\'t match')]"
              error
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        e1: false,
        e2: false,
        e3: false,
        e4: false,
        password: 'Password'
      }
    }
  }
</script>