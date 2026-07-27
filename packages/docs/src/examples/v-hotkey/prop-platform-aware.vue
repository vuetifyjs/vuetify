<template>
  <v-container class="pa-0" fluid>
    <v-alert
      class="mb-2"
      type="info"
      variant="tonal"
    >
      <div class="d-flex align-center">
        <div>
          <strong>Platform Detection:</strong> Currently detected as {{ isMac ? 'Mac' : 'PC' }}
        </div>
      </div>
    </v-alert>

    <v-row density="comfortable">
      <v-col cols="12" md="6">
        <v-card subtitle="These keys automatically adapt to your platform" title="Cross-Platform Keys">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                meta+k:
                <v-hotkey keys="meta+k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                alt+shift+f:
                <v-hotkey keys="alt+shift+f"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                meta+alt+shift+k:
                <v-hotkey keys="meta+alt+shift+k"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card subtitle="Explicit platform targeting" title="Platform-Specific Keys">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                ctrl+c:
                <v-hotkey keys="ctrl+c"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                cmd+v:
                <v-hotkey keys="cmd+v"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                ctrl+x meta+c:
                <v-hotkey keys="ctrl+x meta+c"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row density="comfortable">
      <v-col cols="12">
        <v-card title="Display Mode & Platform Comparison">
          <template v-slot:text>
            <div class="mb-4 text-center">
              <div class="mb-2">
                <v-btn-toggle v-model="displayMode" density="compact" border divided mandatory>
                  <v-btn value="icon">Icon</v-btn>
                  <v-btn value="symbol">Symbol</v-btn>
                  <v-btn value="text">Text</v-btn>
                </v-btn-toggle>
              </div>
              <div>
                <v-btn-toggle v-model="platform" density="compact" border divided mandatory>
                  <v-btn value="pc">PC Platform</v-btn>
                  <v-btn value="mac">Mac Platform</v-btn>
                </v-btn-toggle>
              </div>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th>Key Combination</th>
                  <th>Display</th>
                  <th>Platform Behavior</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><code>meta+k</code></td>
                  <td>
                    <v-hotkey
                      :display-mode="displayMode"
                      :platform="platform"
                      keys="meta+k"
                    ></v-hotkey>
                  </td>
                  <td>{{ effectivePlatform === 'mac' ? 'Command on Mac' : 'Ctrl on PC' }}</td>
                </tr>
                <tr>
                  <td><code>alt+f</code></td>
                  <td>
                    <v-hotkey
                      :display-mode="displayMode"
                      :platform="platform"
                      keys="alt+f"
                    ></v-hotkey>
                  </td>
                  <td>{{ effectivePlatform === 'mac' ? 'Option on Mac' : 'Alt on PC' }}</td>
                </tr>
                <tr>
                  <td><code>ctrl+shift+p</code></td>
                  <td>
                    <v-hotkey
                      :display-mode="displayMode"
                      :platform="platform"
                      keys="ctrl+shift+p"
                    ></v-hotkey>
                  </td>
                  <td>Always Ctrl (explicit)</td>
                </tr>
                <tr>
                  <td><code>cmd+shift+p</code></td>
                  <td>
                    <v-hotkey
                      :display-mode="displayMode"
                      :platform="platform"
                      keys="cmd+shift+p"
                    ></v-hotkey>
                  </td>
                  <td>{{ effectivePlatform === 'mac' ? 'Command on Mac' : 'Ctrl on PC' }}</td>
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
  import { computed, ref } from 'vue'

  const displayMode = ref('icon')
  const platform = ref('mac')

  const isMac = computed(() => {
    return typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
  })

  const effectivePlatform = computed(() => {
    return platform.value
  })
</script>

<script>
  export default {
    data () {
      return {
        displayMode: 'icon',
        platform: 'mac',
      }
    },

    computed: {
      isMac () {
        return typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
      },

      effectivePlatform () {
        return this.platform
      },
    },
  }
</script>
