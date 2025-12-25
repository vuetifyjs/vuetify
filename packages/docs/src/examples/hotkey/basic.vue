<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <p class="text-body-medium mb-4">
              Press the keyboard shortcuts below to trigger actions:
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
                  <td><v-hotkey keys="cmd+s"></v-hotkey></td>
                  <td>Save Document</td>
                  <td>Cross-platform save shortcut</td>
                </tr>
                <tr>
                  <td><v-hotkey keys="ctrl+z"></v-hotkey></td>
                  <td>Undo Action</td>
                  <td>Standard undo shortcut</td>
                </tr>
              </tbody>
            </v-table>

            <v-divider class="my-4"></v-divider>

            <div class="activity-log pa-3 border rounded">
              <h4 class="text-body-large mb-2">Activity Log:</h4>
              <div v-if="messages.length === 0" class="text-grey">
                No hotkeys triggered yet...
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
  import { ref } from 'vue'
  import { useHotkey } from 'vuetify'

  const messages = ref([])

  const addMessage = text => {
    messages.value.push({
      id: Date.now(),
      text,
      time: new Date().toLocaleTimeString(),
    })

    if (messages.value.length > 5) {
      messages.value = messages.value.slice(-5)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  useHotkey('cmd+s', () => {
    addMessage('💾 Document saved!')
  })

  useHotkey('ctrl+z', () => {
    addMessage('↶ Action undone!')
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
    mounted () {
      // Register basic hotkeys
      this.cleanupSave = useHotkey('cmd+s', () => {
        this.addMessage('💾 Document saved!')
      })

      this.cleanupUndo = useHotkey('ctrl+z', () => {
        this.addMessage('↶ Action undone!')
      })
    },
    beforeUnmount () {
      // Clean up hotkeys
      this.cleanupSave?.()
      this.cleanupUndo?.()
    },
    methods: {
      addMessage (text) {
        this.messages.push({
          id: Date.now(),
          text,
          time: new Date().toLocaleTimeString(),
        })

        // Keep only last 5 messages
        if (this.messages.length > 5) {
          this.messages = this.messages.slice(-5)
        }
      },
      clearMessages () {
        this.messages = []
      },
    },
  }
</script>
