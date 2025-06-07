<script setup lang="ts">
  import { VBtn } from '@/components/VBtn'
  import { VCommandPalette } from '../src/labs/VCommandPalette'
  import { ref } from 'vue'
  import { useTheme } from '@/composables'

  const model = ref(true)
  const theme = useTheme()

  const items = [
    // Regular parent item (no divider)
    {
      title: 'New',
      value: 'new',
      prependIcon: 'mdi-plus',
      children: [
        {
          title: 'Project',
          prependIcon: 'mdi-folder-plus-outline',
          subtitle: 'Create a new project',
          value: 'new:project',
          handler: (e: any, v: any) => console.log({ e, v }),
          hotkey: 'ctrl+alt+n',
        },
        {
          title: 'File',
          prependIcon: 'mdi-file-plus-outline',
          subtitle: 'Create a new file',
          handler: (e: any, v: any) => console.log({ e, v }),
          value: 'new:file',
        },
        {
          title: 'User',
          prependIcon: 'mdi-account-plus-outline',
          subtitle: 'Create a new user',
          handler: (e: any, v: any) => console.log({ e, v }),
          value: 'new:user',
        },
      ],
    },

    // Group with start divider
    {
      type: 'group',
      id: 'git-group',
      title: 'Git Actions',
      divider: 'end',
      children: [
        {
          title: 'Commit',
          prependIcon: 'mdi-source-commit',
          subtitle: 'Commit changes',
          value: 'git:commit',
          handler: (e: any, v: any) => console.log({ e, v }),
          hotkey: 'ctrl+k',
        },
        {
          title: 'Push',
          prependIcon: 'mdi-source-pull',
          subtitle: 'Push changes',
          value: 'git:push',
          handler: (e: any, v: any) => console.log({ e, v }),
          hotkey: 'ctrl+shift+k',
        },
        {
          title: 'Fetch',
          prependIcon: 'mdi-source-branch',
          subtitle: 'Fetch changes',
          handler: (e: any, v: any) => console.log({ e, v }),
          value: 'git:fetch',
        },
      ],
    },

    // Regular items
    {
      title: 'File: Save',
      prependIcon: 'mdi-content-save',
      subtitle: 'Save the current file',
      value: 'file:save',
      handler: (e: any, v: any) => console.log({ e, v }),
      hotkey: 'ctrl+s',
    },
    {
      title: 'File: Save As...',
      prependIcon: 'mdi-content-save-outline',
      subtitle: 'Save the current file as...',
      value: 'file:saveAs',
      handler: (e: any, v: any) => console.log({ e, v }),
      hotkey: 'ctrl+shift+s',
    },

    // Group with both start and end dividers
    {
      type: 'group',
      id: 'settings-group',
      title: 'Settings & Preferences',
      divider: 'both',
      children: [
        {
          title: 'Settings',
          prependIcon: 'mdi-cog-outline',
          subtitle: 'Open settings',
          handler: (e: any, v: any) => console.log({ e, v }),
          value: 'pref:settings',
        },
        {
          title: 'Keyboard Shortcuts',
          prependIcon: 'mdi-keyboard-settings-outline',
          subtitle: 'Configure keyboard shortcuts',
          handler: (e: any, v: any) => console.log({ e, v }),
          value: 'pref:keys',
        },
        // Nested parent within group
        {
          type: 'parent',
          id: 'theme-parent',
          title: 'Theme',
          prependIcon: 'mdi-palette-outline',
          value: 'pref:theme',
          children: [
            {
              title: 'Dark Theme',
              prependIcon: 'mdi-weather-night',
              value: 'theme:dark',
              handler: (e: any, v: any) => theme.global.name.value = 'dark',
            },
            {
              title: 'Light Theme',
              prependIcon: 'mdi-weather-sunny',
              value: 'theme:light',
              handler: (e: any, v: any) => theme.global.name.value = 'light',
            },
          ],
        },
      ],
    },

    // Regular items
    {
      title: 'Find',
      prependIcon: 'mdi-magnify',
      subtitle: 'Find in the current file',
      value: 'find',
      handler: (e: any, v: any) => console.log({ e, v }),
      hotkey: 'ctrl-f',
    },

    // Group with end divider
    {
      type: 'group',
      id: 'search-group',
      title: 'Search Tools',
      divider: 'end',
      children: [
        {
          title: 'Find in Files',
          prependIcon: 'mdi-file-find-outline',
          subtitle: 'Find in the entire workspace',
          value: 'find:files',
          handler: (e: any, v: any) => console.log({ e, v }),
        },
        {
          title: 'Replace in Files',
          prependIcon: 'mdi-find-replace',
          subtitle: 'Replace text across files',
          value: 'replace:files',
          handler: (e: any, v: any) => console.log({ e, v }),
        },
      ],
    },

    // Final regular item
    {
      title: 'About',
      prependIcon: 'mdi-information',
      subtitle: 'About this application',
      value: 'about',
      handler: (e: any, v: any) => console.log({ e, v }),
    },
  ]

  function onItemClick (item: any) {
    // eslint-disable-next-line no-console
    console.log('Executed:', item)
  }

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>

<template>
  <VBtn @click="model = !model">
    Open
  </VBtn>
  <VCommandPalette
    v-model="model"
    :item-props="true"
    :items="items"
    hotkey="cmd+k"
    @click:item="onItemClick"
  >
    <template #append>
      <VBtn text="toggle theme" @click="toggleTheme" />
    </template>
  </VCommandPalette>
</template>

<style scoped lang="scss"></style>
