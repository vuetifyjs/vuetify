<template>
  <v-container class="grey lighten-5">
    <v-row
      v-for="j in justify"
      :key="j"
      :justify="j"
    >
      <v-col
        v-for="k in 2"
        :key="k"
        md="4"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          One of two columns
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      justify: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ],
    }),
  }
</script>
