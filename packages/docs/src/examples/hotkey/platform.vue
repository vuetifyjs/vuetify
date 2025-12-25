<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-alert class="mb-4" color="info" variant="tonal">
              <v-alert-title>Current Platform: {{ platformName }}</v-alert-title>
              The useHotkey composable automatically adapts to your platform.
            </v-alert>

            <p class="text-body-medium mb-4">
              Try the hotkeys below to see how they adapt to your platform:
            </p>

            <v-row>
              <v-col cols="12">
                <h4 class="text-body-large mb-3">Available Hotkeys</h4>
                <v-table>
                  <thead>
                    <tr>
                      <th>Hotkey</th>
                      <th>Action</th>
                      <th>Platform Behavior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><v-hotkey keys="cmd+c"></v-hotkey></td>
                      <td>Copy</td>
                      <td>{{ isMac ? '⌘ on Mac' : 'Ctrl on PC' }}</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="cmd+v"></v-hotkey></td>
                      <td>Paste</td>
                      <td>{{ isMac ? '⌘ on Mac' : 'Ctrl on PC' }}</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="cmd+shift+z"></v-hotkey></td>
                      <td>Redo</td>
                      <td>{{ isMac ? '⌘⇧ on Mac' : 'Ctrl+Shift on PC' }}</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="ctrl+a"></v-hotkey></td>
                      <td>Select All (Explicit Ctrl)</td>
                      <td>Always Ctrl, even on Mac</td>
                    </tr>
                    <tr>
                      <td><v-hotkey keys="meta+f"></v-hotkey></td>
                      <td>Find in Page</td>
                      <td>{{ isMac ? 'Cmd on Mac' : 'Ctrl key on PC' }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <div class="activity-log pa-3 border rounded">
              <h4 class="text-body-large mb-2">Activity Log:</h4>
              <div v-if="messages.length === 0" class="text-grey">
                No platform-aware hotkeys triggered yet...
              </div>
              <div v-for="message in messages" :key="message.id" class="text-body-medium mb-1">
                <span class="text-grey text-body-small">{{ message.time }}</span> - {{ message.text }}
              </div>
              <v-btn v-if="messages.length > 0" class="mt-2" size="small" @click="clearMessages">
                Clear Log
              </v-btn>
            </div>

            <v-divider class="my-4"></v-divider>

            <h4 class="text-body-large mb-3">Platform Detection Details</h4>
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Platform Detected</td>
                  <td>{{ platformName }}</td>
                </tr>
                <tr>
                  <td>User Agent</td>
                  <td class="text-truncate" style="max-width: 200px;">{{ userAgent }}</td>
                </tr>
                <tr>
                  <td>cmd maps to</td>
                  <td>{{ isMac ? 'Meta key (⌘)' : 'Control key (Ctrl)' }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useHotkey } from 'vuetify'

  const messages = ref([])

  const isMac = computed(() => {
    return typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
  })

  const platformName = computed(() => {
    return isMac.value ? 'macOS' : 'Windows/Linux'
  })

  const userAgent = computed(() => {
    return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
  })

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    if (messages.value.length > 6) {
      messages.value = messages.value.slice(-6)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  useHotkey('cmd+c', () => {
    addMessage(`📋 Copy action (${isMac.value ? 'Cmd' : 'Ctrl'}+C)`)
  })

  useHotkey('cmd+v', () => {
    addMessage(`📄 Paste action (${isMac.value ? 'Cmd' : 'Ctrl'}+V)`)
  })

  useHotkey('cmd+shift+z', () => {
    addMessage(`↷ Redo action (${isMac.value ? 'Cmd+Shift' : 'Ctrl+Shift'}+Z)`)
  })

  useHotkey('ctrl+a', () => {
    addMessage('🔘 Select All (explicit Ctrl+A)')
  })

  useHotkey('meta+f', () => {
    addMessage(`🔍 Find in Page (${isMac.value ? 'Cmd' : 'Win'}+F)`)
  })
</script>

<script>
  import { useHotkey } from 'vuetify'

  export default {
    data () {
      return {
        messages: [],
      }
    },
    computed: {
      isMac () {
        return typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)
      },
      platformName () {
        return this.isMac ? 'macOS' : 'Windows/Linux'
      },
      userAgent () {
        return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
      },
    },
    mounted () {
      this.cleanupCopy = useHotkey('cmd+c', () => {
        this.addMessage(`📋 Copy action (${this.isMac ? 'Cmd' : 'Ctrl'}+C)`)
      })

      this.cleanupPaste = useHotkey('cmd+v', () => {
        this.addMessage(`📄 Paste action (${this.isMac ? 'Cmd' : 'Ctrl'}+V)`)
      })

      this.cleanupRedo = useHotkey('cmd+shift+z', () => {
        this.addMessage(`↷ Redo action (${this.isMac ? 'Cmd+Shift' : 'Ctrl+Shift'}+Z)`)
      })

      this.cleanupSelectAll = useHotkey('ctrl+a', () => {
        this.addMessage('🔘 Select All (explicit Ctrl+A)')
      })

      this.cleanupFind = useHotkey('meta+f', () => {
        this.addMessage(`🔍 Find in Page (${this.isMac ? 'Cmd' : 'Win'}+F)`)
      })
    },
    beforeUnmount () {
      this.cleanupCopy?.()
      this.cleanupPaste?.()
      this.cleanupRedo?.()
      this.cleanupSelectAll?.()
      this.cleanupFind?.()
    },
    methods: {
      addMessage (text) {
        this.messages.push({
          id: Date.now(),
          text,
          time: new Date().toLocaleTimeString(),
        })

        if (this.messages.length > 6) {
          this.messages = this.messages.slice(-6)
        }
      },
      clearMessages () {
        this.messages = []
      },
    },
  }
</script>
