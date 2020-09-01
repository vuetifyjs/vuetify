<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="12">
      <v-hover
        v-slot:default="{ hover }"
        disabled
      >
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="my-4 text-center title">
            Hover over me!
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>
