<template>
  <v-app :theme="currentThemeName">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1>ActionCore Playground</h1>
          <p>Use <VHotKey action-id="open-command-palette" /> to open the mock Command Palette. Check console and log below for action feedback.</p>
        </v-col>
      </v-row>

      <!-- Global Log / Feedback -->
      <v-row>
        <v-col cols="12">
          <v-card title="Log">
            <v-card-text>
              <pre ref="logContainerRef" @scroll="handleLogScroll" style="max-height: 200px; overflow-y: auto;">{{ logMessages.join('\n') }}</pre>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="clearLog" density="compact">Clear Log</v-btn>
              <v-spacer />
              <v-chip v-if="!stickToBottom" @click="scrollToBottomAndStick" color="info" size="small" variant="outlined">
                Scroll to follow
              </v-chip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Scenario Sections -->
      <v-row>
        <!-- Column 1 -->
        <v-col cols="12" md="4">
          <ScenarioBasicGlobalActions />
          <ScenarioCommandPalette />
          <ScenarioDynamicRegistration />
          <ScenarioActionWithSubItems />
          <ScenarioActionWithParams />
        </v-col>

        <!-- Column 2 -->
        <v-col cols="12" md="4">
          <ScenarioContextualActions />
          <scenario-card title="Action Overriding">
             <p>See "Contextual Actions" above. Both "Save Editor" and "Global Save" use <VHotKey action-id="save-editor" />.
              Their <code>canExecute</code> or <code>runInTextInput</code> determines which is active.
            </p>
          </scenario-card>
          <ScenarioSequenceHotkey />
          <ScenarioHotkeysInTextInputs />
          <ScenarioActiveHotkeys />
        </v-col>

        <!-- Column 3 -->
        <v-col cols="12" md="4">
          <ScenarioProgrammaticExecution />
          <ScenarioHotkeyUnregistration />
          <ScenarioActionProfiles />
          <ScenarioUndoRedo />
          <ScenarioContextMenu />
        </v-col>
      </v-row>

      <VCommandPalette
        v-model="isPaletteOpen"
        variant="linear-dark"
        density="compact"
        close-on-execute
      />

    </v-container>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, provide, nextTick, watch } from 'vue'
import { useTheme } from 'vuetify'
import {
  useActionCore,
  ActionCoreSymbol,
  type ActionDefinition,
  type ActionContext,
} from '@/labs/VActionCore/archive'
import { type ActionCoreOptions, ShowSubItemsUISymbol } from '@/labs/VActionCore/archive/types'
import { VHotKey } from '@/labs/VActionCore/archive/components/VHotKey/VHotKey'
import ScenarioCard from '@playgrounds/ActionCore/ScenarioCard.vue'
import ScenarioBasicGlobalActions from '@playgrounds/ActionCore/scenarios/ScenarioBasicGlobalActions.vue'
import ScenarioCommandPalette from '@playgrounds/ActionCore/scenarios/ScenarioCommandPalette.vue'
import ScenarioDynamicRegistration from '@playgrounds/ActionCore/scenarios/ScenarioDynamicRegistration.vue'
import ScenarioContextualActions from '@playgrounds/ActionCore/scenarios/ScenarioContextualActions.vue'
import ScenarioSequenceHotkey from '@playgrounds/ActionCore/scenarios/ScenarioSequenceHotkey.vue'
import ScenarioHotkeysInTextInputs from '@playgrounds/ActionCore/scenarios/ScenarioHotkeysInTextInputs.vue'
import ScenarioProgrammaticExecution from '@playgrounds/ActionCore/scenarios/ScenarioProgrammaticExecution.vue'
import ScenarioHotkeyUnregistration from '@playgrounds/ActionCore/scenarios/ScenarioHotkeyUnregistration.vue'
import ScenarioActionProfiles from '@playgrounds/ActionCore/scenarios/ScenarioActionProfiles.vue'
import ScenarioUndoRedo from '@playgrounds/ActionCore/scenarios/ScenarioUndoRedo.vue'
import ScenarioContextMenu from '@playgrounds/ActionCore/scenarios/ScenarioContextMenu.vue'
import ScenarioActionWithSubItems from '@playgrounds/ActionCore/scenarios/ScenarioActionWithSubItems.vue'
import ScenarioActionWithParams from '@playgrounds/ActionCore/scenarios/ScenarioActionWithParams.vue'
import ScenarioActiveHotkeys from '@playgrounds/ActionCore/scenarios/ScenarioActiveHotkeys.vue'

