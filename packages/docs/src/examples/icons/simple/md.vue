<template>
  <v-container fluid>
    <v-row justify="space-around" class="mb-2">
      <span class="group pa-2">
        <v-icon>home</v-icon>
        <v-icon>event</v-icon>
        <v-icon>info</v-icon>
      </span>

      <span class="group pa-2 teal">
        <v-icon dark>folder_open</v-icon>
        <v-icon dark>widgets</v-icon>
        <v-icon dark>gavel</v-icon>
      </span>
    </v-row>

    <v-row justify="space-around" class="mb-2">
      <span class="group pa-2">
        <v-icon medium>home</v-icon>
        <v-icon medium>event</v-icon>
        <v-icon medium>info</v-icon>
      </span>

      <span class="group pa-2 teal">
        <v-icon medium dark>folder_open</v-icon>
        <v-icon medium dark>widgets</v-icon>
        <v-icon medium dark>gavel</v-icon>
      </span>
    </v-row>

    <v-row justify="space-around" class="mb-2">
      <span class="group pa-2">
        <v-icon large>home</v-icon>
        <v-icon large>event</v-icon>
        <v-icon large>info</v-icon>
      </span>

      <span class="group pa-2 teal">
        <v-icon large dark>folder_open</v-icon>
        <v-icon large dark>widgets</v-icon>
        <v-icon large dark>gavel</v-icon>
      </span>
    </v-row>

    <v-row justify="space-around">
      <span class="group pa-2">
        <v-icon x-large>home</v-icon>
        <v-icon x-large>event</v-icon>
        <v-icon x-large>info</v-icon>
      </span>

      <span class="group pa-2 teal">
        <v-icon x-large dark>folder_open</v-icon>
        <v-icon x-large dark>widgets</v-icon>
        <v-icon x-large dark>gavel</v-icon>
      </span>
    </v-row>
  </v-container>
</template>

<style>
.group {
  display: flex;
  flex: 1;
  justify-content: space-around;
}
</style>
