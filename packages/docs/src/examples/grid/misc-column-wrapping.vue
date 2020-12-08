<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <v-col cols="9">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          .col-9
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          .col-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          .col-6<br>Subsequent columns continue along the new line.
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
