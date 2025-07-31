<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="(_, n) in 25"
        :key="n"
        cols="auto"
      >
        <v-card
          :class="['d-flex justify-center align-center bg-secondary', `elevation-${n}`]"
          height="100"
          width="100"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
