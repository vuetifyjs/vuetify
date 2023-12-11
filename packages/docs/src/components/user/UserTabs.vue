<template>
  <v-defaults-provider
    :defaults="{
      VTab: {
        class: 'text-none text-body-2 font-weight-regular',
        color: 'medium-emphasis'
      }
    }"
  >
    <v-tabs color="primary">
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        v-bind="tab"
      />
    </v-tabs>
  </v-defaults-provider>
</template>

<script setup>
  // Utilities
  import { rpath } from '@/util/routes'

  const tabs = [
    {
      prependIcon: 'mdi-view-dashboard-outline',
      text: 'Dashboard',
      to: rpath('/user/dashboard/'),
    },
    {
      prependIcon: 'mdi-cog-outline',
      text: 'Options',
      to: rpath('/user/options/'),
    },
  ]
</script>
