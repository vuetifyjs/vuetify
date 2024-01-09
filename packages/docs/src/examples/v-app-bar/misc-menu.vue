<template>
  <v-layout>
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:image>
        <v-img gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            color="yellow"
            v-bind="props"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Click Me 1</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Click Me 2</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Click Me 3</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Click Me 4</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs align-tabs="title">
          <v-tab>Tab 1</v-tab>

          <v-tab>Tab 2</v-tab>

          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-4"
      class="overflow-y-auto"
      max-height="600"
      width="100%"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-layout>
</template>
