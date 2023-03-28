<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-btn class="my-4" block @click="color = null">null</v-btn>
        <v-btn class="my-4" block @click="color = '#ff00ff'">hex</v-btn>
        <v-btn class="my-4" block @click="color = '#ff00ffff'">hexa</v-btn>
        <v-btn class="my-4" block @click="color = { r: 255, g: 0, b: 255, a: 1 }">rgba</v-btn>
        <v-btn class="my-4" block @click="color = { h: 300, s: 1, l: 0.5, a: 1 }">hsla</v-btn>
        <v-btn class="my-4" block @click="color = { h: 300, s: 1, v: 1, a: 1 }">hsva</v-btn>
      </v-col>
      <v-col
        class="d-flex justify-center"
      >
        <v-color-picker v-model="color"></v-color-picker>
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-sheet
          class="pa-4"
        >
          <pre>{{ color }}</pre>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      color: null,
    }),
  }
</script>
