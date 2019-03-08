<template>
  <v-card class="hide-overflow">
    <v-app-bar
      absolute
      color="teal lighten-3"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      :img-props="{ gradient: 'to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)' }"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      scroll-threshold="500"
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
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-5"
      class="scroll-y"
      max-height="600"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
  </v-card>
</template>
