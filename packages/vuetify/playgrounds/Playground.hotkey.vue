<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-4">useHotkey Composable Playground</h1>
          <p class="text-body-1 mb-6">
            This playground demonstrates the <code>useHotkey</code> composable functionality.
            Try the keyboard shortcuts listed below!
          </p>
        </v-col>
      </v-row>

      <!-- Activity Log -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-6">
            <v-card-title>Activity Log</v-card-title>
            <v-card-text>
              <div ref="activityLogContainer" class="activity-log" style="height: 200px; overflow-y: auto;">
                <div v-if="activityLog.length === 0" class="text-grey text-center pa-4">
                  No hotkey activity yet. Try pressing some keyboard shortcuts!
                </div>
                <div
                  v-for="log in activityLog"
                  :key="log.id"
                  :class="log.type"
                  class="log-entry mb-1 pa-2"
                >
                  <span class="text-caption text-grey">{{ log.timestamp }}</span>
                  <span class="ml-2">{{ log.message }}</span>
                </div>
                <!-- Scroll anchor element for CSS pin-to-bottom -->
                <div class="scroll-anchor" />
              </div>
              <v-btn class="mt-2" size="small" @click="clearLog">Clear Log</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Basic Hotkeys -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Basic Hotkeys</v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <template #prepend>
                    <v-chip color="primary" size="small">Cmd+S</v-chip>
                  </template>
                  <v-list-item-title>Save Action</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template #prepend>
                    <v-chip color="primary" size="small">Cmd+Z</v-chip>
                  </template>
                  <v-list-item-title>Undo Action</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template #prepend>
                    <v-chip color="primary" size="small">Alt+F4</v-chip>
                  </template>
                  <v-list-item-title>Close Window</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template #prepend>
                    <v-chip color="primary" size="small">Escape</v-chip>
                  </template>
                  <v-list-item-title>Cancel Action</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Key Sequences -->
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Key Sequences</v-card-title>
            <v-card-text>
              <v-list density="compact">
                <v-list-item>
                  <template #prepend>
                    <v-chip color="secondary" size="small">Cmd+K-P</v-chip>
                  </template>
                  <v-list-item-title>Command Palette</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template #prepend>
                    <v-chip color="secondary" size="small">Cmd+K-S</v-chip>
                  </template>
                  <v-list-item-title>Settings</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <template #prepend>
                    <v-chip color="secondary" size="small">G-G</v-chip>
                  </template>
                  <v-list-item-title>Go to Top (Vim-style)</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-alert class="mt-3" density="compact" type="info">
                Key sequences require pressing keys in order within {{ sequenceTimeout }}ms
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Interactive Controls -->
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Dynamic Hotkey Control</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="customHotkey"
                class="mb-3"
                hint="Enter a hotkey combination"
                label="Custom Hotkey"
                placeholder="e.g., Cmd+shift+x"
                persistent-hint
              />
              <v-btn
                :color="customHotkeyEnabled ? 'success' : 'primary'"
                class="mb-3"
                @click="toggleCustomHotkey"
              >
                {{ customHotkeyEnabled ? 'Disable' : 'Enable' }} Custom Hotkey
              </v-btn>
              <div v-if="customHotkeyEnabled" class="text-caption text-success">
                Custom hotkey "{{ customHotkey }}" is active!
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Options Testing -->
        <v-col cols="12" md="6">
          <v-card class="mb-4">
            <v-card-title>Options Testing</v-card-title>
            <v-card-text>
              <v-switch
                v-model="allowInInputs"
                class="mb-2"
                color="primary"
                label="Allow hotkeys in input fields"
              />
              <v-switch
                v-model="preventDefault"
                class="mb-2"
                color="primary"
                label="Prevent default behavior"
              />
              <v-select
                v-model="eventType"
                :items="['keydown', 'keyup']"
                class="mb-3"
                label="Event Type"
              />
              <v-slider
                v-model="sequenceTimeout"
                label="Sequence Timeout (ms)"
                max="3000"
                min="500"
                step="100"
                thumb-label
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Input Testing Area -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Input Field Testing</v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-3">
                Test how hotkeys behave when focused on input elements.
                Toggle "Allow hotkeys in input fields" above to see the difference.
              </p>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="testInput"
                    hint="Hotkeys are normally disabled in inputs"
                    label="Test Input Field"
                    placeholder="Try pressing Cmd+S while focused here"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-textarea
                    v-model="testTextarea"
                    label="Test Textarea"
                    placeholder="Try pressing hotkeys while typing here"
                    rows="3"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Modifier Keys Guide -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4">
            <v-card-title>Modifier Keys Guide</v-card-title>
            <v-card-text>
              <p class="text-body-2 mb-4">
                The useHotkey composable supports various modifier keys that can be combined with regular keys.
                Here's a comprehensive guide to all available modifiers:
              </p>

              <v-row>
                <v-col cols="12" md="6">
                  <h3 class="text-h6 mb-3">Primary Modifiers</h3>
                  <v-list density="compact">
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="primary" size="small">ctrl</v-chip>
                      </template>
                      <v-list-item-title>Control Key</v-list-item-title>
                      <v-list-item-subtitle>Standard Ctrl key on all platforms</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="primary" size="small">cmd</v-chip>
                      </template>
                      <v-list-item-title>Command Key</v-list-item-title>
                      <v-list-item-subtitle>Maps to Meta on Mac, Ctrl on Windows/Linux</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="primary" size="small">meta</v-chip>
                      </template>
                      <v-list-item-title>Meta Key</v-list-item-title>
                      <v-list-item-subtitle>Cmd on Mac, Windows key on PC</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="primary" size="small">alt</v-chip>
                      </template>
                      <v-list-item-title>Alt Key</v-list-item-title>
                      <v-list-item-subtitle>Option key on Mac, Alt on PC</v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="primary" size="small">shift</v-chip>
                      </template>
                      <v-list-item-title>Shift Key</v-list-item-title>
                      <v-list-item-subtitle>Standard Shift key on all platforms</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" md="6">
                  <h3 class="text-h6 mb-3">Example Combinations</h3>
                  <v-list density="compact">
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="secondary" size="small">ctrl+s</v-chip>
                      </template>
                      <v-list-item-title>Save</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="secondary" size="small">cmd+shift+p</v-chip>
                      </template>
                      <v-list-item-title>Command Palette</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="secondary" size="small">alt+f4</v-chip>
                      </template>
                      <v-list-item-title>Close Window</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="secondary" size="small">ctrl+alt+delete</v-chip>
                      </template>
                      <v-list-item-title>System Command</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="secondary" size="small">meta+space</v-chip>
                      </template>
                      <v-list-item-title>Spotlight/Search</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <h3 class="text-h6 mb-3">Special Keys & Function Keys</h3>
              <v-row>
                <v-col cols="12" md="4">
                  <h4 class="text-subtitle-1 mb-2">Navigation Keys</h4>
                  <div class="d-flex flex-wrap ga-1 mb-3">
                    <v-chip size="small" variant="outlined">escape</v-chip>
                    <v-chip size="small" variant="outlined">enter</v-chip>
                    <v-chip size="small" variant="outlined">tab</v-chip>
                    <v-chip size="small" variant="outlined">space</v-chip>
                    <v-chip size="small" variant="outlined">backspace</v-chip>
                    <v-chip size="small" variant="outlined">delete</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 class="text-subtitle-1 mb-2">Arrow Keys</h4>
                  <div class="d-flex flex-wrap ga-1 mb-3">
                    <v-chip size="small" variant="outlined">arrowup</v-chip>
                    <v-chip size="small" variant="outlined">arrowdown</v-chip>
                    <v-chip size="small" variant="outlined">arrowleft</v-chip>
                    <v-chip size="small" variant="outlined">arrowright</v-chip>
                    <v-chip size="small" variant="outlined">home</v-chip>
                    <v-chip size="small" variant="outlined">end</v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="4">
                  <h4 class="text-subtitle-1 mb-2">Function Keys</h4>
                  <div class="d-flex flex-wrap ga-1 mb-3">
                    <v-chip size="small" variant="outlined">f1</v-chip>
                    <v-chip size="small" variant="outlined">f2</v-chip>
                    <v-chip size="small" variant="outlined">f3</v-chip>
                    <v-chip size="small" variant="outlined">f4</v-chip>
                    <v-chip size="small" variant="outlined">f5</v-chip>
                    <v-chip size="small" variant="outlined">f12</v-chip>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <h3 class="text-h6 mb-3">Key Sequence Syntax</h3>
              <v-alert class="mb-3" color="info" variant="tonal">
                <v-alert-title>Sequence Separator</v-alert-title>
                Use the dash (-) character to create key sequences. Each part of the sequence can contain modifiers.
              </v-alert>

              <v-row>
                <v-col cols="12" md="6">
                  <h4 class="text-subtitle-1 mb-2">Valid Sequence Examples</h4>
                  <v-list density="compact">
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="success" size="small">ctrl+k-p</v-chip>
                      </template>
                      <v-list-item-title>Press Ctrl+K, then P</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="success" size="small">g-g</v-chip>
                      </template>
                      <v-list-item-title>Press G, then G (Vim style)</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-chip color="success" size="small">ctrl+x-ctrl+s</v-chip>
                      </template>
                      <v-list-item-title>Press Ctrl+X, then Ctrl+S</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="12" md="6">
                  <h4 class="text-subtitle-1 mb-2">Syntax Rules</h4>
                  <v-list density="compact">
                    <v-list-item>
                      <template #prepend>
                        <v-icon color="success">mdi-check</v-icon>
                      </template>
                      <v-list-item-title>Use + to combine modifiers with keys</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-icon color="success">mdi-check</v-icon>
                      </template>
                      <v-list-item-title>Use - to separate sequence steps</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-icon color="success">mdi-check</v-icon>
                      </template>
                      <v-list-item-title>Case insensitive (ctrl = Ctrl = CTRL)</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template #prepend>
                        <v-icon color="success">mdi-check</v-icon>
                      </template>
                      <v-list-item-title>Spaces are ignored</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <h3 class="text-h6 mb-3">Interactive Modifier Tester</h3>
              <p class="text-body-2 mb-3">
                Try different modifier combinations below. The hotkeys will be registered dynamically:
              </p>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="modifierTestHotkey"
                    class="mb-3"
                    hint="Enter any combination of modifiers + key"
                    label="Test Modifier Combination"
                    placeholder="e.g., ctrl+shift+alt+x"
                    persistent-hint
                  />
                  <v-btn
                    :color="modifierTestEnabled ? 'success' : 'primary'"
                    @click="toggleModifierTest"
                  >
                    {{ modifierTestEnabled ? 'Disable' : 'Enable' }} Test Hotkey
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6">
                  <div v-if="modifierTestEnabled" class="pa-3 bg-success-lighten-5 rounded">
                    <v-icon class="mr-2" color="success">mdi-keyboard</v-icon>
                    <strong>Active:</strong> {{ modifierTestHotkey }}
                    <br>
                    <small class="text-success">Press the combination to test it!</small>
                  </div>
                  <div v-else class="pa-3 bg-grey-lighten-4 rounded">
                    <v-icon class="mr-2" color="grey">mdi-keyboard-off</v-icon>
                    <span class="text-grey">No test hotkey active</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Platform Information -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Platform Information</v-card-title>
            <v-card-text>
              <v-chip :color="isMac ? 'success' : 'info'" class="mr-2">
                Platform: {{ isMac ? 'macOS' : 'Other' }}
              </v-chip>
              <v-chip color="info">
                User Agent: {{ userAgent }}
              </v-chip>
              <v-alert class="mt-3" density="compact" type="info">
                On macOS, Cmd key is automatically mapped to Meta key for cross-platform compatibility.
                You can use either "cmd" or "Cmd" in your hotkey definitions.
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
  import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
  import { useHotkey } from '@/composables/hotkey'

  // ============================================================================
  // PLAYGROUND DATA - Needed for interactive controls
  // ============================================================================

  // Template refs
  const activityLogContainer = ref(null)

  // Reactive data for playground controls
  const activityLog = ref([])
  const customHotkey = ref('Cmd+shift+x')
  const customHotkeyEnabled = ref(false)
  const allowInInputs = ref(false)
  const preventDefault = ref(true)
  const eventType = ref('keydown')
  const sequenceTimeout = ref(1000)
  const testInput = ref('')
  const testTextarea = ref('')

  // Modifier tester data
  const modifierTestHotkey = ref('ctrl+shift+alt+x')
  const modifierTestEnabled = ref(false)
  const modifierTestCleanup = ref(null)

  // Platform detection
  const isMac = computed(() => {
    return typeof navigator !== 'undefined' &&
      navigator.userAgent &&
      /macintosh/i.test(navigator.userAgent)
  })

  const userAgent = computed(() => {
    return typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
  })

  // Utility functions for playground
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    activityLog.value.push({
      message,
      timestamp,
      type,
      id: Date.now(),
    })

    // Keep only last 50 entries
    if (activityLog.value.length > 50) {
      activityLog.value = activityLog.value.slice(-50)
    }

    // Always scroll to bottom after adding new content to ensure scroll anchoring works
    nextTick(() => {
      if (activityLogContainer.value) {
        activityLogContainer.value.scrollTop = activityLogContainer.value.scrollHeight
      }
    })
  }

  const clearLog = () => {
    activityLog.value = []
  }

  // ============================================================================
  // BASIC USAGE EXAMPLES - Copy these patterns for your own implementation
  // ============================================================================

  // 1. Simple hotkey - most common usage
  useHotkey('Cmd+s', () => {
    addLog('💾 Save action triggered!', 'success')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
  })

  // 2. Hotkey with event parameter
  useHotkey('Cmd+z', event => {
    addLog('↶ Undo action triggered!', 'info')
    // event.preventDefault() is called automatically by default
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
  })

  // 3. Key sequences - press keys in order (Cmd+K, then P)
  useHotkey('Cmd+k-p', () => {
    addLog('🎨 Command Palette opened! (Cmd+K then P)', 'success')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
    sequenceTimeout: sequenceTimeout.value,
  })

  // 4. Vim-style sequences (G, then G)
  useHotkey('g-g', () => {
    addLog('⬆️ Go to top! (G then G - Vim style)', 'info')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
    sequenceTimeout: sequenceTimeout.value,
  })

  // 5. Function keys and special keys
  useHotkey('f1', () => {
    addLog('❓ Help opened! (F1)', 'info')
  })

  useHotkey('escape', () => {
    addLog('🚫 Cancel action triggered!', 'error')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
  })

  // 6. Multiple modifiers
  useHotkey('Cmd+shift+d', () => {
    addLog('🐛 Debug mode toggled! (Cmd+Shift+D)', 'info')
  })

  // 7. Cross-platform modifiers (alt works on all platforms)
  useHotkey('alt+f4', () => {
    addLog('❌ Close window action triggered!', 'warning')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
  })

  // 8. With options - allow in input fields, custom event type, etc.
  useHotkey('enter', () => {
    addLog('✅ Enter pressed in input!', 'success')
  }, {
    inputs: true, // Allow when focused on input elements
    preventDefault: false, // Don't prevent default browser behavior
    event: 'keyup', // Listen to keyup instead of keydown
  })

  // 9. Reactive hotkey - can be changed dynamically
  const dynamicHotkey = ref('Cmd+shift+x')
  useHotkey(dynamicHotkey, () => {
    addLog(`🎯 Dynamic hotkey "${dynamicHotkey.value}" triggered!`, 'success')
  })

  // 10. Manual cleanup (usually not needed in Vue components)
  // const cleanup = useHotkey('ctrl+alt+delete', () => {
  //   addLog('🔧 System command triggered!', 'warning')
  // })
  // Call cleanup() to remove the hotkey listener manually

  // ============================================================================
  // PLAYGROUND IMPLEMENTATION - Supporting code for this demo
  // ============================================================================

  // Additional playground hotkeys with reactive options
  useHotkey('Cmd+k-s', e => {
    addLog('⚙️ Settings opened! (Cmd+K then S)', 'info')
  }, {
    preventDefault: preventDefault.value,
    inputs: allowInInputs.value,
    event: eventType.value,
    sequenceTimeout: sequenceTimeout.value,
  })

  // Dynamic custom hotkey
  const customHotkeyCleanup = ref(null)

  const toggleCustomHotkey = () => {
    if (customHotkeyEnabled.value) {
      // Disable custom hotkey
      if (customHotkeyCleanup.value) {
        customHotkeyCleanup.value()
        customHotkeyCleanup.value = null
      }
      customHotkeyEnabled.value = false
      addLog(`🔴 Custom hotkey "${customHotkey.value}" disabled`, 'warning')
    } else {
      // Enable custom hotkey
      if (customHotkey.value.trim()) {
        customHotkeyCleanup.value = useHotkey(customHotkey.value, e => {
          addLog(`🎯 Custom hotkey "${customHotkey.value}" triggered!`, 'success')
        }, {
          preventDefault: preventDefault.value,
          inputs: allowInInputs.value,
          event: eventType.value,
          sequenceTimeout: sequenceTimeout.value,
        })
        customHotkeyEnabled.value = true
        addLog(`🟢 Custom hotkey "${customHotkey.value}" enabled`, 'success')
      }
    }
  }

  // Watch for changes in custom hotkey input
  watch(customHotkey, newValue => {
    if (customHotkeyEnabled.value) {
      // Re-register with new hotkey
      if (customHotkeyCleanup.value) {
        customHotkeyCleanup.value()
      }
      if (newValue.trim()) {
        customHotkeyCleanup.value = useHotkey(newValue, e => {
          addLog(`🎯 Custom hotkey "${newValue}" triggered!`, 'success')
        }, {
          preventDefault: preventDefault.value,
          inputs: allowInInputs.value,
          event: eventType.value,
          sequenceTimeout: sequenceTimeout.value,
        })
        addLog(`🔄 Custom hotkey updated to "${newValue}"`, 'info')
      }
    }
  })

  // Modifier test functionality
  const toggleModifierTest = () => {
    if (modifierTestEnabled.value) {
      // Disable modifier test
      if (modifierTestCleanup.value) {
        modifierTestCleanup.value()
        modifierTestCleanup.value = null
      }
      modifierTestEnabled.value = false
      addLog(`🔴 Modifier test "${modifierTestHotkey.value}" disabled`, 'warning')
    } else {
      // Enable modifier test
      if (modifierTestHotkey.value.trim()) {
        modifierTestCleanup.value = useHotkey(modifierTestHotkey.value, e => {
          addLog(`🧪 Modifier test "${modifierTestHotkey.value}" triggered!`, 'success')
        }, {
          preventDefault: preventDefault.value,
          inputs: allowInInputs.value,
          event: eventType.value,
          sequenceTimeout: sequenceTimeout.value,
        })
        modifierTestEnabled.value = true
        addLog(`🟢 Modifier test "${modifierTestHotkey.value}" enabled`, 'success')
      }
    }
  }

  // Watch for changes in modifier test hotkey input
  watch(modifierTestHotkey, newValue => {
    if (modifierTestEnabled.value) {
      // Re-register with new hotkey
      if (modifierTestCleanup.value) {
        modifierTestCleanup.value()
      }
      if (newValue.trim()) {
        modifierTestCleanup.value = useHotkey(newValue, e => {
          addLog(`🧪 Modifier test "${newValue}" triggered!`, 'success')
        }, {
          preventDefault: preventDefault.value,
          inputs: allowInInputs.value,
          event: eventType.value,
          sequenceTimeout: sequenceTimeout.value,
        })
        addLog(`🔄 Modifier test updated to "${newValue}"`, 'info')
      }
    }
  })

  // Additional demonstration hotkeys
  useHotkey('Cmd+shift+d', e => {
    addLog('🐛 Debug mode toggled! (Cmd+Shift+D)', 'info')
  })

  useHotkey('f1', e => {
    addLog('❓ Help opened! (F1)', 'info')
  })

  // Mac-specific demonstration
  if (isMac.value) {
    useHotkey('cmd+option+i', e => {
      addLog('🍎 Mac-specific hotkey! (Cmd+Option+I)', 'success')
    })
  }
  onBeforeUnmount(() => {
    if (customHotkeyCleanup.value) {
      customHotkeyCleanup.value()
    }
    if (modifierTestCleanup.value) {
      modifierTestCleanup.value()
    }
  })
</script>

<style scoped>
.activity-log {
  font-family: 'Roboto Mono', monospace;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 8px;
}

/* CSS-only scroll anchoring for pin-to-bottom behavior */
.activity-log * {
  overflow-anchor: none;
}

.scroll-anchor {
  overflow-anchor: auto;
  height: 1px;
}

.log-entry {
  border-radius: 4px;
  font-size: 0.875rem;
}

.log-entry.success {
  background-color: #e8f5e8;
  border-left: 4px solid #4caf50;
}

.log-entry.info {
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.log-entry.warning {
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
}

.log-entry.error {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
}

code {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Roboto Mono', monospace;
}
</style>
