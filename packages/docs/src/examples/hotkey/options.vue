<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p class="text-body-2 mb-4">
              Customize hotkey behavior with various options.
              Change the settings below and test the hotkeys:
            </p>

            <v-row>
              <v-col cols="12" md="6">
                <h4 class="text-subtitle-1 mb-3">Options Configuration</h4>

                <v-select
                  v-model="eventType"
                  :items="['keydown', 'keyup']"
                  class="mb-3"
                  hint="When to trigger the hotkey"
                  label="Event Type"
                  persistent-hint
                ></v-select>

                <v-switch
                  v-model="allowInInputs"
                  class="mb-3"
                  label="Allow hotkeys in input fields"
                ></v-switch>

                <v-switch
                  v-model="preventDefault"
                  class="mb-3"
                  label="Prevent default browser behavior"
                ></v-switch>

                <v-slider
                  v-model="sequenceTimeout"
                  class="mb-3"
                  label="Sequence Timeout (ms)"
                  max="3000"
                  min="500"
                  step="100"
                  thumb-label
                ></v-slider>

                <v-btn color="primary" @click="updateOptions">
                  Update Options
                </v-btn>
              </v-col>

              <v-col cols="12" md="6">
                <h4 class="text-subtitle-1 mb-3">Test Hotkeys</h4>
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th>Hotkey</th>
                      <th>Action</th>
                      <th>Settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><v-hotkey keys="cmd+t"></v-hotkey></td>
                      <td>Test Basic Hotkey</td>
                      <td>Event: {{ eventType }}</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="cmd+k-t"></v-hotkey></td>
                      <td>Test Sequence</td>
                      <td>Timeout: {{ sequenceTimeout }}ms</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="enter"></v-hotkey></td>
                      <td>Test in Input</td>
                      <td>{{ allowInInputs ? 'Enabled in inputs' : 'Disabled in inputs' }}</td>
                    </tr>
                  </tbody>
                </v-table>

                <v-text-field
                  v-model="testInput"
                  class="mt-4"
                  hint="Try pressing Enter or Cmd+T while focused here"
                  label="Test Input Field"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <h4 class="text-subtitle-1 mb-3">Current Configuration</h4>
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>event</code></td>
                  <td><v-chip size="small">{{ eventType }}</v-chip></td>
                  <td>When to trigger the hotkey callback</td>
                </tr>
                <tr>
                  <td><code>inputs</code></td>
                  <td><v-chip :color="allowInInputs ? 'success' : 'error'" size="small">
                    {{ allowInInputs }}
                  </v-chip></td>
                  <td>Allow hotkeys when input elements are focused</td>
                </tr>
                <tr>
                  <td><code>preventDefault</code></td>
                  <td><v-chip :color="preventDefault ? 'success' : 'error'" size="small">
                    {{ preventDefault }}
                  </v-chip></td>
                  <td>Prevent default browser behavior</td>
                </tr>
                <tr>
                  <td><code>sequenceTimeout</code></td>
                  <td><v-chip size="small">{{ sequenceTimeout }}ms</v-chip></td>
                  <td>Time limit for completing key sequences</td>
                </tr>
              </tbody>
            </v-table>

            <v-divider class="my-4"></v-divider>

            <div class="activity-log pa-3 border rounded">
              <h4 class="text-subtitle-1 mb-2">Activity Log:</h4>
              <div v-if="messages.length === 0" class="text-grey">
                No hotkeys with options triggered yet...
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
  const testInput = ref('')
  const eventType = ref('keydown')
  const allowInInputs = ref(false)
  const preventDefault = ref(true)
  const sequenceTimeout = ref(1000)
  const cleanupFunctions = ref([])

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    // Keep only last 10 messages
    if (messages.value.length > 10) {
      messages.value = messages.value.slice(-10)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const setupHotkeys = () => {
    // Clean up existing hotkeys
    cleanupFunctions.value.forEach(cleanup => cleanup())
    cleanupFunctions.value = []

    const options = {
      event: eventType.value,
      inputs: allowInInputs.value,
      preventDefault: preventDefault.value,
      sequenceTimeout: sequenceTimeout.value,
    }

    // Basic hotkey with current options
    cleanupFunctions.value.push(
      useHotkey('cmd+t', event => {
        const target = event.target?.tagName || 'unknown'
        addMessage(`🔧 Test hotkey (${eventType.value}) - Target: ${target}`)
      }, options)
    )

    // Sequence with timeout
    cleanupFunctions.value.push(
      useHotkey('cmd+k-t', () => {
        addMessage(`⏱️ Sequence completed within ${sequenceTimeout.value}ms`)
      }, options)
    )

    // Input-specific test
    cleanupFunctions.value.push(
      useHotkey('enter', event => {
        const inInput = event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA'
        addMessage(`⏎ Enter pressed ${inInput ? 'in input field' : 'outside input'}`)
      }, options)
    )
  }

  const updateOptions = () => {
    setupHotkeys()
    addMessage(`⚙️ Options updated: event=${eventType.value}, inputs=${allowInInputs.value}, preventDefault=${preventDefault.value}`)
  }

  // Initialize hotkeys
  setupHotkeys()

  // Cleanup on unmount
  onBeforeUnmount(() => {
    cleanupFunctions.value.forEach(cleanup => cleanup())
  })
</script>
