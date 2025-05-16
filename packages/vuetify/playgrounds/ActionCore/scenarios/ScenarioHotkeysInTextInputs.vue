<template>
  <scenario-card title="Hotkeys In Text Inputs">
    <v-text-field
      v-model="inputVal"
      id="special-text-input"
      label="Special Input (Submit on Enter)"
      @focus="inputFocused = true"
      @blur="inputFocused = false"
      class="mb-2"
      density="compact"
    />
    <p>Action "Submit Input Field" (hotkey: Enter) is configured with <code>runInTextInput: (el) => el === document.getElementById('special-text-input')</code>. It should only trigger if <em>this specific</em> field is focused.</p>
    <v-chip :color="inputFocused ? 'green' : 'grey'" size="small" class="mt-1">
      Input Focused: {{ inputFocused }}
    </v-chip>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'

// Although the action is already registered in the playground root, we keep a mirrored
// reactive state here for the UI (does not affect registration).
const inputVal = ref('Type here and press Enter')
const inputFocused = ref(false)

// Provide local logging via the global injectable.
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

// Sync with global log when local value changes for visibility.
watchEffect(() => {
  if (logAction) {
    if (inputFocused.value) {
      logAction('Special text input focused (ScenarioHotkeysInTextInputs)')
    } else {
      // logAction(''Special text input' blurred (ScenarioHotkeysInTextInputs)');
    }
  }
})
</script>
