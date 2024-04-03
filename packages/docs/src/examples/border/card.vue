<template>
  <v-container>
    <v-card
      border="opacity-50 sm"
      class="mx-auto"
      max-width="360"
      rounded="xl"
      variant="text"
    >
      <template v-slot:title>
        <div class="text-caption font-weight-bold">Revenue</div>
      </template>

      <template v-slot:append>
        <v-chip
          border="success sm opacity-100"
          color="green"
          size="small"
          variant="text"
        >
          <v-icon icon="mdi-arrow-up" start></v-icon> 13%
        </v-chip>
      </template>

      <template v-slot:text>
        <div class="text-h4 font-weight-black">$ 9,232,215</div>

        <small class="text-caption text-medium-emphasis d-flex justify-space-between align-center">
          <div>
            <span class="text-green">
              <v-avatar icon="mdi-arrow-up" size="small" variant="tonal"></v-avatar>
              + $ 3,295
            </span>

            in the last week
          </div>

          <v-btn
            icon="mdi-arrow-right"
            size="x-small"
            variant="text"
            border
          ></v-btn>
        </small>
      </template>
    </v-card>
  </v-container>
</template>
