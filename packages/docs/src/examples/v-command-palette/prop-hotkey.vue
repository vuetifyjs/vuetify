<template>
  <div>
    <v-alert
      class="mb-4"
      type="info"
      variant="tonal"
    >
      <div class="d-flex align-center justify-space-between">
        <span>Press <v-hotkey keys="ctrl+shift+p" inline></v-hotkey> to open the command palette</span>
      </div>
    </v-alert>

    <v-command-palette
      v-model="dialog"
      v-model:search="search"
      :items="items"
      hotkey="ctrl+shift+p"
      placeholder="Type a command or search..."
      @click:item="handleItemClick"
    ></v-command-palette>

    <v-card v-if="lastAction">
      <v-card-title>Last Action</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column ga-2">
          <div><strong>Command:</strong> {{ lastAction.title }}</div>
          <div v-if="lastAction.hotkey">
            <strong>Hotkey:</strong> <v-hotkey :keys="lastAction.hotkey" inline></v-hotkey>
          </div>
          <div><strong>Value:</strong> {{ lastAction.value }}</div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const search = ref('')
  const lastAction = ref(null)

  const items = [
    {
      title: 'Save File',
      subtitle: 'Save the current file',
      prependIcon: 'mdi-content-save',
      value: 'save',
      hotkey: 'meta+s',
    },
    {
      title: 'Save All',
      subtitle: 'Save all open files',
      prependIcon: 'mdi-content-save-all',
      value: 'save-all',
      hotkey: 'meta+alt+s',
    },
    {
      title: 'Open File',
      subtitle: 'Open a file from disk',
      prependIcon: 'mdi-folder-open',
      value: 'open',
      hotkey: 'meta+o',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'Edit',
    },
    {
      title: 'Find',
      subtitle: 'Find in current file',
      prependIcon: 'mdi-magnify',
      value: 'find',
      hotkey: 'meta+f',
    },
    {
      title: 'Replace',
      subtitle: 'Find and replace',
      prependIcon: 'mdi-find-replace',
      value: 'replace',
      hotkey: 'meta+h',
    },
    {
      title: 'Go to Line',
      subtitle: 'Jump to specific line',
      prependIcon: 'mdi-arrow-right-bold',
      value: 'goto',
      hotkey: 'ctrl+g',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'View',
    },
    {
      title: 'Toggle Sidebar',
      subtitle: 'Show or hide sidebar',
      prependIcon: 'mdi-page-layout-sidebar-left',
      value: 'sidebar',
      hotkey: 'meta+b',
    },
    {
      title: 'Zoom In',
      subtitle: 'Increase font size',
      prependIcon: 'mdi-magnify-plus',
      value: 'zoom-in',
      hotkey: 'meta+plus',
    },
    {
      title: 'Zoom Out',
      subtitle: 'Decrease font size',
      prependIcon: 'mdi-magnify-minus',
      value: 'zoom-out',
      hotkey: 'meta+minus',
    },
  ]

  function handleItemClick (item, event) {
    lastAction.value = item
    console.log('Executed command:', item.title)
  }
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        lastAction: null,
        items: [
          {
            title: 'Save File',
            subtitle: 'Save the current file',
            prependIcon: 'mdi-content-save',
            value: 'save',
            hotkey: 'meta+s',
          },
          {
            title: 'Save All',
            subtitle: 'Save all open files',
            prependIcon: 'mdi-content-save-all',
            value: 'save-all',
            hotkey: 'meta+alt+s',
          },
          {
            title: 'Open File',
            subtitle: 'Open a file from disk',
            prependIcon: 'mdi-folder-open',
            value: 'open',
            hotkey: 'meta+o',
          },
          {
            type: 'divider',
          },
          {
            type: 'subheader',
            title: 'Edit',
          },
          {
            title: 'Find',
            subtitle: 'Find in current file',
            prependIcon: 'mdi-magnify',
            value: 'find',
            hotkey: 'meta+f',
          },
          {
            title: 'Replace',
            subtitle: 'Find and replace',
            prependIcon: 'mdi-find-replace',
            value: 'replace',
            hotkey: 'meta+h',
          },
          {
            title: 'Go to Line',
            subtitle: 'Jump to specific line',
            prependIcon: 'mdi-arrow-right-bold',
            value: 'goto',
            hotkey: 'ctrl+g',
          },
          {
            type: 'divider',
          },
          {
            type: 'subheader',
            title: 'View',
          },
          {
            title: 'Toggle Sidebar',
            subtitle: 'Show or hide sidebar',
            prependIcon: 'mdi-page-layout-sidebar-left',
            value: 'sidebar',
            hotkey: 'meta+b',
          },
          {
            title: 'Zoom In',
            subtitle: 'Increase font size',
            prependIcon: 'mdi-magnify-plus',
            value: 'zoom-in',
            hotkey: 'meta+plus',
          },
          {
            title: 'Zoom Out',
            subtitle: 'Decrease font size',
            prependIcon: 'mdi-magnify-minus',
            value: 'zoom-out',
            hotkey: 'meta+minus',
          },
        ],
      }
    },
    methods: {
      handleItemClick (item, event) {
        this.lastAction = item
        console.log('Executed command:', item.title)
      },
    },
  }
</script>
