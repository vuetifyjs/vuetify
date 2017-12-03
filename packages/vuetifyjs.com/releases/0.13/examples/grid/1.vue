<template>
  <div id="example-1">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark class="primary">
          <v-card-text>12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 v-for="i in 2" :key="i">
        <v-card dark class="secondary">
          <v-card-text>6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="i in 3" :key="i">
        <v-card dark class="primary">
          <v-card-text>4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="i">
        <v-card dark class="secondary">
          <v-card-text>3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="i in 6" :key="i">
        <v-card dark class="primary">
          <v-card-text>2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-for="i in 12" :key="i">
        <v-card dark class="secondary">
          <v-card-text>1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style>
  #example-1 {
    color: #fff;
    text-align: center;
  }

  #example-1 .flex {
    margin-bottom: 16px;
  }
</style>
