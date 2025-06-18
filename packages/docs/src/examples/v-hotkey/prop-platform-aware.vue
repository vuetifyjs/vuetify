<template>
  <div>
    <v-alert
      type="info"
      variant="tonal"
      class="mb-4"
    >
      <div class="d-flex align-center">
        <v-icon class="me-2">mdi-information</v-icon>
        <div>
          <strong>Platform Detection:</strong> Currently detected as {{ isMac ? 'Mac' : 'PC' }}
        </div>
      </div>
    </v-alert>

    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Cross-Platform Keys</v-card-title>
          <v-card-subtitle>These keys automatically adapt to your platform</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>meta+k:</span>
                <v-hotkey keys="meta+k" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>alt+shift+f:</span>
                <v-hotkey keys="alt+shift+f" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>meta+alt+shift+k:</span>
                <v-hotkey keys="meta+alt+shift+k" />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Platform-Specific Keys</v-card-title>
          <v-card-subtitle>Explicit platform targeting</v-card-subtitle>
          <v-card-text>
            <div class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span>ctrl+c:</span>
                <v-hotkey keys="ctrl+c" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>cmd+v:</span>
                <v-hotkey keys="cmd+v" />
              </div>
              <div class="d-flex align-center justify-space-between">
                <span>ctrl+x meta+c:</span>
                <v-hotkey keys="ctrl+x meta+c" />
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
                  <td><v-hotkey keys="meta+k" :display-mode="displayMode" /></td>
                  <td>{{ isMac ? 'Command on Mac' : 'Ctrl on PC' }}</td>
                </tr>
                <tr>
                  <td><code>alt+f</code></td>
                  <td><v-hotkey keys="alt+f" :display-mode="displayMode" /></td>
                  <td>{{ isMac ? 'Option on Mac' : 'Alt on PC' }}</td>
                </tr>
                <tr>
                  <td><code>ctrl+shift+p</code></td>
                  <td><v-hotkey keys="ctrl+shift+p" :display-mode="displayMode" /></td>
                  <td>Always Ctrl (explicit)</td>
                </tr>
                <tr>
                  <td><code>cmd+shift+p</code></td>
                  <td><v-hotkey keys="cmd+shift+p" :display-mode="displayMode" /></td>
                  <td>{{ isMac ? 'Command on Mac' : 'Ctrl on PC' }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const displayMode = ref('icon')

  // Detect if user is on Mac (same logic as in VHotkey component)
  const isMac = computed(() => {
    return typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
  })
</script>
