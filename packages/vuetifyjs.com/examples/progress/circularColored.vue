<template>
  <div>
    <v-progress-circular v-bind:value="100" color="blue-grey"></v-progress-circular>

    <v-progress-circular v-bind:value="80" color="deep-orange lighten-2"></v-progress-circular>

    <v-progress-circular v-bind:value="60" color="brown"></v-progress-circular>

    <v-progress-circular v-bind:value="40" color="lime"></v-progress-circular>

    <v-progress-circular v-bind:value="20" color="indigo darken-2"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
