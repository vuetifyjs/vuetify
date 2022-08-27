<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-breadcrumbs
      :items="items"
      v-bind="$attrs"
    ></v-breadcrumbs>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

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
      defaults: {
        large: false,
        divider: undefined,
      },
      options: {
        selects: {
          divider: ['/', '\\', '.', ';', '>', '-'],
        },
      },
      tabs: ['large'],
    }),

  }
</script>
