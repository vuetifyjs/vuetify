<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>

    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Drawer left" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer location="right">
      <v-list nav>
        <v-list-item title="Drawer right" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-sheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
        ></v-sheet>
      </v-container>
    </v-main>
  </v-layout>
</template>
