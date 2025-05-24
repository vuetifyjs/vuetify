<template>
  <scenario-card title="Context Menu Actions (Right-Click Simulation)">
    <p>Right-click on an item below to open a simulated context menu.</p>
    <v-list density="compact" class="zebra-list">
      <v-list-item
        v-for="(item, index) in items"
        :key="item.id"
        @contextmenu.prevent="handleRightClick(item, $event)"
        style="cursor: context-menu; user-select: none; border-bottom: 1px solid #eee;"
        class="pa-2 list-item-hoverable"
        :class="{ 'zebra-stripe': index % 2 === 0 }"
      >
        <template #prepend>
          <v-icon :icon="item.icon || 'mdi-file-document-outline'" class="mr-3"></v-icon>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-menu
      ref="vMenuRef"
      v-if="isContextMenuOpen && contextMenuItem"
      :model-value="isContextMenuOpen"
      @update:modelValue="(val) => { if (!val) closeContextMenu(); }"
      absolute
      :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }"
      :scrim="false"
      content-class="elevation-2 v-context-menu-content"
      min-width="200"
      max-width="280"
      offset="0 0"
      @click:outside="closeContextMenu"
      :close-on-content-click="false"
      :persistent="false"
    >
      <v-list density="compact" nav>
        <v-list-subheader v-if="contextMenuItem">Actions for: {{ contextMenuItem.name }}</v-list-subheader>
        <v-divider v-if="contextMenuItem"></v-divider>
        <v-list-item @click="executeEditContextAction" :disabled="!contextMenuItem" value="edit">
          <template #prepend><v-icon :icon="String(editItemAction.icon || 'mdi-pencil')" size="small" class="mr-3"></v-icon></template>
          <v-list-item-title>{{ String(editItemAction.title) }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="executeDeleteContextAction" :disabled="!contextMenuItem" value="delete">
          <template #prepend><v-icon :icon="String(deleteItemAction.icon || 'mdi-delete')" size="small" class="mr-3"></v-icon></template>
          <v-list-item-title>{{ String(deleteItemAction.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </scenario-card>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted, nextTick, watch } from 'vue';
import ScenarioCard from '../ScenarioCard.vue';
import { ActionCoreSymbol, type ActionDefinition, type ActionContext } from '@/labs/VActionCore/archive';

const actionCore = inject(ActionCoreSymbol);
const logAction = inject<(message: string, details?: any) => void>('logAction');

const items = ref([
  { id: 1, name: 'Alpha Document', icon: 'mdi-file-document-outline' },
  { id: 2, name: 'Beta Spreadsheet', icon: 'mdi-google-spreadsheet' },
  { id: 3, name: 'Gamma Presentation', icon: 'mdi-file-powerpoint-outline' },
  { id: 4, name: 'Delta Report', icon: 'mdi-file-chart-outline' },
]);

interface Item { id: number; name: string; icon?: string; [key: string]: any; }

const vMenuRef = ref<any>(null);
const isContextMenuOpen = ref(false);
const contextMenuItem = ref<Item | null>(null);
const contextMenuPosition = ref({ x: 0, y: 0 });

watch(isContextMenuOpen, (newValue) => {
  // Optional: console.log(`isContextMenuOpen watcher: ${newValue}. Item: ${contextMenuItem.value?.name}`);
});

const editItemAction: ActionDefinition = {
  id: 'ctx-edit-item',
  title: 'Edit Item',
  icon: 'mdi-pencil',
  handler: (ctx?: ActionContext) => {
    if (logAction) logAction('[ContextMenuScenario] Edit Item action triggered for', ctx?.data);
  }
};
const deleteItemAction: ActionDefinition = {
  id: 'ctx-delete-item',
  title: 'Delete Item',
  icon: 'mdi-delete',
  handler: (ctx?: ActionContext) => {
    if (logAction) logAction('[ContextMenuScenario] Delete Item action triggered for', ctx?.data);
  }
};

let scenario14SourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    scenario14SourceKey = actionCore.registerActionsSource([editItemAction, deleteItemAction]);
  }
  window.addEventListener('keydown', handleGlobalKeyDownForMenu);
});
onUnmounted(() => {
  if (actionCore && scenario14SourceKey) actionCore.unregisterActionsSource(scenario14SourceKey);
  window.removeEventListener('keydown', handleGlobalKeyDownForMenu);
});

const closeContextMenu = () => {
  if (isContextMenuOpen.value) {
    isContextMenuOpen.value = false;
  }
  contextMenuItem.value = null;
};

const handleGlobalKeyDownForMenu = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isContextMenuOpen.value) {
    closeContextMenu();
  }
};

const handleRightClick = async (item: Item, event: MouseEvent) => {
  event.preventDefault();
  if (isContextMenuOpen.value) {
    isContextMenuOpen.value = false;
    contextMenuItem.value = null;
    await nextTick();
  }
  contextMenuItem.value = item;
  let clickPosX = event.clientX + window.scrollX;
  let clickPosY = event.clientY + window.scrollY;
  contextMenuPosition.value = { x: clickPosX, y: clickPosY };
  isContextMenuOpen.value = true;
  await nextTick();
  let finalX = clickPosX;
  let finalY = clickPosY;
  const menuContentElement = document.querySelector('.v-context-menu-content') as HTMLElement | null;
  if (menuContentElement) {
    const menuRect = menuContentElement.getBoundingClientRect();
    const menuHeight = menuRect.height;
    const menuWidth = menuRect.width;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 10;
    if (event.clientX + menuWidth > viewportWidth - margin) {
      finalX = clickPosX - menuWidth;
      if (finalX < window.scrollX + margin) finalX = window.scrollX + margin;
    }
    if (event.clientY + menuHeight > viewportHeight - margin) {
      finalY = clickPosY - menuHeight;
      if (finalY < window.scrollY + margin) finalY = window.scrollY + margin;
    }
    contextMenuPosition.value = { x: finalX, y: finalY };
  } else {
    contextMenuPosition.value = { x: clickPosX, y: clickPosY };
  }
  if (!isContextMenuOpen.value) isContextMenuOpen.value = true;
};

const executeEditContextAction = () => {
  if (!contextMenuItem.value || !actionCore) return;
  actionCore.executeAction(editItemAction.id, { data: contextMenuItem.value, trigger: 'context-menu-ui' });
  closeContextMenu();
};

const executeDeleteContextAction = () => {
  if (!contextMenuItem.value || !actionCore) return;
  actionCore.executeAction(deleteItemAction.id, { data: contextMenuItem.value, trigger: 'context-menu-ui' });
  closeContextMenu();
};

</script>
<style scoped>
.list-item-hoverable:hover { background-color: rgba(0,0,0,0.05); }
.zebra-list .v-list-item.zebra-stripe { background-color: rgba(0,0,0,0.02); }
</style>
