<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="color" row>
              <v-radio
                v-for="(colorValue, i) in ['success', 'info', 'error', 'cyan darken-2']"
                :key="i"
                :color="colorValue"
                :label="colorValue"
                :value="colorValue"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="3">
            <v-checkbox
              v-model="x"
              label="Left"
              value="left"
            ></v-checkbox>
          </v-col>

          <v-col cols="6" sm="3">
            <v-checkbox
              v-model="x"
              label="Right"
              value="right"
            ></v-checkbox>
          </v-col>

          <v-col cols="6" sm="3">
            <v-checkbox
              v-model="y"
              label="Top"
              value="top"
            ></v-checkbox>
          </v-col>

          <v-col cols="6" sm="3">
            <v-checkbox
              v-model="y"
              label="Bottom"
              value="bottom"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="3">
            <v-checkbox
              v-model="mode"
              label="Multi-line (mobile)"
              value="multi-line"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="3">
            <v-checkbox
              v-model="mode"
              label="Vertical (mobile)"
              value="vertical"
            ></v-checkbox>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model="text"
              class="px-4"
              label="Text"
              type="text"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4">
            <v-text-field
              v-model.number="timeout"
              class="px-4"
              label="Timeout"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

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
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        text
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
        color: '',
        mode: '',
        snackbar: false,
        text: 'Hello, I\'m a snackbar',
        timeout: 6000,
        x: null,
        y: 'top',
      }
    },
  }
  </script>
