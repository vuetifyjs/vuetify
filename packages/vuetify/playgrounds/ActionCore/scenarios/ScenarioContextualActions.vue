<template>
  <scenario-card title="Contextual Actions">
    <v-textarea
      v-model="editorContent"
      label="Mock Text Editor"
      rows="3"
      @focus="editorFocused = true"
      @blur="editorFocused = false"
      id="mock-editor-textarea"
    />
    <p>
      Focus editor for "Save Editor Content" (<VHotKey :hotkey="(Array.isArray(saveEditorAction.hotkey) ? saveEditorAction.hotkey[0] : saveEditorAction.hotkey) || ''" />).
      Blur for "Global Save" (<VHotKey :hotkey="(Array.isArray(globalSaveAction.hotkey) ? globalSaveAction.hotkey[0] : globalSaveAction.hotkey) || ''" />).
    </p>
    <v-chip :color="editorFocused ? 'green' : 'grey'" small>
      Editor Focused: {{ editorFocused }}
    </v-chip>
    <v-btn command="save-editor" :disabled="!editorFocused" class="ml-2">Save Editor (if focused)</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition, VHotKey } from '../../../src/labs/action-core';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');

const editorFocused = ref(false);
const editorContent = ref('Some text in the editor...');

const saveHotkey = 'cmdorctrl+s';

const saveEditorAction: ActionDefinition = {
  id: 'save-editor',
  title: 'Save Editor Content',
  hotkey: saveHotkey,
  icon: 'mdi-content-save-edit',
  description: 'Saves when the mock editor below is focused.',
  canExecute: () => editorFocused.value,
  runInTextInput: () => document.activeElement?.id === 'mock-editor-textarea',
  handler: () => {
    if (logAction) logAction('Editor content saved:', editorContent.value);
  }
};

const globalSaveAction: ActionDefinition = {
  id: 'global-save',
  title: 'Global Save',
  hotkey: saveHotkey,
  icon: 'mdi-content-save-all',
  description: 'Saves globally if editor is not focused.',
  canExecute: () => !editorFocused.value,
  handler: () => {
    if (logAction) logAction('Global Save triggered (editor not focused)');
  }
};

let sourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([saveEditorAction, globalSaveAction]);
    if (logAction) logAction('Registered: Contextual Save Actions (from ScenarioContextualActions)');
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
