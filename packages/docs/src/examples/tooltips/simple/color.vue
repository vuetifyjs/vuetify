<template>
  <div class="text-xs-center">
    <v-tooltip top color="primary">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          color="primary"
          dark
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>primary tooltip</span>
    </v-tooltip>

    <v-tooltip top color="red">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          dark
          color="red"
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>red tooltip</span>
    </v-tooltip>

    <v-tooltip top color="purple">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          dark
          color="purple"
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>purple tooltip</span>
    </v-tooltip>

    <v-tooltip top color="#FFA500">
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          dark
          color="#FFA500"
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>orange(#FFA500) tooltip</span>
    </v-tooltip>
  </div>
</template>
