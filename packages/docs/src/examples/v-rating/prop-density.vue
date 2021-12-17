<template>
  <div class="d-flex flex-column align-center justify-center">
    <v-rating
      class="ma-2"
      :model-value="3"
      density="default"
    ></v-rating>

    <v-rating
      class="ma-2"
      :model-value="3"
      density="comfortable"
    ></v-rating>

    <v-rating
      class="ma-2"
      :model-value="3"
      density="compact"
    ></v-rating>
  </div>
</template>
