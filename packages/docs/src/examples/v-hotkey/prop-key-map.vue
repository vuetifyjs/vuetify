<template>
  <v-container class="pa-0" fluid>
    <v-alert
      class="mb-2"
      type="info"
      variant="tonal"
    >
      <div>
        <strong>Custom Key Mapping:</strong> Override default key representations for localization, branding, or special keys.
      </div>
    </v-alert>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-card subtitle="Standard Vuetify key representations" title="Default Key Mapping">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                ctrl+s:
                <v-hotkey keys="ctrl+s"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                meta+z:
                <v-hotkey keys="meta+z"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                alt+f4:
                <v-hotkey keys="alt+f4"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                shift+enter:
                <v-hotkey keys="shift+enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card subtitle="Customized key representations" title="Custom Key Mapping">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                ctrl+s:
                <v-hotkey :key-map="customKeyMap" keys="ctrl+s"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                meta+z:
                <v-hotkey :key-map="customKeyMap" keys="meta+z"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                alt+f4:
                <v-hotkey :key-map="customKeyMap" keys="alt+f4"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                shift+enter:
                <v-hotkey :key-map="customKeyMap" keys="shift+enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
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

<script>
  export default {
    data () {
      return {
        customKeyMap: this.createCustomKeyMap(),
      }
    },

    methods: {
      createKey (config) {
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
      },

      createCustomKeyMap () {
        return {
          ctrl: this.createKey({
            mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
            default: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
          }),
          alt: this.createKey({
            mac: { symbol: '⌥', icon: '$alt', text: 'Option' },
            default: { symbol: '⎇', icon: '$alt', text: 'Alt' },
          }),
          shift: this.createKey({
            default: { symbol: '⇧', icon: '$shift', text: 'Shift' },
          }),
          enter: this.createKey({
            default: { symbol: '⏎', icon: '$enter', text: 'Return' },
          }),
        }
      },
    },
  }
</script>
