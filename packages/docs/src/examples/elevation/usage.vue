<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="(_, n) in 25"
        :key="n"
        cols="auto"
      >
        <v-card
          height="100"
          width="100"
          :class="['d-flex justify-center align-center bg-secondary', `elevation-${n}`]"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
