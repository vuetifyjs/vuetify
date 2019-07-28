<template>
  <v-container>
    <v-layout column>
      <main-header>Sheets</main-header>

      <core-title>
        Elevation
      </core-title>
      <core-section>
        <v-layout
          justify-space-around
          wrap
        >
          <v-flex
            v-for="elevation in 25"
            :key="elevation"
          >
            <v-sheet
              class="pa-12"
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
      </core-section>

      <core-title>
        Colors
      </core-title>
      <core-section>
        <v-layout
          justify-space-around
          wrap
        >
          <v-flex
            v-for="color in colors"
            :key="color"
          >
            <v-sheet
              class="pa-12"
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
      </core-section>

      <core-title>
        Sizes
      </core-title>
      <core-section>
        <v-layout
          justify-space-around
          wrap
        >
          <v-sheet
            class="pa-12"
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
            class="pa-12"
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
            class="pa-12"
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
            class="pa-12"
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
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Sheets',

    data: () => ({
      colors: ['red', 'teal', 'primary', 'error', 'warning', 'success', 'yellow darken-2', 'info'],
    }),
  }
</script>
