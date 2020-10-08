<template>
  <v-row dense class="mb-12">
    <v-col
      v-for="(item, i) in items"
      :key="i"
      cols="12"
      md="6"
      xl="4"
      class="d-flex"
    >
      <app-sheet class="grow">
        <v-list-item :to="item.to">
          <v-list-item-icon>
            <v-icon
              color="primary"
              large
              v-text="item.icon"
            />
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              class="font-weight-bold"
              v-text="item.title"
            />

            <v-list-item-subtitle
              v-text="item.subtitle"
            />
          </v-list-item-content>
        </v-list-item>
      </app-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'BgOverview',

    data: () => ({
      items: [
        {
          icon: 'mdi-speedometer',
          title: 'Installation',
          subtitle: 'Install Vuetify.',
          to: {
            name: 'Documentation',
            params: {
              category: 'getting-started',
              page: 'installation',
            },
          },
        },
        {
          icon: 'mdi-image-edit-outline',
          title: 'Customization',
          subtitle: 'Configuring your App.',
        },
        {
          icon: 'mdi-palette-outline',
          title: 'Styling',
          subtitle: 'Styling Vuetify.',
        },
        {
          icon: 'mdi-teach',
          title: 'Resources',
          subtitle: 'Available tooling and more.',
        },
        {
          icon: 'mdi-bullhorn-outline',
          title: `What's new`,
          subtitle: 'Browse latest releases.',
        },
        {
          icon: 'mdi-console',
          title: 'Support',
          subtitle: 'Professional services.',
        },
      ],
    }),
  }
</script>
