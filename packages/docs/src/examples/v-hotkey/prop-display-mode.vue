<template>
  <v-container class="pa-0" fluid>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card
          height="232"
          subtitle="Uses SVG icons - compact and modern"
          title="Icon Mode (Default)"
        >
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl + K:
                <v-hotkey display-mode="icon" keys="ctrl+k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Meta + Shift + P:
                <v-hotkey display-mode="icon" keys="meta+shift+p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Alt + Arrow:
                <v-hotkey display-mode="icon" keys="alt+arrowup"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Enter:
                <v-hotkey display-mode="icon" keys="enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          height="232"
          subtitle="Uses Unicode symbols - Mac-style appearance"
          title="Symbol Mode"
        >
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl + K:
                <v-hotkey display-mode="symbol" keys="ctrl+k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Meta + Shift + P:
                <v-hotkey display-mode="symbol" keys="meta+shift+p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Alt + Arrow:
                <v-hotkey display-mode="symbol" keys="alt+arrowup"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Enter:
                <v-hotkey display-mode="symbol" keys="enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card
          subtitle="Uses full text labels - most accessible"
          title="Text Mode"
        >
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl + K:
                <v-hotkey display-mode="text" keys="ctrl+k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Meta + Shift + P:
                <v-hotkey display-mode="text" keys="meta+shift+p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Alt + Arrow:
                <v-hotkey display-mode="text" keys="alt+arrowup"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Enter:
                <v-hotkey display-mode="text" keys="enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-card title="Interactive Comparison">
          <template v-slot:text>
            <div class="mb-8 text-center">
              <v-btn-toggle v-model="displayMode" density="compact" border divided mandatory>
                <v-btn value="icon">Icon</v-btn>
                <v-btn value="symbol">Symbol</v-btn>
                <v-btn value="text">Text</v-btn>
              </v-btn-toggle>
            </div>

            <div class="d-flex flex-wrap ga-4 align-center justify-center">
              <v-hotkey :display-mode="displayMode" keys="ctrl+shift+k"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="meta+alt+p"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="shift+enter"></v-hotkey>
              <v-hotkey :display-mode="displayMode" keys="ctrl+k-then-p"></v-hotkey>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const displayMode = ref('icon')
</script>

<script>
  export default {
    data () {
      return {
        displayMode: 'icon',
      }
    },
  }
</script>
