<template>
  <v-card class="hide-overflow">
    <v-app-bar
      absolute
      scroll-target="#playground-example"
      :color="color"
      :elevate-on-scroll="elevateOnScroll"
      :hide-on-scroll="hideOnScroll"
      :fade-on-scroll="fadeOnScroll"
      :fade-img-on-scroll="fadeImgOnScroll"
      :inverted-scroll="invertedScroll"
      :collapse="collapse"
      :collapse-on-scroll="collapseOnScroll"
      :shrink-on-scroll="shrinkOnScroll"
      :extended="extended"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

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
      id="playground-example"
      class="scroll-y"
      max-height="600"
    >
      <v-container style="height: 1500px;">
        <v-layout row wrap justify-space-around style="margin-top: 300px;">
          <v-select
            v-model="color"
            label="Color"
            :items="colors"
          ></v-select>
          <v-switch v-model="elevateOnScroll" label="Elevate-on-scroll"></v-switch>
          <v-switch v-model="hideOnScroll" label="Hide-on-scroll"></v-switch>
          <v-switch v-model="fadeOnScroll" label="Fade-on-scroll"></v-switch>
          <v-switch v-model="fadeImgOnScroll" label="Fade-img-on-scroll"></v-switch>
          <v-switch v-model="invertedScroll" label="Inverted scroll"></v-switch>
          <v-switch v-model="collapse" label="Collapse"></v-switch>
          <v-switch v-model="collapseOnScroll" label="Collapse-on-scroll"></v-switch>
          <v-switch v-model="shrinkOnScroll" label="Shrink-on-scroll"></v-switch>
          <v-switch v-model="extended" label="Extended"></v-switch>
        </v-layout>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      elevateOnScroll: false,
      hideOnScroll: false,
      fadeOnScroll: false,
      fadeImgOnScroll: false,
      invertedScroll: false,
      collapse: false,
      collapseOnScroll: false,
      shrinkOnScroll: false,
      extended: false,
      color: 'accent',
      colors: [ 'primary', 'accent', 'warning lighten-2', 'teal', 'orange' ]
    })
  }
</script>
