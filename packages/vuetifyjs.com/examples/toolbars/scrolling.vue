<template>
  <div style="position: relative; overflow: hidden;">
    <v-toolbar
      absolute
      color="teal lighten-3"
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
    <div
      id="scrolling-techniques"
      style="max-height: 600px;"
      class="scroll-y"
    >
      <v-container style="height: 1000px;"></v-container>
    </div>
  </div>
</template>
