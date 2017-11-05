<template>
  <div>
    <v-progress-circular v-bind:value="20"></v-progress-circular>

    <v-progress-circular v-bind:value="40"></v-progress-circular>

    <v-progress-circular v-bind:value="60"></v-progress-circular>

    <v-progress-circular v-bind:value="80"></v-progress-circular>

    <v-progress-circular v-bind:value="100"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
