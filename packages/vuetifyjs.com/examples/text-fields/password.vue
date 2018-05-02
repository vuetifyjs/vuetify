<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Normal with hint text</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          v-model="password"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          name="input-10-1"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
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
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
          name="input-10-2"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          value="wqfasds"
          class="input-group--focused"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Not visible</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          :append-icon="e3 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e3 = !e3)"
          :type="e3 ? 'password' : 'text'"
          name="input-10-2"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          value="wqfasds"
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
          :append-icon="e4 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e4 = !e4)"
          :rules="[() => ('The email and password you entered don\'t match')]"
          :type="e4 ? 'password' : 'text'"
          name="input-10-2"
          label="Enter your password"
          hint="At least 8 characters"
          min="8"
          value="Pa"
          error
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
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
