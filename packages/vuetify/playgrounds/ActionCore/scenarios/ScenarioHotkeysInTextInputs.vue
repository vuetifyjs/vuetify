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
    <p>Action "Submit Input Field" (hotkey: Enter) is configured with <code>runInTextInput: (el) => { if (!(el instanceof HTMLElement)) return false; const vTextFieldRoot = document.getElementById('special-text-input'); return vTextFieldRoot?.contains(el) || false; }</code>. It should only trigger if <em>this specific</em> field is focused.</p>
    <v-chip :color="inputFocused ? 'green' : 'grey'" size="small" class="mt-1">
      Input Focused: {{ inputFocused }}
    </v-chip>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, watchEffect, inject, onMounted, onUnmounted } from 'vue'
import type { ActionDefinition } from '@/labs/VActionCore/archive'
import { useActionCore, ActionCoreSymbol } from '@/labs/VActionCore/archive'
import ScenarioCard from '../ScenarioCard.vue'

// Existing refs for UI display
const inputVal = ref('Type here and press Enter')
const inputFocused = ref(false)

const logAction = inject<(message: string, details?: any) => void>('logAction')
const actionCore = useActionCore()

// --- Logic moved from Playground.actionCore.vue ---
const hotkeysInTextInputs_inputVal = ref('Type here and press Enter');

const inputAction: ActionDefinition = {
  id: 'text-input-action',
  title: 'Submit Input Field',
  hotkey: 'enter',
  description: 'Submits the content of the special input field below.',
  runInTextInput: (el) => {
    if (!(el instanceof HTMLElement)) return false;
    const vTextFieldRoot = document.getElementById('special-text-input');
    return vTextFieldRoot?.contains(el) || false;
  },
  hotkeyOptions: { preventDefault: true },
  handler: () => {
    if (logAction) logAction('Input field submitted (Enter while focused): ', hotkeysInTextInputs_inputVal.value);
    inputVal.value = 'Submitted: ' + hotkeysInTextInputs_inputVal.value;
    hotkeysInTextInputs_inputVal.value = 'Submitted!';
  }
}

let scenario8SourceKey: symbol | undefined;

onMounted(() => {
  if (actionCore) {
    scenario8SourceKey = actionCore.registerActionsSource([inputAction]);
    if (logAction) logAction(`Registered: ${inputAction.title} (from ScenarioHotkeysInTextInputs component)`);
  } else {
    if (logAction) logAction('Error: ActionCore not available in ScenarioHotkeysInTextInputs', { severity: 'error' });
  }
})

onUnmounted(() => {
  if (actionCore && scenario8SourceKey) {
    actionCore.unregisterActionsSource(scenario8SourceKey);
    if (logAction) logAction(`Unregistered: ${inputAction.title} (from ScenarioHotkeysInTextInputs component)`);
  }
})
// --- End of moved logic ---

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
