<template>
  <v-layout row wrap>
    <v-flex
      xs12
      sm6
    >
      <v-hover open-delay="200">
        <v-card
          slot-scope="{ hover }"
          :elevation="hover ? 16 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-5 text-xs-center subtitle-1">
            Open Delay (Mouse enter)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>

    <v-flex
      xs12
      sm6
    >
      <v-hover close-delay="200">
        <v-card
          slot-scope="{ hover }"
          :elevation="hover ? 16 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="font-weight-medium mt-5 text-xs-center subtitle-1">
            Close Delay (Mouse leave)
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
