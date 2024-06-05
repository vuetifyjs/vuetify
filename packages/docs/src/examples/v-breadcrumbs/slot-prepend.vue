<template>
  <v-breadcrumbs :items="items">
    <template v-slot:prepend>
      <v-icon icon="$vuetify" size="small"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
  const items = [
    {
      title: 'Dashboard',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    {
      title: 'Link 1',
      disabled: false,
      href: 'breadcrumbs_link_1',
    },
    {
      title: 'Link 2',
      disabled: true,
      href: 'breadcrumbs_link_2',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          title: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          title: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          title: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }),
  }
</script>
