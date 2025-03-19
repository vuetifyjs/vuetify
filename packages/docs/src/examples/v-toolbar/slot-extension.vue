<template>
  <v-card height="200">
    <v-toolbar extended>
      <v-toolbar-title text="Toolbar"></v-toolbar-title>

      <template v-slot:extension>
        <v-tabs>
          <v-tab text="Tab 1"></v-tab>
          <v-tab text="Tab 2"></v-tab>
          <v-tab text="Tab 3"></v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>
