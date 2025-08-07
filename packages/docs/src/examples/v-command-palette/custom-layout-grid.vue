<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Grid Layout
    </v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      title="Quick Actions"
    >
      <template #default="{ items: filteredItems, rootProps, getItemProps }">
        <div
          v-bind="rootProps"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;"
          class="pa-4"
        >
          <div
            v-for="(item, index) in filteredItems"
            :key="item.raw.id"
            v-bind="getItemProps(item, index)"
            class="d-flex flex-column align-center justify-center pa-2 rounded-lg"
            :class="{ 'bg-primary': getItemProps(item, index)['aria-selected'] }"
            style="cursor: pointer;"
          >
            <v-icon :icon="item.raw.prependIcon" size="x-large" />
            <div class="mt-2 text-body-2">{{ item.title }}</div>
          </div>
        </div>
      </template>
    </v-command-palette>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

  const items = [
    { id: 'new-doc', title: 'New Doc', prependIcon: 'mdi-file-document-plus-outline', handler: () => {} },
    { id: 'new-sheet', title: 'New Sheet', prependIcon: 'mdi-file-excel-box-outline', handler: () => {} },
    { id: 'new-slide', title: 'New Slide', prependIcon: 'mdi-file-powerpoint-box-outline', handler: () => {} },
    { id: 'upload', title: 'Upload', prependIcon: 'mdi-upload-outline', handler: () => {} },
  ]
</script>

