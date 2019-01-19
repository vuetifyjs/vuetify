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
                :color="colorValue"
                :label="colorValue"
                :value="colorValue"
              ></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs12 sm3>
            <v-checkbox
              v-model="mode"
              label="Multi-line (mobile)"
              value="multi-line"
            ></v-checkbox>
          </v-flex>

          <v-flex xs12 sm3>
            <v-checkbox
              v-model="mode"
              label="Vertical (mobile)"
              value="vertical"
            ></v-checkbox>
          </v-flex>

          <v-flex xs12 sm4 offset-sm4>
            <v-text-field
              v-model="text"
              label="Text"
              type="text"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 sm4>
            <v-text-field
              v-model.number="timeout"
              label="Timeout"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn
        block
        color="primary"
        dark
        @click="snackbar = true"
      >
        Show Snackbar
      </v-btn>
    </v-card-text>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
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
