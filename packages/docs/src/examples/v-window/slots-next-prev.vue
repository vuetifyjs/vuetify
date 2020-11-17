<template>
  <v-window show-arrows>
    <template v-slot:prev="{ on, attrs }">
      <v-btn
        color="success"
        v-bind="attrs"
        v-on="on"
      >Previous slide</v-btn>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn
        color="info"
        v-bind="attrs"
        v-on="on"
      >Next slide</v-btn>
    </template>
    <v-window-item
      v-for="n in 5"
      :key="`card-${n}`"
    >
      <v-card
        color="grey"
        height="200"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <h1
            style="font-size: 5rem;"
            class="white--text"
          >
            Slide {{ n }}
          </h1>
        </v-row>
      </v-card>
    </v-window-item>
  </v-window>
</template>
