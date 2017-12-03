<template>
  <div>
    <v-alert success v-bind:value="true">
      This is a success alert.
    </v-alert>

    <v-alert info v-bind:value="true">
      This is a info alert.
    </v-alert>

    <v-alert warning v-bind:value="true">
      This is a warning alert.
    </v-alert>

    <v-alert error v-bind:value="true">
      This is a error alert.
    </v-alert>
  </div>
</template>