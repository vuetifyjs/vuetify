<template>
  <ScenarioCard title="AI Action Discovery Simulation">
    <template #description>
      Simulates an AI client querying ActionCore for discoverable actions based on selected scopes.
      The results show sanitized action information suitable for AI consumption.
    </template>

    <VRow>
      <VCol cols="12">
        <VSelect
          v-model="selectedAllowedScopes"
          :items="availableScopes"
          label="AI's Allowed Scopes"
          multiple
          chips
          clearable
          closable-chips
        />
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VBtn color="primary" @click="discoverActionsForAI">
          Discover Actions for AI
        </VBtn>
      </VCol>
    </VRow>

    <VRow v-if="discoveredActionsInfo">
      <VCol cols="12">
        <VCard title="Discovered Actions" class="mt-4">
          <VCardText>
            <pre class="pa-3" style="white-space: pre-wrap; word-break: break-all; background-color: #f5f5f5; border-radius: 4px;">{{ discoveredActionsInfo }}</pre>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </ScenarioCard>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue';
import type { Ref } from 'vue';
import ScenarioCard from '@playgrounds/ActionCore/ScenarioCard.vue';
import { ActionCoreSymbol } from '../../../src/labs/action-core';
import type { ActionCorePublicAPI, ActionDefinition, ActionContext, DiscoverableActionInfo } from '../../../src/labs/action-core/types';

// Inject ActionCore and logAction
const actionCore = inject<ActionCorePublicAPI | undefined>(ActionCoreSymbol, undefined);
const logAction = inject<(title: string, data?: any) => void>('logAction', (title, data) => console.log(`[Action Log] ${title}`, data));

const availableScopes = ref(['files', 'calendar', 'user_profile', 'general_utils', 'reporting', 'system_admin']);
const selectedAllowedScopes = ref<string[]>(['general_utils']);
const discoveredActionsInfo = ref<string>('');
const sampleActionsSourceKey = ref<symbol | null>(null);

const sampleActionsForAIDiscovery: ActionDefinition[] = [
  {
    id: 'ai-file-save',
    title: 'Save File (AI)',
    description: 'Saves provided content to a specified file path.',
    ai: { accessible: true, scope: 'files', usageHint: 'Use to persist data to the file system. Ensure path is valid.' },
    parametersSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Absolute path to the file.' },
        content: { type: 'string', description: 'Text content to save.' },
      },
      required: ['path', 'content'],
    },
    handler: (ctx: ActionContext) => { logAction('AI: File Save called', ctx.data); },
  },
  {
    id: 'ai-calendar-create',
    title: 'Create Calendar Event (AI)',
    description: 'Schedules a new event in the user\'s calendar.',
    ai: {
      accessible: true,
      scope: 'calendar',
      usageHint: 'Use for creating new appointments. DateTime should be ISO 8601.',
      examples: [{ description: "Schedule lunch with Bob tomorrow at 1pm", request: { title: "Lunch with Bob", dateTime: "<tomorrow_1pm_iso>", attendees: ["bob@example.com"] } }],
    },
    parametersSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Event title.' },
        dateTime: { type: 'string', format: 'date-time', description: 'Event start time in ISO 8601 format.' },
        attendees: { type: 'array', items: { type: 'string', format: 'email' }, description: 'List of attendee email addresses.' },
      },
      required: ['title', 'dateTime'],
    },
    handler: (ctx: ActionContext) => { logAction('AI: Create Calendar Event called', ctx.data); },
  },
  {
    id: 'ai-user-profile-get',
    title: 'Get User Profile (AI)',
    description: 'Retrieves current user\'s profile information.',
    ai: { accessible: true, scope: ['user_profile', 'general_utils'], usageHint: 'Fetches basic user data. No parameters needed.' },
    handler: (ctx: ActionContext) => { logAction('AI: Get User Profile called', { result: { name: 'AI User', email: 'ai@example.com' } }); },
  },
  {
    id: 'ai-system-shutdown',
    title: 'Shutdown System (AI)',
    description: 'Initiates a system shutdown. Highly privileged.',
    ai: { accessible: false, scope: 'system_admin', usageHint: 'DANGEROUS: Only for system maintenance by authorized AI agents.' },
    handler: (ctx: ActionContext) => { logAction('AI: Shutdown System called - THIS SHOULD NOT HAPPEN IF FILTERED', ctx.data); },
  },
  {
    id: 'ai-get-weather',
    title: 'Get Current Weather (AI)',
    description: 'Fetches the current weather for a given location.',
    ai: { accessible: true, usageHint: 'Provide a city name to get weather data.' }, // No scope
    parametersSchema: {
      type: 'object',
      properties: { location: { type: 'string', description: 'City name or zip code.' } },
      required: ['location'],
    },
    handler: (ctx: ActionContext) => { logAction('AI: Get Weather called', ctx.data); },
  },
];

onMounted(() => {
  if (actionCore) {
    sampleActionsSourceKey.value = actionCore.registerActionsSource(sampleActionsForAIDiscovery);
    logAction('AI Scenario: Registered sample actions for AI discovery.');
  } else {
    console.error('ActionCore not injected in ScenarioAIDiscovery');
    logAction('AI Scenario Error: ActionCore not injected.');
  }
});

onUnmounted(() => {
  if (actionCore && sampleActionsSourceKey.value) {
    actionCore.unregisterActionsSource(sampleActionsSourceKey.value);
    logAction('AI Scenario: Unregistered sample actions for AI discovery.');
    sampleActionsSourceKey.value = null;
  }
});

const discoverActionsForAI = () => {
  if (!actionCore) {
    logAction('AI Scenario Error: Cannot discover actions, ActionCore not available.');
    discoveredActionsInfo.value = 'Error: ActionCore not available.';
    return;
  }
  logAction('AI Scenario: Discovering actions with scopes:', selectedAllowedScopes.value);
  try {
    const actions = actionCore.getDiscoverableActions({ allowedScopes: selectedAllowedScopes.value });
    discoveredActionsInfo.value = JSON.stringify(actions, null, 2);
    logAction('AI Scenario: Discovered actions result:', actions);
  } catch (error) {
    logAction('AI Scenario Error: Error calling getDiscoverableActions', error);
    discoveredActionsInfo.value = `Error discovering actions: ${error instanceof Error ? error.message : String(error)}`;
  }
};

</script>

<style scoped>
/* Add any component-specific styles here if needed */
pre {
  background-color: #f0f0f0; /* Lighter background for pre */
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  white-space: pre-wrap;       /* CSS3 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
