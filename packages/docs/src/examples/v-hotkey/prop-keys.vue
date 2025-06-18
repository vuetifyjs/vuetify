<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Single Keys</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                <span>Letter key:</span>
                <v-hotkey keys="k" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Enter key:</span>
                <v-hotkey keys="enter" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Escape key:</span>
                <v-hotkey keys="escape" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Arrow key:</span>
                <v-hotkey keys="arrowup" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Key Combinations</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl + K:</span>
                <v-hotkey keys="ctrl+k" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Meta + Shift + P:</span>
                <v-hotkey keys="meta+shift+p" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Alt + Arrow:</span>
                <v-hotkey keys="alt+arrowup" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl + Shift + Enter:</span>
                <v-hotkey keys="ctrl+shift+enter" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Sequential Actions</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl+K then P:</span>
                <v-hotkey keys="ctrl+k-then-p" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl+X then Ctrl+C:</span>
                <v-hotkey keys="ctrl+x-then-ctrl+c" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Multiple Shortcuts</v-card-title>
          <v-card-text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                <span>Ctrl+K or Meta+P:</span>
                <v-hotkey keys="ctrl+k meta+p" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>Multiple options:</span>
                <v-hotkey keys="ctrl+s meta+s ctrl+shift+s" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  //
</script>
