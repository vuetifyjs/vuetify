<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Icon Mode (Default)</v-card-title>
          <v-card-subtitle>Uses SVG icons - compact and modern</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl + K:</span>
                <v-hotkey keys="ctrl+k" display-mode="icon" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey keys="meta+shift+p" display-mode="icon" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey keys="alt+arrowup" display-mode="icon" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey keys="enter" display-mode="icon" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Symbol Mode</v-card-title>
          <v-card-subtitle>Uses Unicode symbols - Mac-style appearance</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl + K:</span>
                <v-hotkey keys="ctrl+k" display-mode="symbol" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey keys="meta+shift+p" display-mode="symbol" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey keys="alt+arrowup" display-mode="symbol" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey keys="enter" display-mode="symbol" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Text Mode</v-card-title>
          <v-card-subtitle>Uses full text labels - most accessible</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl + K:</span>
                <v-hotkey keys="ctrl+k" display-mode="text" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey keys="meta+shift+p" display-mode="text" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey keys="alt+arrowup" display-mode="text" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey keys="enter" display-mode="text" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Interactive Comparison</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <v-btn-toggle v-model="displayMode" mandatory>
                <v-btn value="icon">Icon</v-btn>
                <v-btn value="symbol">Symbol</v-btn>
                <v-btn value="text">Text</v-btn>
              </v-btn-toggle>
            </div>

            <div class="d-flex flex-wrap ga-4 align-center">
              <v-hotkey keys="ctrl+shift+k" :display-mode="displayMode" />
              <v-hotkey keys="meta+alt+p" :display-mode="displayMode" />
              <v-hotkey keys="shift+enter" :display-mode="displayMode" />
              <v-hotkey keys="ctrl+k-then-p" :display-mode="displayMode" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const displayMode = ref('icon')
</script>
