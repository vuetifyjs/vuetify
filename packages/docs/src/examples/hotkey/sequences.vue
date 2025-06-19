<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p class="text-body-2 mb-4">
              Key sequences require pressing keys in order within the timeout period.
              Try the sequences below:
            </p>

            <v-table>
              <thead>
                <tr>
                  <th>Hotkey</th>
                  <th>Action</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><v-hotkey keys="cmd+k-p"></v-hotkey></td>
                  <td>Command Palette</td>
                  <td>Press Cmd+K, then P (within timeout)</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="g-g"></v-hotkey></td>
                  <td>Go to Top</td>
                  <td>Press G, then G (Vim-style navigation)</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="ctrl+x-ctrl+s"></v-hotkey></td>
                  <td>Save File</td>
                  <td>Press Ctrl+X, then Ctrl+S (Emacs-style)</td>
                </tr>
              </tbody>
            </v-table>

            <v-alert class="my-4" color="info" variant="tonal">
              <v-alert-title>Sequence Timeout</v-alert-title>
              You have {{ sequenceTimeout }}ms to complete each sequence.
              If you wait too long, the sequence will reset.
            </v-alert>

            <v-slider
              v-model="sequenceTimeout"
              class="mb-4"
              label="Sequence Timeout (ms)"
              max="3000"
              min="500"
              step="100"
              thumb-label
              @update:model-value="updateTimeout"
            >
            </v-slider>

            <v-divider class="my-4"></v-divider>

            <div class="activity-log pa-3 border rounded">
              <h4 class="text-subtitle-1 mb-2">Activity Log:</h4>
              <div v-if="messages.length === 0" class="text-grey">
                No sequences triggered yet...
              </div>
              <div v-for="message in messages" :key="message.id" class="text-body-2 mb-1">
                <span class="text-grey text-caption">{{ message.time }}</span> - {{ message.text }}
              </div>
              <v-btn v-if="messages.length > 0" class="mt-2" size="small" @click="clearMessages">
                Clear Log
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onBeforeUnmount, ref } from 'vue'
  import { useHotkey } from 'vuetify'

  const messages = ref([])
  const sequenceTimeout = ref(1000)
  const cleanupFunctions = ref([])

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    // Keep only last 8 messages
    if (messages.value.length > 8) {
      messages.value = messages.value.slice(-8)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const setupSequences = () => {
    // Clean up existing sequences
    cleanupFunctions.value.forEach(cleanup => cleanup())
    cleanupFunctions.value = []

    // Register key sequences with current timeout
    cleanupFunctions.value.push(
      useHotkey('cmd+k-p', () => {
        addMessage('🎨 Command Palette opened!')
      }, { sequenceTimeout: sequenceTimeout.value })
    )

    cleanupFunctions.value.push(
      useHotkey('g-g', () => {
        addMessage('⬆️ Navigated to top!')
      }, { sequenceTimeout: sequenceTimeout.value })
    )

    cleanupFunctions.value.push(
      useHotkey('ctrl+x-ctrl+s', () => {
        addMessage('💾 File saved (Emacs style)!')
      }, { sequenceTimeout: sequenceTimeout.value })
    )
  }

  const updateTimeout = () => {
    setupSequences()
  }

  // Initialize sequences
  setupSequences()

  // Cleanup on unmount
  onBeforeUnmount(() => {
    cleanupFunctions.value.forEach(cleanup => cleanup())
  })
</script>
