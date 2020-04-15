<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <div
          v-color="'grey lighten-2'"
          v-color:border.top.right="'primary'"
          v-color:border.left.bottom="'#ff0000'"
          class="elem pa-6 text-center"
        >
          Element
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
