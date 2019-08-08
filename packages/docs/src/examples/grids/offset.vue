<template>
  <v-container class="text-center">
    <v-row>
      <v-col
        cols="10"
        offset="1"
      >
        <v-card
          dark
          color="purple"
        >
          <v-card-text>cols-10 offset-1</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="7"
        offset="5"
        offset-md="2"
        offset-lg="5"
      >
        <v-card
          dark
          color="secondary"
        >
          <v-card-text>cols-7 offset-(5 | md2 | lg5)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="3"
      >
        <v-card
          dark
          color="primary"
        >
          <v-card-text>cols-(12 | sm5 | md3)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="5"
        md="5"
        offset-lg="2"
      >
        <v-card
          dark
          color="green"
        >
          <v-card-text>cols-(12 | sm5 | md5) offset-(lg2)</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
