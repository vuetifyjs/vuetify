<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-breadcrumbs
      :items="items"
      v-bind="$attrs"
      v-on="$listeners"
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
          text: 'Dashboard',
          disabled: false,
          href: 'breadcrumbs_dashboard',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
      defaults: {
        large: false,
        customDivider: false,
        divider: undefined,
      },
      options: {
        booleans: ['customDivider'],
        selects: {
          divider: ['/', '\\', '.', ';', '>', '-'],
        },
      },
      tabs: ['large'],
    }),

  }
</script>
