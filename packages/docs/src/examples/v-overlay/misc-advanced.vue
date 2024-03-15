<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        class="mx-auto"
        max-width="344"
        v-bind="props"
      >
        <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>

        <v-card-text>
          <h2 class="text-h6 text-primary">
            Magento Forests
          </h2>
          Travel to the best outdoor experience on planet Earth. A vacation you will never forget!
        </v-card-text>

        <v-card-title>
          <v-rating
            :model-value="4"
            background-color="orange"
            class="me-2"
            color="orange"
            dense
            hover
          ></v-rating>
          <span class="text-primary text-subtitle-2">64 Reviews</span>
        </v-card-title>

        <v-overlay
          :model-value="isHovering"
          class="align-center justify-center"
          scrim="#036358"
          contained
        >
          <v-btn variant="flat">See more info</v-btn>
        </v-overlay>
      </v-card>
    </v-hover>
  </div>
</template>
