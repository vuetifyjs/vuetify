<template>
  <div class="text-xs-center">
    <v-tooltip nudge-bottom="100">
      <template v-slot:activator="{ on }">
        <v-btn class="mx-2" color="info" dark v-on="on">Nudge</v-btn>
      </template>
      <span>nudge message here</span>
    </v-tooltip>
  </div>
</template>
