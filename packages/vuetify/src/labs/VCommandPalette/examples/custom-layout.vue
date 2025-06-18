<template>
  <div>
    <v-btn @click="model = true">Open Custom Layout Command Palette</v-btn>

    <!-- Custom Layout Example -->
    <VCommandPalette
      v-model="model"
      :items="items"
      title="Custom Layout Example"
    >
      <template #default="{ items, rootProps, getItemProps }">
        <!-- Custom grid layout -->
        <VCommandPaletteItems
          v-bind="rootProps"
          class="pa-4"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;"
        >
          <VCommandPaletteItem
            v-for="(item, index) in items"
            :key="item.id"
            :index="index"
            :item="item"
            class="pa-3 rounded border"
            style="border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));"
          >
            <template #default="{ item, selected }">
              <div
                :class="[
                  'text-center',
                  { 'bg-primary text-white': selected }
                ]"
              >
                <v-icon
                  :icon="item.icon"
                  class="mb-2"
                  size="32"
                />
                <div class="text-subtitle-2 font-weight-bold">
                  {{ item.title }}
                </div>
                <div class="text-caption">
                  {{ item.subtitle }}
                </div>
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
      <template #default="{ items, rootProps, getItemProps }">
        <!-- Manual implementation without helper components -->
        <div
          v-bind="rootProps"
          class="pa-4"
          style="display: flex; flex-wrap: wrap; gap: 8px;"
        >
          <div
            v-for="(item, index) in items"
            :key="item.id"
            v-bind="getItemProps(item, index)"
            :class="{
              'bg-primary text-white': getItemProps(item, index)['aria-selected'] === 'true'
            }"
            class="pa-2 rounded cursor-pointer"
            style="min-width: 120px; border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));"
          >
            <v-icon :icon="item.icon" class="mr-2" />
            {{ item.title }}
          </div>
        </div>
      </template>
    </VCommandPalette>
  </div>
</template>

<script setup>
  // Utilities
  import { ref } from 'vue'
  import { VCommandPalette, VCommandPaletteItem, VCommandPaletteItems } from '../VCommandPalette'
  const model = ref(false)
  const model2 = ref(false)

  const items = ref([
    {
      id: 'new-file',
      title: 'New File',
      subtitle: 'Create a new file',
      icon: 'mdi-file-plus',
      handler: () => console.log('New file created'),
    },
    {
      id: 'open-file',
      title: 'Open File',
      subtitle: 'Open an existing file',
      icon: 'mdi-folder-open',
      handler: () => console.log('File opened'),
    },
    {
      id: 'save-file',
      title: 'Save File',
      subtitle: 'Save current file',
      icon: 'mdi-content-save',
      handler: () => console.log('File saved'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'Open application settings',
      icon: 'mdi-cog',
      handler: () => console.log('Settings opened'),
    },
    {
      id: 'help',
      title: 'Help',
      subtitle: 'View help documentation',
      icon: 'mdi-help-circle',
      handler: () => console.log('Help opened'),
    },
    {
      id: 'about',
      title: 'About',
      subtitle: 'About this application',
      icon: 'mdi-information',
      handler: () => console.log('About opened'),
    },
  ])
</script>
