<template>
  <v-card>
    <v-layout>
      <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>

      <v-navigation-drawer color="surface">
        <v-list>
          <v-list-item title="Drawer left"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer color="surface" location="right">
        <v-list>
          <v-list-item title="Drawer right"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 300px;"></v-main>
    </v-layout>
  </v-card>
</template>
