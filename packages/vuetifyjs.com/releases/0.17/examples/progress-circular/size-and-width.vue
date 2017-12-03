<template>
  <div>
    <v-progress-circular indeterminate v-bind:size="50" color="primary"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:width="3" color="red"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" color="purple"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:width="3" color="green"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:size="50" color="amber"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
