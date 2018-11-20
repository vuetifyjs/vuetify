<template>
  <v-card class="grey lighten-4">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-radio-group v-model="context" row>
              <v-radio value="success" label="Success" light class="success--text"></v-radio>
              <v-radio value="info" label="Info" light class="info--text"></v-radio>
              <v-radio value="warning" label="Warning" light class="warning--text"></v-radio>
              <v-radio value="error" label="Error" light class="error--text"></v-radio>
              <v-radio value="primary" label="Primary" light class="primary--text"></v-radio>
              <v-radio value="secondary" label="Secondary" light class="secondary--text"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="multi-line" label="Multi-line (mobile)" light></v-checkbox>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="vertical" label="Vertical (mobile)" light></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 offset-sm4>
            <v-text-field v-model="text" type="text" label="Text"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model.number="timeout" type="number" label="Timeout"></v-text-field>
          </v-flex>
        </v-layout>

      </v-container>
      <v-btn block primary @click.native="snackbar = true" dark>Show Snackbar</v-btn>
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
      <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
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
