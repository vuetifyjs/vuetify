<template>
  <v-container>
    <v-layout column>
      <main-header>Sheets</main-header>

      <h3 class="title grey--text mb-4 mt-5 center">
        Elevation
      </h3>
      <v-flex>
        <v-layout
          justify-space-around
          wrap
        >
          <v-flex
            v-for="elevation in 25"
            :key="elevation"
          >
            <v-sheet
              class="pa-5"
              color="grey lighten-3"
            >
              <v-sheet
                :elevation="elevation - 1"
                color="white darken-3"
                class="mx-auto"
                height="100"
                width="100"
              />
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Colors
      </h3>
      <v-flex>
        <v-layout
          justify-space-around
          wrap
        >
          <v-flex
            v-for="color in colors"
            :key="color"
          >
            <v-sheet
              class="pa-5"
              color="grey lighten-3"
            >
              <v-sheet
                :color="color"
                class="mx-auto"
                height="100"
                width="100"
              />
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Sizes
      </h3>
      <v-flex>
        <v-layout
          justify-space-around
          wrap
        >
          <v-sheet
            class="pa-5"
            color="grey lighten-3"
          >
            <v-sheet
              color="teal"
              class="mx-auto"
              height="100"
              width="100"
            />
          </v-sheet>
          <v-sheet
            class="pa-5"
            color="grey lighten-3"
          >
            <v-sheet
              color="teal"
              class="mx-auto"
              height="200"
              width="100"
            />
          </v-sheet>
          <v-sheet
            class="pa-5"
            color="grey lighten-3"
          >
            <v-sheet
              color="teal"
              class="mx-auto"
              height="100"
              width="200"
            />
          </v-sheet>
          <v-sheet
            class="pa-5"
            color="grey lighten-3"
          >
            <v-sheet
              color="teal"
              class="mx-auto"
              height="200"
              width="200"
            />
          </v-sheet>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Sheets',

    data: () => ({
      colors: [ 'red', 'teal', 'primary', 'error', 'warning', 'success', 'yellow darken-2', 'info' ]
    })
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
