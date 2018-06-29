<template>
  <v-layout align-center>
    <v-flex xs12 sm4 text-xs-center>
      <div>
        <v-btn depressed small>Normal</v-btn>
      </div>
      <div>
        <v-btn depressed small color="primary">Primary</v-btn>
      </div>
      <div>
        <v-btn depressed small color="error">Error</v-btn>
      </div>
      <div>
        <v-btn depressed small disabled>Disabled</v-btn>
      </div>
    </v-flex>

    <v-flex xs12 sm4 text-xs-center>
      <div>
        <v-btn depressed>Normal</v-btn>
      </div>
      <div>
        <v-btn depressed color="primary">Primary</v-btn>
      </div>
      <div>
        <v-btn depressed color="error">Error</v-btn>
      </div>
      <div>
        <v-btn depressed disabled>Disabled</v-btn>
      </div>
    </v-flex>

    <v-flex xs12 sm4 text-xs-center>
      <div>
        <v-btn depressed large>Normal</v-btn>
      </div>
      <div>
        <v-btn depressed large color="primary">Primary</v-btn>
      </div>
      <div>
        <v-btn depressed large color="error">Error</v-btn>
      </div>
      <div>
        <v-btn depressed large disabled>Disabled</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>
