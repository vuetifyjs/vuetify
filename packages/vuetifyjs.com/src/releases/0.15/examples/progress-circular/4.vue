<template>
  <div>
    <v-progress-circular indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:width="3" class="red--text"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:width="3" class="green--text"></v-progress-circular>

    <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
