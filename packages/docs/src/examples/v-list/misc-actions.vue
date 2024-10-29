<template>
  <v-card class="mx-auto" max-width="400">
    <v-toolbar color="purple">
      <v-btn icon="mdi-menu"></v-btn>
      <v-toolbar-title>Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify"></v-btn>
    </v-toolbar>

    <v-list lines="three">
      <v-list-subheader>User Controls</v-list-subheader>
      <v-list-item
        v-for="item in userControls"
        :key="item.value"
        :subtitle="item.subtitle"
        :title="item.title"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list
      v-model:selected="settingsSelection"
      lines="three"
      select-strategy="leaf"
    >
      <v-list-subheader>General</v-list-subheader>
      <v-list-item
        v-for="item in settingsItems"
        :key="item.value"
        :subtitle="item.subtitle"
        :title="item.title"
        :value="item.value"
      >
        <template v-slot:prepend="{ isSelected }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isSelected"></v-checkbox-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const userControls = [
    { title: 'Content filtering', subtitle: 'Set the content filtering level to restrict appts that can be downloaded' },
    { title: 'Password', subtitle: 'Require password for purchase or use password to restrict purchase' },
  ]

  const settingsItems = [
    { value: 'notifications', title: 'Notifications', subtitle: 'Notify me about updates to apps or games that I downloaded' },
    { value: 'sound', title: 'Sound', subtitle: 'Auto-update apps at any time. Data charges may apply' },
    { value: 'widgets', title: 'Auto-add widgets', subtitle: 'Automatically add home screen widgets when downloads complete' },
  ]

  const settingsSelection = ref([])
</script>

<script>
  export default {
    data: () => ({
      userControls: [
        { title: 'Content filtering', subtitle: 'Set the content filtering level to restrict appts that can be downloaded' },
        { title: 'Password', subtitle: 'Require password for purchase or use password to restrict purchase' },
      ],

      settingsItems: [
        { value: 'notifications', title: 'Notifications', subtitle: 'Notify me about updates to apps or games that I downloaded' },
        { value: 'sound', title: 'Sound', subtitle: 'Auto-update apps at any time. Data charges may apply' },
        { value: 'widgets', title: 'Auto-add widgets', subtitle: 'Automatically add home screen widgets when downloads complete' },
      ],

      settingsSelection: [],
    }),
  }
</script>
