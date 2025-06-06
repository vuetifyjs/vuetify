<script setup lang="ts">
  import { VBtn } from '@/components/VBtn'
  import { VCommandPalette } from '../src/labs/VCommandPalette'
  import { ref } from 'vue'

  const model = ref(true)

  const items = [
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
          hotkey: 'ctrl+alt+n',
        },
        {
          title: 'File',
          prependIcon: 'mdi-file-plus-outline',
          subtitle: 'Create a new file',
          value: 'new:file',
        },
        {
          title: 'User',
          prependIcon: 'mdi-account-plus-outline',
          subtitle: 'Create a new user',
          value: 'new:user',
        },
      ],
    },
    {
      title: 'Git',
      value: 'git',
      prependIcon: 'mdi-git',
      children: [
        {
          title: 'Commit',
          prependIcon: 'mdi-source-commit',
          subtitle: 'Commit changes',
          value: 'git:commit',
          hotkey: 'ctrl+k',
        },
        {
          title: 'Push',
          prependIcon: 'mdi-source-pull',
          subtitle: 'Push changes',
          value: 'git:push',
          hotkey: 'ctrl+shift+k',
        },
        {
          title: 'Fetch',
          prependIcon: 'mdi-source-branch',
          subtitle: 'Fetch changes',
          value: 'git:fetch',
        },
      ],
    },
    {
      title: 'File: Save',
      prependIcon: 'mdi-content-save',
      subtitle: 'Save the current file',
      value: 'file:save',
      hotkey: 'ctrl+s',
    },
    {
      title: 'File: Save As...',
      prependIcon: 'mdi-content-save-outline',
      subtitle: 'Save the current file as...',
      value: 'file:saveAs',
      hotkey: 'ctrl+shift+s',
    },
    {
      title: 'Preferences',
      value: 'preferences',
      prependIcon: 'mdi-cog',
      children: [
        {
          title: 'Settings',
          prependIcon: 'mdi-cog-outline',
          subtitle: 'Open settings',
          value: 'pref:settings',
        },
        {
          title: 'Keyboard Shortcuts',
          prependIcon: 'mdi-keyboard-settings-outline',
          subtitle: 'Configure keyboard shortcuts',
          value: 'pref:keys',
        },
        {
          title: 'Theme',
          prependIcon: 'mdi-palette-outline',
          value: 'pref:theme',
          children: [
            {
              title: 'Dark Theme',
              prependIcon: 'mdi-weather-night',
              value: 'theme:dark',
            },
            {
              title: 'Light Theme',
              prependIcon: 'mdi-weather-sunny',
              value: 'theme:light',
            },
          ],
        },
      ],
    },
    {
      title: 'Find',
      prependIcon: 'mdi-magnify',
      subtitle: 'Find in the current file',
      value: 'find',
      hotkey: 'ctrl-f',
    },
    {
      title: 'Find in Files',
      prependIcon: 'mdi-file-find-outline',
      subtitle: 'Find in the entire workspace',
      value: 'find:files',
    },
  ]

  function onItemClick (item: any) {
    // eslint-disable-next-line no-console
    console.log('Executed:', item)
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
  />
</template>

<style scoped lang="scss"></style>
