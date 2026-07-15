<template>
  <div class="text-center my-3">
    <v-btn text="Open Command Palette" @click="dialog = true"></v-btn>

    <v-command-palette
      v-model="dialog"
      v-model:search="search"
      :items="items"
      placeholder="Search commands..."
      @click:item="handleItemClick"
    ></v-command-palette>

    <v-alert
      v-if="lastAction"
      :text="`Action: ${lastAction}`"
      type="info"
      variant="tonal"
    ></v-alert>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const search = ref('')
  const lastAction = ref('')

  const items = [
    {
      title: 'Create File',
      subtitle: 'Create a new file in current directory',
      prependIcon: 'mdi-file-plus',
      value: 'create-file',
    },
    {
      title: 'Create Folder',
      subtitle: 'Create a new folder',
      prependIcon: 'mdi-folder-plus',
      value: 'create-folder',
    },
    {
      title: 'Open Recent',
      subtitle: 'Open recently accessed files',
      prependIcon: 'mdi-history',
      value: 'open-recent',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'Edit Actions',
    },
    {
      title: 'Find in Files',
      subtitle: 'Search across all project files',
      prependIcon: 'mdi-magnify',
      value: 'find-files',
    },
    {
      title: 'Replace in Files',
      subtitle: 'Find and replace across project',
      prependIcon: 'mdi-find-replace',
      value: 'replace-files',
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
      subtitle: 'Show or hide the sidebar',
      prependIcon: 'mdi-page-layout-sidebar-left',
      value: 'toggle-sidebar',
    },
    {
      title: 'Toggle Terminal',
      subtitle: 'Show or hide terminal panel',
      prependIcon: 'mdi-console',
      value: 'toggle-terminal',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'Settings',
    },
    {
      title: 'Preferences',
      subtitle: 'Open settings',
      prependIcon: 'mdi-cog',
      value: 'preferences',
    },
    {
      title: 'Keyboard Shortcuts',
      subtitle: 'View and edit shortcuts',
      prependIcon: 'mdi-keyboard-outline',
      value: 'shortcuts',
    },
  ]

  function handleItemClick (item, event) {
    lastAction.value = item.title
    console.log('Item clicked:', item)
  }
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
        search: '',
        lastAction: '',
        items: [
          {
            title: 'Create File',
            subtitle: 'Create a new file in current directory',
            prependIcon: 'mdi-file-plus',
            value: 'create-file',
          },
          {
            title: 'Create Folder',
            subtitle: 'Create a new folder',
            prependIcon: 'mdi-folder-plus',
            value: 'create-folder',
          },
          {
            title: 'Open Recent',
            subtitle: 'Open recently accessed files',
            prependIcon: 'mdi-history',
            value: 'open-recent',
          },
          {
            type: 'divider',
          },
          {
            type: 'subheader',
            title: 'Edit Actions',
          },
          {
            title: 'Find in Files',
            subtitle: 'Search across all project files',
            prependIcon: 'mdi-magnify',
            value: 'find-files',
          },
          {
            title: 'Replace in Files',
            subtitle: 'Find and replace across project',
            prependIcon: 'mdi-find-replace',
            value: 'replace-files',
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
            subtitle: 'Show or hide the sidebar',
            prependIcon: 'mdi-page-layout-sidebar-left',
            value: 'toggle-sidebar',
          },
          {
            title: 'Toggle Terminal',
            subtitle: 'Show or hide terminal panel',
            prependIcon: 'mdi-console',
            value: 'toggle-terminal',
          },
          {
            type: 'divider',
          },
          {
            type: 'subheader',
            title: 'Settings',
          },
          {
            title: 'Preferences',
            subtitle: 'Open settings',
            prependIcon: 'mdi-cog',
            value: 'preferences',
          },
          {
            title: 'Keyboard Shortcuts',
            subtitle: 'View and edit shortcuts',
            prependIcon: 'mdi-keyboard-outline',
            value: 'shortcuts',
          },
        ],
      }
    },
    methods: {
      handleItemClick (item, event) {
        this.lastAction = item.title
        console.log('Item clicked:', item)
      },
    },
  }
</script>
