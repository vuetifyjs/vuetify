<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar color="secondary">
      <v-btn icon="mdi-menu" variant="text"></v-btn>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon="mdi-magnify" variant="text"></v-btn>

      <v-btn icon="mdi-view-module" variant="text"></v-btn>
    </v-toolbar>

    <v-list lines="two">
      <v-list-subheader inset>Folders</v-list-subheader>

      <v-list-item
        v-for="folder in folders"
        :key="folder.title"
        :subtitle="folder.subtitle"
        :title="folder.title"
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon color="white">mdi-folder</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-subheader inset>Files</v-list-subheader>

      <v-list-item
        v-for="file in files"
        :key="file.title"
        :subtitle="file.subtitle"
        :title="file.title"
      >
        <template v-slot:prepend>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  const files = [
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
  ]
  const folders = [
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
  ]
</script>

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
