<template>
  <v-app toolbar--fixed toolbar style="overflow: hidden">
    <v-toolbar
      absolute
      class="white teal lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <main
      style="max-height: 600px;"
      class="scroll-y"
      id="scrolling-techniques"
    >
      <v-container></v-container>
    </main>
  </v-app>
</template>
