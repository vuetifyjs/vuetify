<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex
        v-for="elevation in elevations"
        :key="elevation"
        xs12
        md4
      >
        <v-sheet
          class="pa-5"
          color="grey lighten-3"
        >
          <v-sheet
            :elevation="elevation"
            class="mx-auto"
            height="100"
            width="100"
          ></v-sheet>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      elevations: [6, 12, 18]
    })
  }
</script>
