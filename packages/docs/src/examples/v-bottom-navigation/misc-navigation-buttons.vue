<template>
  <div>
    <v-btn-toggle
      v-model="mode"
      class="mb-4"
      density="compact"
      variant="outlined"
      mandatory
    >
      <v-btn text="Vertical" value="vertical"></v-btn>
      <v-btn text="Horizontal" value="horizontal"></v-btn>
      <v-btn text="Shift" value="shift"></v-btn>
    </v-btn-toggle>

    <v-layout style="height: 64px">
      <v-bottom-navigation
        v-model="active"
        :mode="mode === 'vertical' ? undefined : mode"
        height="64"
        mandatory
      >
        <v-navigation-btn
          v-for="item in items"
          :key="item.value"
          :active-icon="item.activeIcon"
          :icon="item.icon"
          :text="item.text"
          :value="item.value"
        ></v-navigation-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const mode = shallowRef('vertical')
  const active = shallowRef('inbox')
  const items = [
    { value: 'inbox', text: 'Inbox', icon: 'mdi-inbox-outline', activeIcon: 'mdi-inbox' },
    { value: 'starred', text: 'Starred', icon: 'mdi-star-outline', activeIcon: 'mdi-star' },
    { value: 'zones', text: 'Zones', icon: 'mdi-clock-outline', activeIcon: 'mdi-clock' },
    { value: 'sent', text: 'Sent', icon: 'mdi-send-outline', activeIcon: 'mdi-send' },
  ]
</script>

<script>
  export default {
    data: () => ({
      mode: 'vertical',
      active: 'inbox',
      items: [
        { value: 'inbox', text: 'Inbox', icon: 'mdi-inbox-outline', activeIcon: 'mdi-inbox' },
        { value: 'starred', text: 'Starred', icon: 'mdi-star-outline', activeIcon: 'mdi-star' },
        { value: 'zones', text: 'Zones', icon: 'mdi-clock-outline', activeIcon: 'mdi-clock' },
        { value: 'sent', text: 'Sent', icon: 'mdi-send-outline', activeIcon: 'mdi-send' },
      ],
    }),
  }
</script>
