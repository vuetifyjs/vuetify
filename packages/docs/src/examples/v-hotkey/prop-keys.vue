<template>
  <v-container class="pa-0" fluid>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-card height="200" title="Single Keys">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Letter key:
                <v-hotkey keys="k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Enter key:
                <v-hotkey keys="enter"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Escape key:
                <v-hotkey keys="escape"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Arrow key:
                <v-hotkey keys="arrowup"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card height="200" title="Key Combinations">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl + K:
                <v-hotkey keys="ctrl+k"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Meta + Shift + P:
                <v-hotkey keys="meta+shift+p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Alt + Arrow:
                <v-hotkey keys="alt+arrowup"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Ctrl + Shift + Enter:
                <v-hotkey keys="ctrl+shift+enter"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="6">
        <v-card height="132" title="Sequential Actions">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl+K then P:
                <v-hotkey keys="ctrl+k-p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Ctrl+X then Ctrl+C:
                <v-hotkey keys="ctrl+x-ctrl+c"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card height="132" title="Multiple Options">
          <template v-slot:text>
            <div class="d-flex flex-column ga-2">
              <div class="d-flex align-center justify-space-between">
                Ctrl+K or Meta+P:
                <v-hotkey keys="ctrl+k meta+p"></v-hotkey>
              </div>

              <div class="d-flex align-center justify-space-between">
                Multiple options:
                <v-hotkey keys="ctrl+s meta+s ctrl+shift+s"></v-hotkey>
              </div>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12">
        <v-card title="Platform-Aware Key Combinations">
          <template v-slot:text>
            <div class="mb-4 text-center">
              <v-btn-toggle v-model="platform" density="compact" border divided mandatory>
                <v-btn value="pc">PC Platform</v-btn>
                <v-btn value="mac">Mac Platform</v-btn>
              </v-btn-toggle>
            </div>

            <div class="d-flex flex-wrap ga-4 align-center justify-center">
              <div class="text-center">
                <div class="text-body-small mb-1">meta+shift+p</div>
                <v-hotkey
                  :platform="platform"
                  keys="meta+shift+p"
                ></v-hotkey>
              </div>

              <div class="text-center">
                <div class="text-body-small mb-1">ctrl+k meta+p</div>
                <v-hotkey
                  :platform="platform"
                  keys="ctrl+k meta+p"
                ></v-hotkey>
              </div>

              <div class="text-center">
                <div class="text-body-small mb-1">alt+arrowup</div>
                <v-hotkey
                  :platform="platform"
                  keys="alt+arrowup"
                ></v-hotkey>
              </div>

              <div class="text-center">
                <div class="text-body-small mb-1">ctrl+k-meta+p</div>
                <v-hotkey
                  :platform="platform"
                  keys="ctrl+k-meta+p"
                ></v-hotkey>
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

  const platform = ref('mac')
</script>

<script>
  export default {
    data () {
      return {
        platform: 'mac',
      }
    },
  }
</script>
