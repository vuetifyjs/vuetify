<template>
  <v-container class="pa-0" fluid>
    <v-row density="comfortable">
      <v-col cols="12">
        <v-card>
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

            <div class="d-flex flex-column ga-4">
              <div>
                <h4 class="text-subtitle-1 mb-2">Standard Display (Block-level)</h4>
                <div class="pa-3 border rounded">
                  <p class="mb-2">
                    Save your work with <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+s"></v-hotkey>
                    or create a new file using <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+n"></v-hotkey>.
                  </p>
                  <p class="mb-0">
                    Access the command palette with <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+shift+p"></v-hotkey>
                    to quickly navigate your project.
                  </p>
                </div>
              </div>

              <div>
                <h4 class="text-subtitle-1 mb-2">Inline Display (Text-integrated)</h4>
                <div class="pa-4 border rounded" style="line-height: 1.7;">
                  <h4 class="text-h6 mb-3">Getting Started with Code Editor</h4>

                  <p class="mb-3">
                    Welcome to your new development environment! Here are the essential keyboard shortcuts
                    to boost your productivity. Press
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+shift+p" inline></v-hotkey>
                    to open the command palette, or use
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+p" inline></v-hotkey>
                    to quickly open any file in your project.
                  </p>

                  <p class="mb-3">
                    <strong>File Operations:</strong> Save your current file with
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+s" inline></v-hotkey>
                    or create a new file by pressing
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+n" inline></v-hotkey>.
                    Need to close a file? Use
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+w" inline></v-hotkey>
                    to close the current tab.
                  </p>

                  <p class="mb-3">
                    <strong>Navigation:</strong> Jump to a specific line with
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+g" inline></v-hotkey>,
                    find text using
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+f" inline></v-hotkey>,
                    or search across your entire project with
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+shift+f" inline></v-hotkey>.
                  </p>

                  <p class="mb-0">
                    <strong>Advanced:</strong> For power users, try the sequence
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+k-p" inline></v-hotkey>
                    to access advanced search options, or use
                    <v-hotkey :display-mode="displayMode" :platform="platform" keys="cmd+k-s" inline></v-hotkey>
                    to open settings.
                  </p>
                </div>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const displayMode = ref('icon')
  const platform = ref('mac')
</script>

<script>
  export default {
    data () {
      return {
        displayMode: 'icon',
        platform: 'mac',
      }
    },
  }
</script>
