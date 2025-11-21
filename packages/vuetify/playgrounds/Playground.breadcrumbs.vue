<template>
  <v-app>
    <v-container>
      <v-breadcrumbs :items="items" :total-visible="3" />
      <v-breadcrumbs :items="items" :total-visible="3" collapse-in-menu />
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    data: () => ({
      items: Array.from({ length: 4 }, (k, v) => ({ title: `Link ${v + 1}`, href: `breadcrumbs_link_${v + 1}` })),
    }),
  }
</script>
