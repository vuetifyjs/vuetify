<template>
  <v-container class="d-flex">
    <div class="d-flex flex-column gr-4 py-8 flex-grow-1">
      <v-divider color="red" opacity=".7" thickness="3" gradient></v-divider>
      <v-divider opacity=".7" thickness="3" gradient>OR</v-divider>
      <v-divider
        color="primary"
        opacity=".7"
        thickness="12"
        variant="double"
        gradient
      >
        AND
      </v-divider>
    </div>
    <div class="d-flex gc-8 px-8">
      <v-divider color="red" opacity=".7" thickness="3" gradient vertical></v-divider>
      <v-divider opacity=".7" thickness="3" gradient vertical>OR</v-divider>
      <v-divider
        color="primary"
        opacity=".7"
        thickness="12"
        variant="double"
        gradient
        vertical
      >
        AND
      </v-divider>
    </div>
  </v-container>
</template>
