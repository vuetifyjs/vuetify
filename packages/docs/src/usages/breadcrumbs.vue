<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-breadcrumbs :items="items" v-bind="attrs">
        <template v-if="attrs.customDivider" v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
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
    }),
  }
</script>
