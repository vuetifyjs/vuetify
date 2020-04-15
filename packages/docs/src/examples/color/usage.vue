<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="3">
        <div
          v-color:text="'primary'"
          class="elem pa-6 text-center grey lighten-2"
        >
          Text
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div
          v-color="'primary'"
          class="elem pa-6 text-center white--text"
        >
          Background
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div
          v-color="'grey lighten-2'"
          v-color:border="'primary'"
          class="elem pa-6 text-center black--text"
        >
          Border
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div
          v-color:gradient="'to top, blue, blue darken-3'"
          class="elem pa-6 text-center white--text"
        >
          Gradient
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.elem {
  border: solid 2px white;
}
</style>
