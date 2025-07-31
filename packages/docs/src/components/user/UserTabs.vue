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
        text: 'My Dashboard',
        to: rpath('/user/dashboard/'),
      },
    ]
  })
</script>
