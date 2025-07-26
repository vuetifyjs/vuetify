<template>
  <div>
    <v-btn @click="model = true">Open Custom Layout Command Palette</v-btn>

    <!-- Custom Layout Example -->
    <VCommandPalette
      v-model="model"
      :items="items"
      title="Custom Layout Example"
    >
      <template #default="{ items: filteredItems, rootProps }">
        <!-- Custom grid layout -->
        <VCommandPaletteItems
          v-bind="rootProps"
          class="pa-4"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;"
        >
          <VCommandPaletteItem
            v-for="(item, index) in filteredItems"
            :key="item.raw.id"
            :index="index"
            :item="item"
            class="pa-1 rounded-lg border"
            style="border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));"
          >
            <template #default="{ selected }">
              <div :class="['text-center pa-3 rounded', { 'bg-primary': selected } ]">
                <v-icon :icon="item.raw.icon" class="my-2" size="32" />
                <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                <div class="text-caption">{{ item.raw.subtitle }}</div>
              </div>
            </template>
          </VCommandPaletteItem>
        </VCommandPaletteItems>
      </template>
    </VCommandPalette>

    <!-- Alternative: Manual Custom Layout -->
    <v-btn class="ml-4" @click="model2 = true">Open Manual Custom Layout</v-btn>

    <VCommandPalette
      v-model="model2"
      :items="items"
      title="Manual Custom Layout"
    >
      <template #default="{ items: filteredItems, rootProps, getItemProps }">
        <!-- Manual implementation without helper components -->
        <div
          v-bind="rootProps"
          class="pa-4"
          style="display: flex; flex-wrap: wrap; gap: 8px;"
        >
          <div
            v-for="(item, index) in filteredItems"
            :key="item.raw.id"
            v-bind="getItemProps(item, index)"
            :class="{ 'bg-primary': getItemProps(item, index)['aria-selected'] === 'true' }"
            class="pa-2 rounded cursor-pointer elevation-2"
            style="min-width: 120px; border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));"
            tabindex="0"
          >
            <v-icon :icon="item.raw.icon" class="mr-2" />
            {{ item.title }}
          </div>
        </div>
      </template>
    </VCommandPalette>
    <pre>{{ log.join('\n') }}</pre>
  </div>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'
  const model = ref(false)
  const model2 = ref(false)

  const log = ref([])

  const items = ref([
    {
      id: 'new-file',
      title: 'New File',
      subtitle: 'Create a new file',
      icon: 'mdi-file-plus',
      handler: () => log.value.push('New file created'),
    },
    {
      id: 'open-file',
      title: 'Open File',
      subtitle: 'Open an existing file',
      icon: 'mdi-folder-open',
      handler: () => log.value.push('File opened'),
    },
    {
      id: 'save-file',
      title: 'Save File',
      subtitle: 'Save current file',
      icon: 'mdi-content-save',
      handler: () => log.value.push('File saved'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Open application settings',
      icon: 'mdi-cog',
      handler: () => log.value.push('Settings opened'),
    },
    {
      id: 'help',
      title: 'Help',
      subtitle: 'View help documentation',
      icon: 'mdi-help-circle',
      handler: () => log.value.push('Help opened'),
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'About this application',
      icon: 'mdi-information',
      handler: () => log.value.push('About opened'),
    },
  ])
</script>
