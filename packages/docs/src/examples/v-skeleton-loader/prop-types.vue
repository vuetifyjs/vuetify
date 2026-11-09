<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-center mb-4">new "product" type</div>

        <v-skeleton-loader
          :types="{
            product: 'image, product-summary, actions',
            'product-summary': 'heading, sentences',
          }"
          class="mx-auto border"
          max-width="300"
          type="product"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="6">
        <div class="text-center mb-4">article with longer paragraph</div>

        <v-skeleton-loader
          :types="{ paragraph: 'text@6' }"
          class="mx-auto border"
          max-width="300"
          type="article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
