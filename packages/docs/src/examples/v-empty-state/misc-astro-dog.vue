<template>
  <v-card class="mx-auto" max-width="360">
    <v-layout>
      <v-system-bar class="ga-1" color="#4c00d5">
        <v-icon icon="mdi-square" size="x-small"></v-icon>

        <v-icon icon="mdi-circle" size="x-small"></v-icon>

        <v-icon icon="mdi-triangle" size="x-small"></v-icon>
      </v-system-bar>

      <v-app-bar color="#6200ee" title="Drafts">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-empty-state
          image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
          size="200"
          text-width="250"
        >
          <template v-slot:media>
            <v-img class="mb-8"></v-img>
          </template>

          <template v-slot:title>
            <div class="text-h6 text-high-emphasis">Empty in drafts</div>
          </template>

          <template v-slot:text>
            <div class="text-body-1">Save a draft message and it will show up here</div>
          </template>
        </v-empty-state>
      </v-main>

      <v-layout-item
        class="text-end"
        position="bottom"
        size="80"
        model-value
      >
        <v-btn
          class="ma-4"
          color="#4c00d5"
          elevation="8"
          icon="mdi-plus"
        ></v-btn>
      </v-layout-item>
    </v-layout>
  </v-card>
</template>
