<template>
  <div class="text-center">
    <v-progress-circular
      color="blue-grey"
      model-value="100"
    ></v-progress-circular>

    <v-progress-circular
      color="deep-orange-lighten-2"
      model-value="80"
    ></v-progress-circular>

    <v-progress-circular
      color="brown"
      model-value="60"
    ></v-progress-circular>

    <v-progress-circular
      color="lime"
      model-value="40"
    ></v-progress-circular>

    <v-progress-circular
      color="indigo-darken-2"
      model-value="20"
    ></v-progress-circular>
  </div>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
