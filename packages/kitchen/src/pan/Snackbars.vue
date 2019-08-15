<template>
  <v-container>
    <v-layout column>
      <main-header>Snackbars</main-header>

      <core-title>Positioning</core-title>
      <core-section>
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-layout wrap justify-space-around>
                <v-flex xs12 sm3>
                  <v-checkbox
                    v-model="x1"
                    label="Left"
                    value="left"
                  />
                </v-flex>

                <v-flex xs6 sm3>
                  <v-checkbox
                    v-model="x1"
                    label="Right"
                    value="right"
                  />
                </v-flex>

                <v-flex xs6 sm3>
                  <v-checkbox
                    v-model="y1"
                    label="Top"
                    value="top"
                  />
                </v-flex>

                <v-flex xs6 sm3>
                  <v-checkbox
                    v-model="y1"
                    label="Bottom"
                    value="bottom"
                  />
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="text1"
                    label="Text"
                    type="text"
                  />
                </v-flex>
              </v-layout>

            </v-container>
            <v-btn
              block
              color="primary"
              dark
              @click="snackbar1 = true"
            >
              Show Snackbar
            </v-btn>
          </v-card-text>

          <v-snackbar
            v-model="snackbar1"
            :bottom="y1 === 'bottom'"
            :left="x1 === 'left'"
            :right="x1 === 'right'"
            :top="y1 === 'top'"
          >
            {{ text1 }}
            <v-btn
              color="pink"
              text
              @click="snackbar1 = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </core-section>

      <core-title>Custom close timeout</core-title>
      <core-section>
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-layout wrap justify-space-around>
                <v-flex xs12 sm4>
                  <v-text-field
                    v-model.number="timeout2"
                    label="Timeout"
                    type="number"
                  />
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="text2"
                    label="Text"
                    type="text"
                  />
                </v-flex>
              </v-layout>

            </v-container>
            <v-btn
              block
              color="primary"
              dark
              @click="snackbar2 = true"
            >
              Show Snackbar
            </v-btn>
          </v-card-text>

          <v-snackbar
            v-model="snackbar2"
            :timeout="timeout2"
          >
            {{ text2 }}
            <v-btn
              color="pink"
              text
              @click="snackbar2 = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </core-section>

      <core-title>Mobile modes</core-title>
      <core-section>
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-layout wrap justify-space-around>
                <v-flex xs12 sm3>
                  <v-checkbox
                    v-model="mode3"
                    label="Multi-line (mobile)"
                    value="multi-line"
                  />
                </v-flex>

                <v-flex xs12 sm3>
                  <v-checkbox
                    v-model="mode3"
                    label="Vertical (mobile)"
                    value="vertical"
                  />
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="text3"
                    label="Text"
                    type="text"
                  />
                </v-flex>
              </v-layout>

            </v-container>
            <v-btn
              block
              color="primary"
              dark
              @click="snackbar3 = true"
            >
              Show Snackbar
            </v-btn>
          </v-card-text>

          <v-snackbar
            v-model="snackbar3"
            :multi-line="mode3 === 'multi-line'"
            :vertical="mode3 === 'vertical'"
          >
            {{ text3 }}
            <v-btn
              color="pink"
              text
              @click="snackbar3 = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </core-section>

      <core-title>Coloring</core-title>
      <core-section>
        <v-card>
          <v-card-text>
            <v-container fluid>
              <v-layout wrap justify-space-around>
                <v-flex xs12 sm6>
                  <v-radio-group v-model="color4" row>
                    <v-radio
                      v-for="(colorValue, i) in ['success', 'info', 'error', 'cyan darken-2']"
                      :key="i"
                      :color="colorValue"
                      :label="colorValue"
                      :value="colorValue"
                    />
                  </v-radio-group>
                </v-flex>

                <v-flex xs12 sm4>
                  <v-text-field
                    v-model="text4"
                    label="Text"
                    type="text"
                  />
                </v-flex>
              </v-layout>

            </v-container>
            <v-btn
              block
              color="primary"
              dark
              @click="snackbar4 = true"
            >
              Show Snackbar
            </v-btn>
          </v-card-text>

          <v-snackbar
            v-model="snackbar4"
            :color="color4"
          >
            {{ text4 }}
            <v-btn
              color="pink"
              text
              @click="snackbar4 = false"
            >
              Close
            </v-btn>
          </v-snackbar>
        </v-card>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Snackbars',

    data: () => ({
      snackbar1: false,
      y1: 'top',
      x1: null,
      text1: 'Hello, I\'m a snackbar',

      snackbar2: false,
      timeout2: 6000,
      text2: 'Hello, I\'m a snackbar',

      snackbar3: false,
      mode3: '',
      text3: 'Hello, I\'m a snackbar',

      snackbar4: false,
      color4: 'error',
      text4: 'Hello, I\'m a snackbar',
    }),
  }
</script>
