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

    <v-row density="comfortable">
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

    <v-row density="comfortable">
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
                      :platform="platform"
                      keys="ctrl+s"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :platform="platform"
                      keys="ctrl+s"
                    ></v-hotkey>
                  </td>
                  <td>Uses "Control" instead of "Ctrl"</td>
                </tr>
                <tr>
                  <td><code>alt+f</code></td>
                  <td>
                    <v-hotkey
                      :platform="platform"
                      keys="alt+f"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :platform="platform"
                      keys="alt+f"
                    ></v-hotkey>
                  </td>
                  <td>Different symbols: ⎇ vs ⌥/Alt</td>
                </tr>
                <tr>
                  <td><code>enter</code></td>
                  <td>
                    <v-hotkey
                      :platform="platform"
                      keys="enter"
                    ></v-hotkey>
                  </td>
                  <td>
                    <v-hotkey
                      :key-map="customKeyMap"
                      :platform="platform"
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

    <v-row density="comfortable">
      <v-col cols="12">
        <v-card title="Code Example">
          <template v-slot:text>
            <pre class="text-mono">
// Import the default hotkeyMap and extend it
import { hotkeyMap } from 'vuetify/labs/VHotkey'

const customKeyMap = {
  ...hotkeyMap,
  ctrl: {
    mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
    default: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
  },
  alt: {
    mac: { symbol: '⌥', icon: '$alt', text: 'Option' },
    default: { symbol: '⎇', icon: '$alt', text: 'Alt' },
  },
  enter: {
    default: { symbol: '⏎', icon: '$enter', text: 'Return' },
  },
}
            </pre>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const platform = ref('mac')

  const customKeyMap = {
    // Include common keys that we're not customizing
    shift: {
      mac: { symbol: '⇧', icon: '$shift', text: '$vuetify.hotkey.shift' },
      default: { text: 'Shift' },
    },
    meta: {
      mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
      default: { text: 'Ctrl' },
    },
    cmd: {
      mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
      default: { text: 'Ctrl' },
    },

    // Custom key overrides
    ctrl: {
      mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
      default: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
    },
    alt: {
      mac: { symbol: '⌥', icon: '$alt', text: 'Option' },
      default: { symbol: '⎇', icon: '$alt', text: 'Alt' },
    },
    enter: {
      default: { symbol: '⏎', icon: '$enter', text: 'Return' },
    },

    // Include other keys for completeness
    arrowup: {
      default: { symbol: '↑', icon: '$arrowup', text: '$vuetify.hotkey.upArrow' },
    },
    arrowdown: {
      default: { symbol: '↓', icon: '$arrowdown', text: '$vuetify.hotkey.downArrow' },
    },
    arrowleft: {
      default: { symbol: '←', icon: '$arrowleft', text: '$vuetify.hotkey.leftArrow' },
    },
    arrowright: {
      default: { symbol: '→', icon: '$arrowright', text: '$vuetify.hotkey.rightArrow' },
    },
    backspace: {
      default: { symbol: '⌫', icon: '$backspace', text: '$vuetify.hotkey.backspace' },
    },
    escape: {
      default: { text: '$vuetify.hotkey.escape' },
    },
    space: {
      mac: { symbol: '␣', icon: '$space', text: '$vuetify.hotkey.space' },
      default: { text: '$vuetify.hotkey.space' },
    },
    '-': {
      default: { symbol: '-', icon: '$minus', text: '-' },
    },
    minus: {
      default: { symbol: '-', icon: '$minus', text: '-' },
    },
    hyphen: {
      default: { symbol: '-', icon: '$minus', text: '-' },
    },
  }
</script>

<script>
  export default {
    data () {
      return {
        platform: 'mac',
        customKeyMap: {
          // Include common keys that we're not customizing
          shift: {
            mac: { symbol: '⇧', icon: '$shift', text: '$vuetify.hotkey.shift' },
            default: { text: 'Shift' },
          },
          meta: {
            mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
            default: { text: 'Ctrl' },
          },
          cmd: {
            mac: { symbol: '⌘', icon: '$command', text: '$vuetify.hotkey.command' },
            default: { text: 'Ctrl' },
          },

          // Custom key overrides
          ctrl: {
            mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
            default: { symbol: '⌃', icon: '$ctrl', text: 'Control' },
          },
          alt: {
            mac: { symbol: '⌥', icon: '$alt', text: 'Option' },
            default: { symbol: '⎇', icon: '$alt', text: 'Alt' },
          },
          enter: {
            default: { symbol: '⏎', icon: '$enter', text: 'Return' },
          },

          // Include other keys for completeness
          arrowup: {
            default: { symbol: '↑', icon: '$arrowup', text: '$vuetify.hotkey.upArrow' },
          },
          arrowdown: {
            default: { symbol: '↓', icon: '$arrowdown', text: '$vuetify.hotkey.downArrow' },
          },
          arrowleft: {
            default: { symbol: '←', icon: '$arrowleft', text: '$vuetify.hotkey.leftArrow' },
          },
          arrowright: {
            default: { symbol: '→', icon: '$arrowright', text: '$vuetify.hotkey.rightArrow' },
          },
          backspace: {
            default: { symbol: '⌫', icon: '$backspace', text: '$vuetify.hotkey.backspace' },
          },
          escape: {
            default: { text: '$vuetify.hotkey.escape' },
          },
          space: {
            mac: { symbol: '␣', icon: '$space', text: '$vuetify.hotkey.space' },
            default: { text: '$vuetify.hotkey.space' },
          },
          '-': {
            default: { symbol: '-', icon: '$minus', text: '-' },
          },
          minus: {
            default: { symbol: '-', icon: '$minus', text: '-' },
          },
          hyphen: {
            default: { symbol: '-', icon: '$minus', text: '-' },
          },
        },
      }
    },
  }
</script>
