<template>
  <div>
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <v-icon class="me-2">mdi-information</v-icon>
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
                <v-hotkey keys="ctrl+s" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>meta+z:</span>
                <v-hotkey keys="meta+z" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>alt+f4:</span>
                <v-hotkey keys="alt+f4" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>shift+enter:</span>
                <v-hotkey keys="shift+enter" />
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
                <v-hotkey keys="ctrl+s" :key-map="customKeyMap" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>meta+z:</span>
                <v-hotkey keys="meta+z" :key-map="customKeyMap" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>alt+f4:</span>
                <v-hotkey keys="alt+f4" :key-map="customKeyMap" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>shift+enter:</span>
                <v-hotkey keys="shift+enter" :key-map="customKeyMap" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title>Display Mode Comparison</v-card-title>
          <v-card-text>
            <div class="mb-4">
              <v-btn-toggle v-model="displayMode" mandatory>
                <v-btn value="icon">Icon</v-btn>
                <v-btn value="symbol">Symbol</v-btn>
                <v-btn value="text">Text</v-btn>
              </v-btn-toggle>
            </div>

            <div class="d-flex flex-wrap ga-4 align-center">
              <v-hotkey keys="ctrl+s" :key-map="customKeyMap" :display-mode="displayMode" />
              <v-hotkey keys="meta+z" :key-map="customKeyMap" :display-mode="displayMode" />
              <v-hotkey keys="alt+f4" :key-map="customKeyMap" :display-mode="displayMode" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon class="me-2">mdi-code-tags</v-icon>
              View Key Mapping Code
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <pre class="text-caption"><code>const customKeyMap = {
  ctrl: (mode, isMac) => {
    const keyConfig = {
      symbol: '⌃',
      icon: '$ctrl',
      text: 'Control'
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
  enter: (mode, isMac) => {
    const keyConfig = {
      symbol: '⏎',
      icon: '$enter',
      text: 'Return'
    }
    const value = keyConfig[mode] ?? keyConfig.text
    return mode === 'icon' ? ['icon', value] : [mode, value]
  }
}</code></pre>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const displayMode = ref('text')

  // Custom key mapping example
  const customKeyMap = {
    ctrl: (mode, isMac) => {
      const keyConfig = {
        symbol: '⌃',
        icon: '$ctrl',
        text: 'Control'
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
        text: 'Shift'
      }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    },
    enter: (mode, isMac) => {
      const keyConfig = {
        symbol: '⏎',
        icon: '$enter',
        text: 'Return'
      }
      const value = keyConfig[mode] ?? keyConfig.text
      return mode === 'icon' ? ['icon', value] : [mode, value]
    }
  }
</script>
