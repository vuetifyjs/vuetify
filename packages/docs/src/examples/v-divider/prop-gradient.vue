<template>
  <v-container class="d-flex">
    <div class="d-flex flex-column gr-4 py-8 flex-grow-1">
      <v-divider class="my-3" color="red" style="height: 300px;" thickness="3" gradient></v-divider>
      <v-divider thickness="3" gradient>OR</v-divider>
      <v-divider
        color="primary"
        style="border-style: double"
        thickness="12"
        gradient
      >
        AND
      </v-divider>
    </div>
    <div class="d-flex gc-8 px-8">
      <v-divider color="red" thickness="3" gradient vertical></v-divider>
      <v-divider thickness="3" gradient vertical>OR</v-divider>
      <v-divider
        color="primary"
        style="border-style: double"
        thickness="12"
        gradient
        vertical
      >
        AND
      </v-divider>
    </div>
  </v-container>
</template>
