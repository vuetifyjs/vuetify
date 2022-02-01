<template>
  <v-card
    max-width="600"
    class="mx-auto"
  >
    <v-toolbar
      color="light-blue"
      dark
    >
      <v-app-bar-nav-icon variant="text"></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>

      <v-btn variant="text" icon="mdi-view-module"></v-btn>
    </v-toolbar>

    <v-list two-line>
      <v-list-subheader inset>Folders</v-list-subheader>

      <v-list-item
        v-for="folder in folders"
        :key="folder.title"
        prepend-icon="mdi-folder"
        :title="folder.title"
        :subtitle="folder.subtitle"
      >
        <template v-slot:append>
          <v-list-item-avatar right>
            <v-btn variant="text" color="grey lighten-1" icon="mdi-information"></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-subheader inset>Files</v-list-subheader>

      <v-list-item
        v-for="file in files"
        :key="file.title"
        :prepend-icon="file.icon"
        :title="file.title"
        :subtitle="file.subtitle"
      >
        <template v-slot:append>
          <v-list-item-avatar right>
            <v-btn variant="text" color="grey lighten-1" icon="mdi-information"></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      files: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ],
      folders: [
        {
          subtitle: 'Jan 9, 2014',
          title: 'Photos',
        },
        {
          subtitle: 'Jan 17, 2014',
          title: 'Recipes',
        },
        {
          subtitle: 'Jan 28, 2014',
          title: 'Work',
        },
      ],
    }),
  }
</script>
