<template>
  <div>
    <v-progress-circular v-bind:value="100" class="blue-grey--text"></v-progress-circular>

    <v-progress-circular v-bind:value="80" class="deep-orange--text"></v-progress-circular>

    <v-progress-circular v-bind:value="60" class="brown--text"></v-progress-circular>

    <v-progress-circular v-bind:value="40" class="lime--text"></v-progress-circular>

    <v-progress-circular v-bind:value="20" class="indigo--text"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
