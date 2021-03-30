<template>
  <div class="d-flex justify-space-around align-center flex-column flex-md-row fill-height">
    <v-btn
      color="primary"
    >
      Normal Button
    </v-btn>

    <v-btn
      rounded="lg"
      color="primary"
    >
      Rounded Button
    </v-btn>

    <v-btn
      :rounded="0"
      color="primary"
    >
      Tile Button
    </v-btn>

    <v-btn
      rounded="pill"
      color="primary"
    >
      Pill Button
    </v-btn>
  </div>
</template>
