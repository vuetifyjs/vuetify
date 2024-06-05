<template>
  <v-sheet
    class="d-flex align-center px-4 py-8 mx-auto"
    color="#181a1b"
    max-width="250"
    rounded="lg"
  >
    <v-progress-linear
      :location="false"
      bg-color="#92aed9"
      buffer-color="#6a3e0b"
      buffer-opacity="1"
      buffer-value="3"
      color="#12512a"
      height="12"
      max="9"
      min="0"
      model-value="2"
      rounded
    ></v-progress-linear>

    <div class="ms-4 text-h6">3/9</div>
  </v-sheet>
</template>
