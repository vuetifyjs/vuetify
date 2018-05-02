<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <v-radio-group v-model="color" row>
              <v-radio
                v-for="(colorValue, i) in ['success', 'info', 'error', 'cyan darken-2']"
                :key="i"
                :value="colorValue"
                :label="colorValue"
                :color="colorValue"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="multi-line" label="Multi-line (mobile)"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm3>
            <v-checkbox v-model="mode" value="vertical" label="Vertical (mobile)"></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 offset-sm4>
            <v-text-field v-model="text" type="text" label="Text"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model.number="timeout" type="number" label="Timeout"></v-text-field>
          </v-flex>
        </v-layout>

      </v-container>
      <v-btn block color="primary" dark @click.native="snackbar = true">Show Snackbar</v-btn>
    </v-card-text>
    <v-snackbar
      :timeout="timeout"
      :color="color"
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
        color: '',
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    }
  }
</script>
