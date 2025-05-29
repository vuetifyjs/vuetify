<template>
  <v-card rounded="lg" border flat>
    <v-toolbar
      color="primary"
      extended
      flat
    >
      <template v-slot:prepend>
        <v-btn icon="mdi-menu"></v-btn>
      </template>
    </v-toolbar>

    <v-card
      class="mx-auto mt-n16 mb-4"
      elevation="4"
      height="200"
      max-width="600"
    >
      <v-toolbar>
        <v-toolbar-title text="Title"></v-toolbar-title>

        <template v-slot:append>
          <div class="d-flex ga-1">
            <v-btn icon="mdi-magnify">
            </v-btn>

            <v-btn icon="mdi-apps">
            </v-btn>

            <v-btn icon="mdi-dots-vertical">
            </v-btn>
          </div>
        </template>
      </v-toolbar>

      <v-divider></v-divider>
    </v-card>

    <v-footer class="justify-center text-caption" color="surface-variant">
      {{ new Date().getFullYear() }} — <strong>Vuetify, LLC</strong>
    </v-footer>
  </v-card>
</template>
