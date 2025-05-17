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

      <!-- Mock Command Palette Dialog -->
      <v-dialog v-model="isPaletteOpen" max-width="700px" scrollable eager>
        <v-card>
          <v-card-title class="d-flex align-center pa-2">
            <v-btn v-if="paletteParentAction || paletteActionStack.length > 1" icon="mdi-arrow-left" @click="navigatePaletteBack" density="compact" flat class="mr-2"/>
            <span v-if="paletteParentAction">{{ paletteParentAction.title }}</span>
            <span v-else-if="paletteActionStack.length > 1 && paletteActionStack[paletteActionStack.length-1]?.title">{{paletteActionStack[paletteActionStack.length-1]?.title}}</span>
            <span v-else>Command Palette</span>
          </v-card-title>
          <v-divider />
          <v-card-text class="pa-2">
            <v-text-field
              v-model="paletteSearch"
              label="Search actions"
              autofocus
              clearable
              hide-details
              density="compact"
              class="mb-2"
              @keydown="handlePaletteKeydown"
              ref="paletteSearchInputRef"
            />
            <div style="max-height: 400px; overflow-y: auto;">
              <div v-if="paletteLoadingSubItems" class="text-center pa-4">
                <v-progress-circular indeterminate size="32" color="primary"/>
                <p class="mt-2 text-caption">Loading sub-items...</p>
              </div>
              <v-list v-else-if="currentPaletteActions.length" density="compact" nav>
                <template v-for="(item, index) in currentPaletteActions" :key="item.isHeader ? `header-${item.id}-${index}` : `${item.id}-${index}`">
                  <v-list-subheader v-if="item.isHeader" class="text-primary font-weight-bold">{{ item.title }}</v-list-subheader>
                  <v-list-item
                    v-else
                    :title="item.title"
                    :subtitle="item.description"
                    :disabled="item.disabled || (typeof item.canExecute === 'function' && !item.canExecute({ trigger: 'palette' }))"
                    :active="paletteSelectedIndex === index && !item.isHeader"
                    @click="executePaletteAction(item)"
                    :id="`palette-item-${index}`"
                    lines="two"
                    density="comfortable"
                  >
                    <template #prepend v-if="item.icon">
                      <v-icon :icon="item.icon" class="mr-3" />
                    </template>
                    <template #append v-if="item.hotkey">
                      <VHotKey :hotkey="item.hotkey" />
                    </template>
                     <v-tooltip v-if="item.description" activator="parent" location="bottom start" open-delay="300">
                      {{ item.description }}
                    </v-tooltip>
                  </v-list-item>
                </template>
              </v-list>
              <v-list-item v-else title="No actions found for your query." class="text-disabled text-center"/>
            </div>
          </v-card-text>
           <v-divider />
          <v-card-actions class="pa-1">
            <v-spacer />
            <v-btn @click="isPaletteOpen = false" density="compact" variant="text">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
  ShowSubItemsUISymbol,
} from '@/labs/action-core'
import { VHotKey } from '@/labs/action-core/components/VHotKey/VHotKey'
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
const actionCore = useActionCore()
provide(ActionCoreSymbol, actionCore)
const theme = useTheme()
const currentThemeName = computed(() => theme.global.name.value)
const isPaletteOpen = ref(false)
const paletteSearch = ref('')
const paletteSelectedIndex = ref(-1)
const paletteActionStack = ref<any[]>([])
const paletteLoadingSubItems = ref(false)
const paletteSearchInputRef = ref<any>(null)
const paletteParentAction = computed(() => paletteActionStack.value.length > 1 ? paletteActionStack.value[paletteActionStack.value.length - 1]?.parentAction : null)
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
  const newStackLevel = { parentAction: parentActionDef, actions: parentActionDef?.subItems ? [] : actionCore.allActions.value.filter((act: ActionDefinition) => !act.meta?.paletteHidden), title: parentActionDef ? String(parentActionDef.title) : 'Commands' };
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
const navigatePaletteBack = () => { if (paletteActionStack.value.length > 1) { paletteActionStack.value.pop(); paletteSearch.value = ''; paletteSelectedIndex.value = currentPaletteActions.value.findIndex(item => !item.isHeader); focusPaletteSearch(); } else isPaletteOpen.value = false; }
const executePaletteAction = async (action: ActionDefinition | any) => { if (!action || action.isHeader) return; logAction(`Palette: Executing "${action.title}"`, { id: action.id }); if (action.subItems) openPalette(action); else { try { await actionCore.executeAction(action.id, { trigger: 'palette' }); if (!action.meta?.keepPaletteOpen && paletteActionStack.value.length <= 1) isPaletteOpen.value = false; else if (!action.meta?.keepPaletteOpen && paletteActionStack.value.length > 1) navigatePaletteBack(); } catch (e) { logAction(`Error executing action "${action.id}"`, e) } } }
const scrollToSelectedItem = async () => { await nextTick(); const selectedItemElement = document.getElementById(`palette-item-${paletteSelectedIndex.value}`); selectedItemElement?.scrollIntoView({ block: 'nearest' }); };
const handlePaletteKeydown = (event: KeyboardEvent) => { const items = currentPaletteActions.value; const selectableItems = items.filter(item => !item.isHeader); if (!selectableItems.length && event.key !== 'Escape') return; let currentGlobalIndex = paletteSelectedIndex.value; let currentSelectableItemIndex = selectableItems.indexOf(items[currentGlobalIndex]); switch (event.key) { case 'ArrowDown': event.preventDefault(); if (selectableItems.length > 0) { currentSelectableItemIndex = (currentSelectableItemIndex + 1) % selectableItems.length; paletteSelectedIndex.value = items.indexOf(selectableItems[currentSelectableItemIndex]); scrollToSelectedItem(); } break; case 'ArrowUp': event.preventDefault(); if (selectableItems.length > 0) { currentSelectableItemIndex = (currentSelectableItemIndex - 1 + selectableItems.length) % selectableItems.length; paletteSelectedIndex.value = items.indexOf(selectableItems[currentSelectableItemIndex]); scrollToSelectedItem(); } break; case 'Enter': event.preventDefault(); if (paletteSelectedIndex.value >=0 && items[paletteSelectedIndex.value] && !items[paletteSelectedIndex.value].isHeader) executePaletteAction(items[paletteSelectedIndex.value]); break; case 'Escape': event.preventDefault(); navigatePaletteBack(); break; } }

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
