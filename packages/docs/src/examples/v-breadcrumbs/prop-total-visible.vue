<template>
  <v-breadcrumbs :items="items" :total-visible="4">
  </v-breadcrumbs>
  <v-breadcrumbs :items="items" :total-visible="3" collapse-in-menu>
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
      disabled: false,
      href: 'breadcrumbs_link_2',
    },
    {
      title: 'Link 3',
      disabled: false,
      href: 'breadcrumbs_link_3',
    },
    {
      title: 'Link 4',
      disabled: true,
      href: 'breadcrumbs_link_4',
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
          disabled: false,
          href: 'breadcrumbs_link_2',
        },
        {
          title: 'Link 3',
          disabled: false,
          href: 'breadcrumbs_link_3',
        },
        {
          title: 'Link 4',
          disabled: true,
          href: 'breadcrumbs_link_4',
        },
      ],
    }),
  }
</script>
