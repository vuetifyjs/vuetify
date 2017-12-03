<template>
  <v-card class="grey lighten-4">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="success" label="Success" dark></v-radio>
          </v-flex>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="info" label="Info" dark></v-radio>
          </v-flex>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="warning" label="Warning" dark></v-radio>
          </v-flex>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="error" label="Error" dark></v-radio>
          </v-flex>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="primary" label="Primary" dark></v-radio>
          </v-flex>
          <v-flex xs6 sm2>
            <v-radio v-model="context" value="secondary" label="Secondary" dark></v-radio>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="multi-line" label="Multi-line (mobile)" dark></v-checkbox>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="vertical" label="Vertical (mobile)" dark></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 offset-sm4>
            <v-text-field v-model="text" type="text" label="Text"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model.number="timeout" type="number" label="Timeout"></v-text-field>
          </v-flex>
        </v-layout>

      </v-container>
      <v-btn block primary @click.native="snackbar = true" light>Show Snackbar</v-btn>
    </v-card-text>
    <v-snackbar
      :timeout="timeout"
      :success="context === 'success'"
      :info="context === 'info'"
      :warning="context === 'warning'"
      :error="context === 'error'"
      :primary="context === 'primary'"
      :secondary="context === 'secondary'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn light flat @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        context: '',
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    }
  }
</script>
