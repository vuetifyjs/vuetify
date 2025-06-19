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
                <v-hotkey display-mode="icon" keys="ctrl+k"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey display-mode="icon" keys="meta+shift+p"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey display-mode="icon" keys="alt+arrowup"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey display-mode="icon" keys="enter"></v-hotkey>
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
                <v-hotkey display-mode="symbol" keys="ctrl+k"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey display-mode="symbol" keys="meta+shift+p"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey display-mode="symbol" keys="alt+arrowup"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey display-mode="symbol" keys="enter"></v-hotkey>
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
                <v-hotkey display-mode="text" keys="ctrl+k"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey display-mode="text" keys="meta+shift+p"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey display-mode="text" keys="alt+arrowup"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter:</span>
                <v-hotkey display-mode="text" keys="enter"></v-hotkey>
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
              <v-hotkey :display-mode="displayMode" keys="ctrl+shift+k"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="meta+alt+p"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="shift+enter"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="ctrl+k-then-p"></v-hotkey>
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
