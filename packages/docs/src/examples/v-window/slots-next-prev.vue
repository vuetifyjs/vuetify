<template>
  <v-window show-arrows>
    <template v-slot:prev="{ props }">
      <v-btn
        color="success"
        @click="props.onClick"
      >
        Previous slide
      </v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        color="info"
        @click="props.onClick"
      >
        Next slide
      </v-btn>
    </template>
    <v-window-item
      v-for="n in 3"
      :key="`card-${n}`"
    >
      <v-card
        elevation="2"
        height="200"
        class="d-flex align-center justify-center ma-2"
      >
        <h1
          class="text-h2"
        >
          Slide {{ n }}
        </h1>
      </v-card>
    </v-window-item>
  </v-window>
</template>
