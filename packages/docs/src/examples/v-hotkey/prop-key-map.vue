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
  /**
   * Creates a key function from declarative configuration
   * This approach separates platform logic from display mode logic
   */
  function createKey (config) {
    return (mode, isMac) => {
      const keyConfig = (isMac && config.mac) ? config.mac : config.default
      const value = keyConfig[mode] ?? keyConfig.text

      // If we requested icon mode but no icon is available, fallback to text mode
      if (mode === 'icon' && !keyConfig.icon) {
        return ['text', value]
      }

      // If we requested symbol mode but no symbol is available, fallback to text mode
      if (mode === 'symbol' && !keyConfig.symbol) {
        return ['text', value]
      }

      return mode === 'icon' ? ['icon', value] : [mode, value]
    }
  }

  // Custom key mapping example using the new declarative configuration
  const customKeyMap = {
    ctrl: createKey({
      mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
      default: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
    }),
    alt: createKey({
      mac: { symbol: '⌥', icon: '$alt', text: 'Option' },
      default: { symbol: '⎇', icon: '$alt', text: 'Alt' },
    }),
    shift: createKey({
      default: { symbol: '⇧', icon: '$shift', text: 'Shift' },
    }),
    enter: createKey({
      default: { symbol: '⏎', icon: '$enter', text: 'Return' },
    }),
  }
</script>
