<template>
  <v-row class="ma-2" gap="12">
    <v-col :cols="horizontal ? 12 : 'auto'" :order="horizontal ? 1 : 0">
      <v-sheet
        :class="['py-4', { 'd-flex': horizontal }]"
        :width="horizontal ? undefined : stacked ? 96 : 220"
        rounded="lg"
        border
      >
        <v-navigation-btn
          v-for="item in items"
          :key="item.value"
          :active="active === item.value"
          :active-icon="item.activeIcon"
          :badge="item.badge"
          :class="{ 'flex-1-1-0 mt-0': horizontal }"
          :icon="item.icon"
          :stacked="stacked"
          :text="item.text"
          @click="active = item.value"
        ></v-navigation-btn>
      </v-sheet>
    </v-col>

    <v-col :cols="horizontal ? 12 : undefined">
      <v-sheet class="d-flex flex-column align-center justify-center h-100 py-4" rounded="lg" border>
        <v-switch
          v-model="stacked"
          class="flex-grow-0"
          color="primary"
          density="compact"
          inset="material"
          label="Stacked"
          width="150"
          hide-details
        ></v-switch>
        <v-switch
          v-model="horizontal"
          class="flex-grow-0"
          color="primary"
          density="compact"
          inset="material"
          label="Horizontal"
          width="150"
          hide-details
        ></v-switch>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const active = shallowRef('chat')
  const stacked = shallowRef(true)
  const horizontal = shallowRef(false)
  const items = [
    {
      value: 'mail',
      text: 'Mail',
      icon: 'mdi-email-outline',
      activeIcon: 'mdi-email',
      badge: true,
    },
    {
      value: 'spaces',
      text: 'Spaces',
      icon: 'mdi-account-group-outline',
      activeIcon: 'mdi-account-group',
      badge: 3,
    },
    {
      value: 'chat',
      text: 'Chat',
      icon: 'mdi-message-outline',
      activeIcon: 'mdi-message',
      badge: {
        content: 1200,
        max: 999,
        color: 'primary',
      },
    },
    {
      value: 'meet',
      text: 'Meet',
      icon: 'mdi-video-outline',
      activeIcon: 'mdi-video',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      active: 'chat',
      stacked: true,
      horizontal: false,
      items: [
        { value: 'chat', text: 'Chat', icon: 'mdi-message-outline', activeIcon: 'mdi-message', badge: true },
        { value: 'spaces', text: 'Spaces', icon: 'mdi-account-group-outline', activeIcon: 'mdi-account-group', badge: 3 },
        { value: 'mail', text: 'Mail', icon: 'mdi-email-outline', activeIcon: 'mdi-email', badge: { content: 1200, max: 999, color: 'primary' } },
        { value: 'meet', text: 'Meet', icon: 'mdi-video-outline', activeIcon: 'mdi-video' },
      ],
    }),
  }
</script>
