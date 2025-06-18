<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h3 class="text-h6 mb-4">useHotkey Composable Demo</h3>
        <p class="text-body-2 mb-6">
          Try the keyboard shortcuts listed below. The activity log will show when hotkeys are triggered.
        </p>
      </v-col>
    </v-row>

    <!-- Activity Log -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-6">
          <v-card-title>Activity Log</v-card-title>
          <v-card-text>
            <div class="activity-log border rounded" style="height: 150px; overflow-y: auto;">
              <div v-if="activityLog.length === 0" class="text-grey text-center pa-4">
                No hotkey activity yet. Try pressing some keyboard shortcuts!
              </div>
              <div
                v-for="log in activityLog"
                :key="log.id"
                class="log-entry mb-1 pa-2 border rounded"
              >
                <span class="text-caption text-grey">{{ log.timestamp }}</span>
                <span class="ml-2">{{ log.message }}</span>
              </div>
            </div>
            <v-btn class="mt-2" size="small" @click="clearLog">Clear Log</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Available Hotkeys -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Available Hotkeys</v-card-title>
          <v-card-text>
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Hotkey</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><v-hotkey keys="cmd+s"></v-hotkey></td>
                  <td>Save Action</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="cmd+z"></v-hotkey></td>
                  <td>Undo Action</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="cmd+k-p"></v-hotkey></td>
                  <td>Command Palette (sequence)</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="escape"></v-hotkey></td>
                  <td>Cancel Action</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Test Input Field</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="testInput"
              hint="Hotkeys are disabled while typing (default behavior)"
              label="Type here"
              persistent-hint
            ></v-text-field>
            <v-switch
              v-model="allowInInputs"
              class="mt-3"
              label="Allow hotkeys in input fields"
              @change="updateHotkeys"
            ></v-switch>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onBeforeUnmount, ref } from 'vue'
  import { useHotkey } from 'vuetify'

  // Reactive data
  const activityLog = ref([])
  const testInput = ref('')
  const allowInInputs = ref(false)

  // Cleanup functions for dynamic hotkeys
  const hotkeyCleanups = ref([])

  // Utility function to add log entries
  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString()
    activityLog.value.push({
      message,
      timestamp,
      id: Date.now() + Math.random(),
    })

    // Keep only last 20 entries
    if (activityLog.value.length > 20) {
      activityLog.value = activityLog.value.slice(-20)
    }
  }

  const clearLog = () => {
    activityLog.value = []
  }

  // Setup hotkeys with current options
  const setupHotkeys = () => {
    // Clear existing hotkeys
    hotkeyCleanups.value.forEach(cleanup => cleanup())
    hotkeyCleanups.value = []

    const options = {
      inputs: allowInInputs.value,
      preventDefault: true,
    }

    // Basic hotkeys
    hotkeyCleanups.value.push(
      useHotkey('cmd+s', () => {
        addLog('💾 Save action triggered!')
      }, options)
    )

    hotkeyCleanups.value.push(
      useHotkey('cmd+z', () => {
        addLog('↶ Undo action triggered!')
      }, options)
    )

    // Key sequence
    hotkeyCleanups.value.push(
      useHotkey('cmd+k-p', () => {
        addLog('🎨 Command Palette opened! (Cmd+K then P)')
      }, { ...options, sequenceTimeout: 1000 })
    )

    // Special key
    hotkeyCleanups.value.push(
      useHotkey('escape', () => {
        addLog('🚫 Cancel action triggered!')
      }, options)
    )
  }

  // Update hotkeys when options change
  const updateHotkeys = () => {
    setupHotkeys()
    addLog(`⚙️ Hotkey options updated (inputs: ${allowInInputs.value})`)
  }

  // Initialize hotkeys
  setupHotkeys()

  // Cleanup on unmount
  onBeforeUnmount(() => {
    hotkeyCleanups.value.forEach(cleanup => cleanup())
  })
</script>

<style scoped>
.activity-log {
  font-family: 'Roboto Mono', monospace;
  background-color: rgba(143, 143, 143, 0.04);
  padding: 8px;
}

.log-entry {
  font-size: 0.875rem;
}
</style>