// --- Global Log, ActionCore, Theme, Palette setup (remains the same) ---
const logMessages = ref<string[]>([])
const logContainerRef = ref<HTMLElement | null>(null)
const stickToBottom = ref(true)
const scrollToBottom = () => { nextTick(() => { if (logContainerRef.value) { logContainerRef.value.scrollTop = logContainerRef.value.scrollHeight } }) }
const logAction = (message: string, details?: any) => {
  const fullMessage = details ? `${message} ${JSON.stringify(details)}` : message
  logMessages.value.push(fullMessage)
  if (logMessages.value.length > 200) logMessages.value.pop()
  if (details !== undefined) { console.log('[ActionCorePlayground]', message, details) } else { console.log('[ActionCorePlayground]', message) }
  if (stickToBottom.value) scrollToBottom()
}
provide('logAction', logAction)
const clearLog = () => { logMessages.value = []; stickToBottom.value = true; scrollToBottom(); }
const handleLogScroll = () => { if (logContainerRef.value) { const { scrollTop, scrollHeight, clientHeight } = logContainerRef.value; if (scrollHeight - scrollTop <= clientHeight + 5) stickToBottom.value = true; else stickToBottom.value = false; } }
const scrollToBottomAndStick = () => { stickToBottom.value = true; scrollToBottom(); }
watch(logMessages, () => { if (stickToBottom.value) scrollToBottom() }, { deep: true })

// Initialize ActionCore with AI features enabled for the playground
const actionCoreOptionsObj: ActionCoreOptions = {
  verboseLogging: true,
  // Potentially other playground-specific options if needed later
};
const actionCore = useActionCore(actionCoreOptionsObj);

provide(ActionCoreSymbol, actionCore)

const theme = useTheme()
const currentThemeName = computed(() => theme.global.name.value)
const isPaletteOpen = ref(true)
const paletteSearch = ref('')
const paletteSelectedIndex = ref(-1)
const paletteActionStack = ref<any[]>([])
const paletteLoadingSubItems = ref(false)
const paletteSearchInputRef = ref<any>(null)
const rawPaletteActions = computed(() => !actionCore ? [] : (paletteActionStack.value[paletteActionStack.value.length - 1]?.actions || actionCore.allActions.value.filter((act: ActionDefinition) => !act.meta?.paletteHidden) || []))
const currentPaletteActions = computed(() => {
  let actions = rawPaletteActions.value
  if (paletteSearch.value) {
    const query = paletteSearch.value.toLowerCase()
    actions = actions.filter((action: any) => !action.isHeader && (action.title?.toLowerCase().includes(query) || (action.keywords && (Array.isArray(action.keywords) ? action.keywords.some((k:string) => k.toLowerCase().includes(query)) : action.keywords.toLowerCase().includes(query)))))
  }
  const grouped: { [key: string]: any[] } = {}
  actions.filter((a:any) => !a.isHeader).forEach((act: any) => { const groupName = act.group || 'ZZZ_Ungrouped'; if (!grouped[groupName]) grouped[groupName] = []; grouped[groupName].push(act) })
  let result: any[] = []
  Object.keys(grouped).sort((a,b) => a === 'ZZZ_Ungrouped' ? 1 : b === 'ZZZ_Ungrouped' ? -1 : a.localeCompare(b)).forEach(groupName => { result.push({ isHeader: true, title: groupName === 'ZZZ_Ungrouped' ? 'Other Actions' : groupName, id: `header-${groupName.replace(/\s+/g, '-')}` }); result = result.concat(grouped[groupName].sort((a:any,b:any) => (a.order ?? 99) - (b.order ?? 99) || String(a.title).localeCompare(String(b.title)))) })
  paletteSelectedIndex.value = result.findIndex(item => !item.isHeader)
  return result
})
const openPalette = (parentActionDef?: ActionDefinition) => {
  logAction('Command Palette Opened', parentActionDef ? { parent: parentActionDef.id } : {})
  paletteSearch.value = ''
  paletteSelectedIndex.value = -1
  const newStackLevel = { parentAction: parentActionDef, actions: parentActionDef?.subItems ? [] : actionCore.allActions.value.filter((act: ActionDefinition) => !act.meta?.paletteHidden), title: parentActionDef ? String(parentActionDef.title) : undefined };
  if (parentActionDef && parentActionDef.subItems) {
    paletteLoadingSubItems.value = true; isPaletteOpen.value = true;
    const context: ActionContext = { trigger: 'palette' };
    Promise.resolve(parentActionDef.subItems(context)).then(subActions => { newStackLevel.actions = subActions || []; paletteActionStack.value.push(newStackLevel); paletteLoadingSubItems.value = false; focusPaletteSearch(); paletteSelectedIndex.value = currentPaletteActions.value.findIndex(item => !item.isHeader); }).catch(err => { logAction(`Error loading subItems for "${parentActionDef.id}"`, err); paletteLoadingSubItems.value = false; });
  } else {
    if (!parentActionDef) paletteActionStack.value = [newStackLevel]; else paletteActionStack.value.push(newStackLevel);
    isPaletteOpen.value = true; focusPaletteSearch(); paletteSelectedIndex.value = currentPaletteActions.value.findIndex(item => !item.isHeader);
  }
}
provide('openPalette', openPalette);
provide(ShowSubItemsUISymbol, openPalette);
const focusPaletteSearch = async () => { await nextTick(); paletteSearchInputRef.value?.focus(); }





