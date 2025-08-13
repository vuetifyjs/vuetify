<template>
  <div class="d-flex justify-center">
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="flex-grow-1"
      contained
    >
      <template v-slot:default="{ items: filteredItems, rootProps, getItemProps }">
        <div
          v-bind="rootProps"
          class="pa-4"
          style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px;"
        >
          <div
            v-for="(item, index) in filteredItems"
            :key="item.raw.id"
            v-bind="getItemProps(item, index)"
            :class="{ 'bg-primary': getItemProps(item, index)['aria-selected'] }"
            class="d-flex flex-column align-center justify-center pa-2 rounded-lg"
            style="cursor: pointer;"
          >
            <v-icon :icon="item.raw.prependIcon" size="x-large"></v-icon>
            <div class="mt-2 text-body-2">{{ item.title }}</div>
          </div>
        </div>
      </template>
    </v-command-palette>
  </div>
</template>

<script setup>
  const items = [
    { id: 'new-doc', title: 'New Doc', prependIcon: 'mdi-file-document-plus-outline', handler: () => {} },
    { id: 'new-sheet', title: 'New Sheet', prependIcon: 'mdi-file-excel-box-outline', handler: () => {} },
    { id: 'new-slide', title: 'New Slide', prependIcon: 'mdi-file-powerpoint-box-outline', handler: () => {} },
    { id: 'upload', title: 'Upload', prependIcon: 'mdi-upload-outline', handler: () => {} },
  ]
</script>
