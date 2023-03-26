<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        xl="4"
      >
        <v-skeleton-loader
          boilerplate
          class="mb-6"
          elevation="2"
          type="card-avatar, article, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          boilerplate
          class="mb-6"
          elevation="2"
          type="date-picker"
        ></v-skeleton-loader>
      </v-col>

      <v-col
        cols="12"
        md="6"
        xl="4"
      >
        <v-skeleton-loader
          boilerplate
          class="mb-6"
          elevation="2"
          type="article, actions"
        ></v-skeleton-loader>

        <v-skeleton-loader
          boilerplate
          class="mb-6"
          elevation="2"
          type="table-heading, list-item-two-line, image, table-tfoot"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
