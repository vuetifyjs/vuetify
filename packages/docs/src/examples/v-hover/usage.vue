<template>
  <div class="d-flex">
    <v-hover
      v-slot="{ isHovering, props }"
    >
      <v-card
        :elevation="isHovering ? 12 : 2"
        height="200"
        max-width="350"
        class="mx-auto"
        v-bind="props"
      >
        <v-card-text class="my-4 text-center text-h6">
          Hover over me!
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>
