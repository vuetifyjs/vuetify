<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        elevation="4"
        floating
        permanent
      >
        <v-list>
          <v-list-item title="Floating navigation drawer"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar title="Application bar" border="b" flat></v-app-bar>

      <v-main style="min-height: 300px;"></v-main>
    </v-layout>
  </v-card>
</template>
