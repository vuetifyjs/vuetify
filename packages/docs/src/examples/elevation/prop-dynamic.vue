<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="(_, n) in 6"
        :key="n"
        cols="auto"
      >
        <v-card
          :elevation="0"
          :hover-elevation="n"
          border="thin dashed"
          class="d-flex justify-center align-center"
          height="70"
          rounded="xl"
          width="100"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="(_, n) in 6"
        :key="n"
        cols="auto"
      >
        <div
          :class="`bg-surface elevation-0 hover-elevation-${n}`"
          class="d-flex justify-center align-center rounded-xl border-thin border-dashed"
          style="height: 70px; width: 100px"
        >
          <div>{{ n }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
