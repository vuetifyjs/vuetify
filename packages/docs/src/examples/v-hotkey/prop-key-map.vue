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

    <v-row dense>
      <v-col cols="12">
        <v-card title="Platform Comparison with Custom Mapping">
          <template v-slot:text>
            <div class="mb-4 text-center">
              <v-btn-toggle v-model="platform" density="compact" border divided mandatory>
                <v-btn value="pc">PC Platform</v-btn>
                <v-btn value="mac">Mac Platform</v-btn>
              </v-btn-toggle>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Default Mapping</th>
                  <th>Custom Mapping</th>
                  <th>Difference</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><code>ctrl+s</code></td>
                  <td>
                    <v-hotkey
                      :override-platform="platform"
                      keys="ctrl+s"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :override-platform="platform"
                      keys="ctrl+s"
                    ></v-hotkey>
                  </td>
                  <td>Uses "Control" instead of "Ctrl"</td>
                </tr>
                <tr>
                  <td><code>alt+f</code></td>
                  <td>
                    <v-hotkey
                      :override-platform="platform"
                      keys="alt+f"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :override-platform="platform"
                      keys="alt+f"
                    ></v-hotkey>
                  </td>
                  <td>Different symbols: ⎇ vs ⌥/Alt</td>
                </tr>
                <tr>
                  <td><code>enter</code></td>
                  <td>
                    <v-hotkey
                      :override-platform="platform"
                      keys="enter"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :override-platform="platform"
                      keys="enter"
                    ></v-hotkey>
                  </td>
                  <td>Uses "Return" and ⏎ symbol</td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const platform = ref('mac')

  function createKey (config) {
    return (requestedMode, isMac) => {
      const keyCfg = (isMac && config.mac) ? config.mac : config.default

      // 1. Resolve the safest display mode for the current platform
      const mode = (() => {
        // Non-Mac platforms rarely use icons – prefer text
        if (requestedMode === 'icon' && !isMac) return 'text'

        // If the requested mode lacks an asset, fall back to text
        if (requestedMode === 'icon' && !keyCfg.icon) return 'text'
        if (requestedMode === 'symbol' && !keyCfg.symbol) return 'text'

        return requestedMode
      })()

      // 2. Pick value for the chosen mode, defaulting to text representation
      let value = keyCfg[mode] ?? keyCfg.text

      // 3. Guard against icon tokens leaking into text mode (e.g. "$ctrl")
      if (mode === 'text' && typeof value === 'string' && value.startsWith('$') && !value.startsWith('$vuetify.')) {
        value = value.slice(1).toUpperCase() // "$ctrl" → "CTRL"
      }

      return mode === 'icon'
        ? ['icon', value]
        : [mode, value]
    }
  }

  // Custom key mapping example using the optimized createKey function
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
        platform: 'mac',
        customKeyMap: this.createCustomKeyMap(),
      }
    },

    methods: {
      createKey (config) {
        return (requestedMode, isMac) => {
          const keyCfg = (isMac && config.mac) ? config.mac : config.default

          // 1. Resolve the safest display mode for the current platform
          const mode = (() => {
            // Non-Mac platforms rarely use icons – prefer text
            if (requestedMode === 'icon' && !isMac) return 'text'

            // If the requested mode lacks an asset, fall back to text
            if (requestedMode === 'icon' && !keyCfg.icon) return 'text'
            if (requestedMode === 'symbol' && !keyCfg.symbol) return 'text'

            return requestedMode
          })()

          // 2. Pick value for the chosen mode, defaulting to text representation
          let value = keyCfg[mode] ?? keyCfg.text

          // 3. Guard against icon tokens leaking into text mode (e.g. "$ctrl")
          if (mode === 'text' && typeof value === 'string' && value.startsWith('$') && !value.startsWith('$vuetify.')) {
            value = value.slice(1).toUpperCase() // "$ctrl" → "CTRL"
          }

          return mode === 'icon'
            ? ['icon', value]
            : [mode, value]
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
