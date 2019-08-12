<template>
  <v-container class="grey lighten-5">
    <v-row no-gutters>
      <template v-for="n in 4">
        <v-col :key="n">
          <v-card
            class="pa-2"
            outlined
            tile
          >
            Column
          </v-card>
        </v-col>
        <div
          v-if="n === 2"
          :key="`divider-${n}`"
          style="width: 100%;"
        ></div>
      </template>
    </v-row>
  </v-container>
</template>