// --- Scenario Implementations Setup ---

// Scenario 7: Sequence Hotkey - Action globally registered, UI component just displays info.
// MOVED TO: ScenarioSequenceHotkey.vue

// Scenario 8: Hotkeys In Text Inputs - Action globally registered, UI component provides the input.
// MOVED TO: ScenarioHotkeysInTextInputs.vue

// Scenario 10: Programmatic Execution - Action globally registered, UI component provides trigger.
// MOVED TO: ScenarioProgrammaticExecution.vue

// Scenario 13: Undo Redo - Actions globally registered, UI component provides triggers.
// MOVED TO: ScenarioUndoRedo.vue

// Scenario 14: Context Menu - Actions globally registered, UI component provides triggers.
// MOVED TO: ScenarioContextMenu.vue

// Expose for template (No longer needed as VCommandPalette handles these)
// const { executeAction, getAction } = actionCore

const testItemsWithTooltips: ActionDefinition[] = [
  { id: 'debug-action-1', title: 'Action with Tooltip', description: 'This is a tooltip for action 1!', icon: 'mdi-information', hotkey: 'ctrl+i', handler: () => { logAction('Debug Action 1 (Tooltip) triggered');} },
  { id: 'debug-action-2', title: 'Another Action', description: 'Tooltip for another action.', icon: 'mdi-star', handler: () => { logAction('Debug Action 2 (Tooltip) triggered'); } },
  { id: 'debug-action-no-tip', title: 'No Tooltip Action', icon: 'mdi-check', handler: () => { logAction('Debug Action No Tooltip triggered'); } },
];
// Registering actions directly. If a source key were needed for unregistration,
// it would typically be returned by this call or passed in an options object.
actionCore.registerActionsSource(testItemsWithTooltips);

// --- End Command Palette ---

</script>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #333;
  font-size: 0.9em;
}
.v-card.scenario-card {
  border-left: 4px solid var(--v-primary-base, #1976D2);
}
.v-card-title {
  color: var(--v-primary-darken-1, #1565C0);
}

/* Ensure VHotKey display is consistent */
.v-list-item :deep(.v-hot-key) {
  font-size: 0.8em;
  opacity: 0.7;
}
</style>
