<template>
  <div>
    <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>

    <v-progress-circular :width="3" indeterminate color="red"></v-progress-circular>

    <v-progress-circular :size="70" :width="7" indeterminate color="purple"></v-progress-circular>

    <v-progress-circular :width="3" indeterminate color="green"></v-progress-circular>

    <v-progress-circular :size="50" indeterminate color="amber"></v-progress-circular>
  </div>
</template>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
