<template>
  <v-card color="grey lighten-4">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm3>
            <v-checkbox v-model="x" value="left" label="Left"></v-checkbox>
          </v-flex>
          <v-flex xs6 sm3>
            <v-checkbox v-model="x" value="right" label="Right"></v-checkbox>
          </v-flex>
          <v-flex xs6 sm3>
            <v-checkbox v-model="y" value="top" label="Top"></v-checkbox>
          </v-flex>
          <v-flex xs6 sm3>
            <v-checkbox v-model="y" value="bottom" label="Bottom"></v-checkbox>
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
      <v-btn block color="primary" @click.native="snackbar = true" dark>Show Snackbar</v-btn>
    </v-card-text>
    <v-snackbar
      :timeout="timeout"
      :top="y === 'top'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="snackbar"
    >
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar'
      }
    }
  }
</script>
