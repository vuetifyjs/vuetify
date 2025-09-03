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
                  color="primary"
                  label="Allow hotkeys in input fields"
                  hide-details
                ></v-switch>

                <v-switch
                  v-model="preventDefault"
                  class="mb-3"
                  color="primary"
                  label="Prevent default browser behavior"
                  hide-details
                ></v-switch>

                <v-slider
                  v-model="sequenceTimeout"
                  :label="`Sequence Timeout (${sequenceTimeout}ms)`"
                  class="mb-3"
                  max="3000"
                  min="500"
                  step="100"
                  hide-details
                  thumb-label
                ></v-slider>
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
                      <td><v-hotkey keys="cmd+j"></v-hotkey></td>
                      <td>Test Basic Hotkey</td>
                      <td>Event: {{ eventType }}</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="ctrl+x-e"></v-hotkey></td>
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
                  :hint="allowInInputs ? 'Try pressing Enter or Cmd+J while focused here' : 'Hotkeys disabled in inputs - try pressing them outside this field'"
                  class="mt-4"
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
  import { onBeforeUnmount, ref, watch } from 'vue'
  import { useHotkey } from 'vuetify'

  const messages = ref([])
  const testInput = ref('')
  const eventType = ref('keydown')
  const allowInInputs = ref(true)
  const preventDefault = ref(true)
  const sequenceTimeout = ref(2000)
  const cleanupFunctions = ref([])

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    if (messages.value.length > 10) {
      messages.value = messages.value.slice(-10)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const setupHotkeys = () => {
    cleanupFunctions.value.forEach(cleanup => cleanup())
    cleanupFunctions.value = []

    const options = {
      event: eventType.value,
      inputs: allowInInputs.value,
      preventDefault: preventDefault.value,
      sequenceTimeout: sequenceTimeout.value,
    }

    cleanupFunctions.value.push(
      useHotkey('cmd+j', event => {
        const target = event.target?.tagName || 'unknown'
        addMessage(`🔧 Test hotkey (${eventType.value}) - Target: ${target}`)
      }, options)
    )
    cleanupFunctions.value.push(
      useHotkey('ctrl+x-e', () => {
        addMessage(`⏱️ Sequence completed within ${sequenceTimeout.value}ms`)
      }, options)
    )

    cleanupFunctions.value.push(
      useHotkey('enter', event => {
        const inInput = event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA'
        addMessage(`⏎ Enter pressed ${inInput ? 'in input field' : 'outside input'}`)
      }, options)
    )
  }

  setupHotkeys()

  // Watch all hotkey options and re-setup hotkeys automatically
  watch([
    eventType,
    allowInInputs,
    preventDefault,
    sequenceTimeout,
  ], setupHotkeys)

  onBeforeUnmount(() => {
    cleanupFunctions.value.forEach(cleanup => cleanup())
  })
</script>

<script>
  import { useHotkey } from 'vuetify'

  export default {
    data () {
      return {
        messages: [],
        testInput: '',
        eventType: 'keydown',
        allowInInputs: true,
        preventDefault: true,
        sequenceTimeout: 1000,
        cleanupFunctions: [],
      }
    },
    mounted () {
      this.setupHotkeys()
    },
    beforeUnmount () {
      this.cleanupFunctions.forEach(cleanup => cleanup())
    },
    methods: {
      addMessage (text) {
        this.messages.push({
          id: Date.now(),
          text,
          time: new Date().toLocaleTimeString(),
        })

        if (this.messages.length > 10) {
          this.messages = this.messages.slice(-10)
        }
      },
      clearMessages () {
        this.messages = []
      },
      setupHotkeys () {
        this.cleanupFunctions.forEach(cleanup => cleanup())
        this.cleanupFunctions = []

        const options = {
          event: this.eventType,
          inputs: this.allowInInputs,
          preventDefault: this.preventDefault,
          sequenceTimeout: this.sequenceTimeout,
        }

        this.cleanupFunctions.push(
          useHotkey('cmd+j', event => {
            const target = event.target?.tagName || 'unknown'
            this.addMessage(`🔧 Test hotkey (${this.eventType}) - Target: ${target}`)
          }, options)
        )

        this.cleanupFunctions.push(
          useHotkey('ctrl+x-e', () => {
            this.addMessage(`⏱️ Sequence completed within ${this.sequenceTimeout}ms`)
          }, options)
        )

        this.cleanupFunctions.push(
          useHotkey('enter', event => {
            const inInput = event.target?.tagName === 'INPUT' || event.target?.tagName === 'TEXTAREA'
            this.addMessage(`⏎ Enter pressed ${inInput ? 'in input field' : 'outside input'}`)
          }, options)
        )
      },
    },
  }
</script>
