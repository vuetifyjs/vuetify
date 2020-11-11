<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="n in 25"
        :key="n"
        cols="auto"
      >
        <v-card
          :elevation="n - 1"
          height="100"
          width="100"
          class="secondary"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
            v-text="n - 1"
          ></v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
