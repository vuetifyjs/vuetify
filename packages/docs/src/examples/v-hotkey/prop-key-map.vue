<template>
  <div>
    <v-alert
      class="mb-4"
      type="info"
      variant="tonal"
    >
      <div>
        <strong>Custom Key Mapping:</strong> Override default key representations for localization, branding, or special keys.
      </div>
    </v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Default Key Mapping</v-card-title>
          <v-card-subtitle>Standard Vuetify key representations</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>ctrl+s:</span>
                <v-hotkey keys="ctrl+s"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>meta+z:</span>
                <v-hotkey keys="meta+z"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>alt+f4:</span>
                <v-hotkey keys="alt+f4"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>shift+enter:</span>
                <v-hotkey keys="shift+enter"></v-hotkey>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Custom Key Mapping</v-card-title>
          <v-card-subtitle>Customized key representations</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>ctrl+s:</span>
                <v-hotkey :key-map="customKeyMap" keys="ctrl+s"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>meta+z:</span>
                <v-hotkey :key-map="customKeyMap" keys="meta+z"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>alt+f4:</span>
                <v-hotkey :key-map="customKeyMap" keys="alt+f4"></v-hotkey>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>shift+enter:</span>
                <v-hotkey :key-map="customKeyMap" keys="shift+enter"></v-hotkey>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>

  // Custom key mapping example
  const customKeyMap = {
    ctrl: (mode, isMac) => {
      const keyConfig = {
        symbol: '⌃',
        icon: '$ctrl',
        text: 'Control',
      }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    },
    alt: (mode, isMac) => {
      const keyConfig = isMac
        ? { symbol: '⌥', icon: '$alt', text: 'Option' }
        : { symbol: '⎇', icon: '$alt', text: 'Alt' }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    },
    shift: (mode, isMac) => {
      const keyConfig = {
        symbol: '⇧',
        icon: '$shift',
        text: 'Shift',
      }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    },
    enter: (mode, isMac) => {
      const keyConfig = {
        symbol: '⏎',
        icon: '$enter',
        text: 'Return',
      }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    },
  }
</script>
