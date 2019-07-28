<template>
  <v-layout wrap>
    <v-flex
      xs12
      sm6
    >
      <v-hover
        v-slot:default="{ hover }"
        open-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            Open Delay (Mouse enter)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>

    <v-flex
      xs12
      sm6
    >
      <v-hover
        v-slot:default="{ hover }"
        close-delay="200"
      >
        <v-card
          :elevation="hover ? 16 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-12 text-center subtitle-1">
            Close Delay (Mouse leave)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
