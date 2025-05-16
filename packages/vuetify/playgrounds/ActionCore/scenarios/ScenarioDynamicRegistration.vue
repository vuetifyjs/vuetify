<template>
  <scenario-card title="Dynamic Action Registration">
    <v-btn @click="registerDynamic" color="primary" class="mr-2">Register/Add Dynamic Action</v-btn>
    <v-btn @click="unregisterDynamic" color="secondary">Unregister All Dynamic</v-btn>
    <div v-if="dynamicActionsInternal.length" class="mt-2">
      <p>Registered:</p>
      <ul>
        <li v-for="(action, index) in dynamicActionsInternal" :key="action.id">
          {{ action.title }} <VHotKey :hotkey="(Array.isArray(action.hotkey) ? action.hotkey[0] : action.hotkey) || ''" />
        </li>
      </ul>
    </div>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition, VHotKey } from '../../../src/labs/action-core';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');

const dynamicActionsInternal = ref<ActionDefinition[]>([]);
let dynamicSourceKey = ref<symbol | null>(null);

const registerDynamic = () => {
  const newAction: ActionDefinition = {
    id: `dynamic-${Date.now()}`,
    title: `Dynamic Action ${dynamicActionsInternal.value.length + 1}`,
    hotkey: `alt+${dynamicActionsInternal.value.length + 1}`,
    handler: () => {
      if (logAction) logAction(`Dynamic Action ${dynamicActionsInternal.value.findIndex(a => a.id === newAction.id) + 1} Executed!`);
    },
    description: 'A dynamically registered action.'
  };

  dynamicActionsInternal.value = [...dynamicActionsInternal.value, newAction];

  if (dynamicSourceKey.value && actionCore) {
    actionCore.unregisterActionsSource(dynamicSourceKey.value);
  }
  if (actionCore) {
    dynamicSourceKey.value = actionCore.registerActionsSource([...dynamicActionsInternal.value]);
  }
  if (logAction) logAction(`Dynamic action registered: ${newAction.title}`);
};

const unregisterDynamic = () => {
  if (dynamicSourceKey.value && actionCore) {
    actionCore.unregisterActionsSource(dynamicSourceKey.value);
    if (logAction) logAction(`All dynamic actions unregistered. Last key: ${String(dynamicSourceKey.value)}`);
    dynamicActionsInternal.value = [];
    dynamicSourceKey.value = null;
  }
};

onUnmounted(() => {
  if (dynamicSourceKey.value && actionCore) {
    actionCore.unregisterActionsSource(dynamicSourceKey.value);
  }
});

</script>
