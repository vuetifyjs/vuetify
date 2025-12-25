<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p class="text-body-medium mb-4">
              Hotkey combinations can be reactive, allowing you to change them dynamically.
              Try changing the hotkey combinations below:
            </p>

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="saveHotkey"
                  class="mb-3"
                  hint="e.g., cmd+s, ctrl+shift+s"
                  label="Save Hotkey"
                  persistent-hint
                ></v-text-field>

                <v-text-field
                  v-model="undoHotkey"
                  class="mb-3"
                  hint="e.g., cmd+z, ctrl+z"
                  label="Undo Hotkey"
                  persistent-hint
                ></v-text-field>

                <v-text-field
                  v-model="customHotkey"
                  class="mb-3"
                  hint="e.g., alt+shift+x, f5"
                  label="Custom Action Hotkey"
                  persistent-hint
                ></v-text-field>

                <v-switch
                  v-model="hotkeyEnabled"
                  class="mb-3"
                  label="Enable hotkeys"
                ></v-switch>
              </v-col>

              <v-col cols="12" md="6">
                <h4 class="text-body-large mb-3">Current Active Hotkeys</h4>
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th>Hotkey</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><v-hotkey :keys="saveHotkey"></v-hotkey></td>
                      <td>Save Document</td>
                      <td>
                        <v-chip :color="hotkeyEnabled ? 'success' : 'grey'" size="small">
                          {{ hotkeyEnabled ? 'Active' : 'Disabled' }}
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td><v-hotkey :keys="undoHotkey"></v-hotkey></td>
                      <td>Undo Action</td>
                      <td>
                        <v-chip :color="hotkeyEnabled ? 'success' : 'grey'" size="small">
                          {{ hotkeyEnabled ? 'Active' : 'Disabled' }}
                        </v-chip>
                      </td>
                    </tr>
                    <tr>
                      <td><v-hotkey :keys="customHotkey"></v-hotkey></td>
                      <td>Custom Action</td>
                      <td>
                        <v-chip :color="hotkeyEnabled ? 'success' : 'grey'" size="small">
                          {{ hotkeyEnabled ? 'Active' : 'Disabled' }}
                        </v-chip>
                      </td>
                    </tr>
                  </tbody>
                </v-table>

                <v-btn class="mt-3" @click="resetToDefaults">
                  Reset to Defaults
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div class="activity-log pa-3 border rounded">
              <h4 class="text-body-large mb-2">Activity Log:</h4>
              <div v-if="messages.length === 0" class="text-grey">
                No reactive hotkeys triggered yet...
              </div>
              <div v-for="message in messages" :key="message.id" class="text-body-medium mb-1">
                <span class="text-grey text-body-small">{{ message.time }}</span> - {{ message.text }}
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
  import { computed, ref, watch } from 'vue'
  import { useHotkey } from 'vuetify'

  const messages = ref([])
  const saveHotkey = ref('cmd+s')
  const undoHotkey = ref('cmd+z')
  const customHotkey = ref('alt+shift+x')
  const hotkeyEnabled = ref(true)

  const activeSaveHotkey = computed(() => hotkeyEnabled.value ? saveHotkey.value : undefined)
  const activeUndoHotkey = computed(() => hotkeyEnabled.value ? undoHotkey.value : undefined)
  const activeCustomHotkey = computed(() => hotkeyEnabled.value ? customHotkey.value : undefined)

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    if (messages.value.length > 8) {
      messages.value = messages.value.slice(-8)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const resetToDefaults = () => {
    saveHotkey.value = 'cmd+s'
    undoHotkey.value = 'cmd+z'
    customHotkey.value = 'alt+shift+x'
    hotkeyEnabled.value = true
    addMessage('🔄 Reset hotkeys to defaults')
  }

  useHotkey(activeSaveHotkey, () => {
    addMessage(`💾 Save triggered with: ${saveHotkey.value}`)
  })

  useHotkey(activeUndoHotkey, () => {
    addMessage(`↶ Undo triggered with: ${undoHotkey.value}`)
  })

  useHotkey(activeCustomHotkey, () => {
    addMessage(`⚡ Custom action triggered with: ${customHotkey.value}`)
  })

  watch([saveHotkey, undoHotkey, customHotkey, hotkeyEnabled], () => {
    if (hotkeyEnabled.value) {
      addMessage('⚙️ Hotkey configuration updated')
    } else {
      addMessage('⏸️ Hotkeys disabled')
    }
  })
</script>

<script>
  import { useHotkey } from 'vuetify'

  export default {
    data () {
      return {
        messages: [],
        saveHotkey: 'cmd+s',
        undoHotkey: 'cmd+z',
        customHotkey: 'alt+shift+x',
        hotkeyEnabled: true,
        cleanupFunctions: [],
      }
    },
    computed: {
      activeSaveHotkey () {
        return this.hotkeyEnabled ? this.saveHotkey : undefined
      },
      activeUndoHotkey () {
        return this.hotkeyEnabled ? this.undoHotkey : undefined
      },
      activeCustomHotkey () {
        return this.hotkeyEnabled ? this.customHotkey : undefined
      },
    },
    watch: {
      saveHotkey () { this.logConfigChange() },
      undoHotkey () { this.logConfigChange() },
      customHotkey () { this.logConfigChange() },
      hotkeyEnabled () { this.logConfigChange() },
    },
    mounted () {
      this.setupReactiveHotkeys()
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

        if (this.messages.length > 8) {
          this.messages = this.messages.slice(-8)
        }
      },
      clearMessages () {
        this.messages = []
      },
      resetToDefaults () {
        this.saveHotkey = 'cmd+s'
        this.undoHotkey = 'cmd+z'
        this.customHotkey = 'alt+shift+x'
        this.hotkeyEnabled = true
        this.addMessage('🔄 Reset hotkeys to defaults')
      },
      setupReactiveHotkeys () {
        this.cleanupFunctions.forEach(cleanup => cleanup())
        this.cleanupFunctions = []

        this.cleanupFunctions.push(
          useHotkey(() => this.activeSaveHotkey, () => {
            this.addMessage(`💾 Save triggered with: ${this.saveHotkey}`)
          })
        )

        this.cleanupFunctions.push(
          useHotkey(() => this.activeUndoHotkey, () => {
            this.addMessage(`↶ Undo triggered with: ${this.undoHotkey}`)
          })
        )

        this.cleanupFunctions.push(
          useHotkey(() => this.activeCustomHotkey, () => {
            this.addMessage(`⚡ Custom action triggered with: ${this.customHotkey}`)
          })
        )
      },
      logConfigChange () {
        if (this.hotkeyEnabled) {
          this.addMessage('⚙️ Hotkey configuration updated')
        } else {
          this.addMessage('⏸️ Hotkeys disabled')
        }
      },
    },
  }
</script>
