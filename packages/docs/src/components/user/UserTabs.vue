<template>
  <v-tabs color="primary">
    <v-tab
      v-for="(tab, i) in tabs"
      :key="i"
      class="text-none text-body-2 font-weight-regular"
      v-bind="tab"
    />
  </v-tabs>
</template>

<script setup>
  const tabs = computed(() => {
    return [
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
      {
        prependIcon: '$vuetify',
        text: 'Subscriptions',
        to: rpath('/user/subscriptions/'),
      },
    ]
  })
</script>
