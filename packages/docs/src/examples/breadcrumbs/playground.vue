<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-select v-model="divider" :items="dividers" label="Divider"></v-select>
      </v-col>
      <v-switch v-model="large" label="Large"></v-switch>
      <v-switch v-model="customDiv" label="Custom divider"></v-switch>
    </v-row>

    <v-breadcrumbs :items="items" :large="large" :divider="divider">
      <template v-if="customDiv" v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
  export default {
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
      divider: '/',
      dividers: ['/', '\\', '.', ';', '>', '-'],
      large: false,
      customDiv: false,
    }),
  }
</script>
