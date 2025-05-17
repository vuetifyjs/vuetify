<template>
  <scenario-card title="Action Profiles (Native - Beginner vs Advanced)">
    <p>Select mode to change active save action profiles:</p>
    <v-btn-toggle v-model="currentMode" class="mb-2" density="compact" divided @update:model-value="updateActiveProfile">
      <v-btn value="beginner">Beginner</v-btn>
      <v-btn value="advanced">Advanced</v-btn>
      <v-btn :value="null">Default (None)</v-btn>
    </v-btn-toggle>
    <p class="text-caption mb-1">
      Editor Save Hotkey (<code style="font-size: 0.8em">save-editor</code>):
      <VHotKey action-id="save-editor" />
    </p>
    <p class="text-caption">
      Global Save Hotkey (<code style="font-size: 0.8em">global-save</code>):
      <VHotKey action-id="global-save" />
    </p>
    <p class="text-caption mt-2">
      Active Profile: {{ actionCore?.activeProfile.value || 'None' }}
    </p>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { useActionCore, type ActionDefinition, type ActionContext, VHotKey } from '../../../src/labs/VActionCore'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

// currentMode now directly reflects the profile name, or null for base
const currentMode = ref<string | null>('beginner')
let profileActionsSourceKey: symbol | undefined

const isMockEditorActive = () => typeof document !== 'undefined' && document.activeElement?.id === 'mock-editor-textarea'

// Define actions ONCE with their profiles
const profileManagedActions: ActionDefinition[] = [
  {
    id: 'save-editor',
    title: 'Default Editor Save', // Base title
    hotkey: 'alt+s',          // Base hotkey
    meta: { base: true, from: 'ScenarioActionProfiles' },
    description: 'Default editor save. Active when editor is focused.',
    canExecute: (ctx: ActionContext) => isMockEditorActive(),
    runInTextInput: () => isMockEditorActive(),
    handler: (ctx: ActionContext) => {
      if (logAction) logAction('Default Editor Save executed', { hotkey: 'alt+s', data: ctx.data })
    },
    profiles: {
      beginner: {
        title: 'Simple Save (Editor)',
        hotkey: 'ctrl+s',
        meta: { mode: 'beginner' },
        description: 'Saves editor content (Beginner Mode). Active when editor is focused.',
        handler: (ctx: ActionContext) => {
          if (logAction) logAction('Beginner Save (Ctrl+S) for editor done', ctx.data)
        },
      },
      advanced: {
        title: 'Advanced Save + Commit (Editor)',
        hotkey: 'ctrl+shift+s',
        meta: { mode: 'advanced' },
        description: 'Saves and commits editor content (Advanced Mode). Active when editor is focused.',
        handler: (ctx: ActionContext) => {
          if (logAction) logAction('Advanced Save and Commit (Ctrl+Shift+S) for editor done', ctx.data)
        },
      },
    },
  },
  {
    id: 'global-save',
    title: 'Default Global Save', // Base title
    hotkey: 'alt+g',          // Base hotkey
    meta: { base: true, from: 'ScenarioActionProfiles' },
    description: 'Default global save. Active when editor is NOT focused.',
    canExecute: (ctx: ActionContext) => !isMockEditorActive(),
    handler: (ctx: ActionContext) => {
      if (logAction) logAction('Default Global Save executed', { hotkey: 'alt+g', data: ctx.data })
    },
    profiles: {
      beginner: {
        title: 'Global Simple Save',
        hotkey: 'ctrl+s', // Same hotkey as editor save in beginner, context (`canExecute`) differentiates
        meta: { mode: 'beginner' },
        description: 'Global save action (Beginner Mode). Active when editor is NOT focused.',
        handler: (ctx: ActionContext) => {
          if (logAction) logAction('Global Simple Save (Ctrl+S) executed', ctx.data)
        },
      },
      advanced: {
        title: 'Global Advanced Save + Commit',
        hotkey: 'ctrl+shift+s', // Same hotkey as editor save in advanced
        meta: { mode: 'advanced' },
        description: 'Global advanced save (Advanced Mode). Active when editor is NOT focused.',
        handler: (ctx: ActionContext) => {
          if (logAction) logAction('Global Advanced Save + Commit (Ctrl+Shift+S) executed', ctx.data)
        },
      },
    },
  },
]

const updateActiveProfile = (newProfileName: string | null) => {
  if (actionCore) {
    actionCore.setActiveProfile(newProfileName)
    if (logAction) logAction(`Action profile set to: ${newProfileName || 'None'}`)
  }
}

onMounted(() => {
  if (actionCore) {
    profileActionsSourceKey = actionCore.registerActionsSource(profileManagedActions)
    // Set initial profile based on currentMode value
    actionCore.setActiveProfile(currentMode.value)
    if (logAction) {
      logAction('Registered: Profile-aware save actions (from ScenarioActionProfiles)')
      logAction(`Initial action profile set to: ${currentMode.value || 'None'}`)
    }
  }
})

onUnmounted(() => {
  if (actionCore && profileActionsSourceKey) {
    actionCore.unregisterActionsSource(profileActionsSourceKey)
    // Optionally reset profile if this component is solely responsible
    // actionCore.setActiveProfile(null)
    if (logAction) logAction('Unregistered profile-aware save actions from ScenarioActionProfiles')
  }
})
</script>
