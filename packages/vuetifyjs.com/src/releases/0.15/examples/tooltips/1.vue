<template>
  <div class="text-xs-center">
    <v-btn dark v-tooltip:top="{ html: 'Top tooltip' }" primary>Top</v-btn>

    <v-btn dark v-tooltip:right="{ html: 'Right tooltip' }" primary>Right</v-btn>

    <v-btn dark v-tooltip:bottom="{ html: 'Bottom tooltip' }" primary>Bottom</v-btn>

    <v-btn dark v-tooltip:left="{ html: 'Left tooltip' }" primary>Left</v-btn>
  </div>
</template>
