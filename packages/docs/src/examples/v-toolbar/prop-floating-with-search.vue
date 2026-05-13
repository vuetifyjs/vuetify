<template>
  <v-card
    height="300"
    image="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    border
    flat
  >
    <template v-slot:text>
      <v-toolbar rounded="lg" border floating>
        <div class="px-4">
          <v-text-field
            density="compact"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            width="200"
            flat
            hide-details
            single-line
          ></v-text-field>
        </div>

        <template v-slot:append>
          <v-btn
            color="medium-emphasis"
            density="comfortable"
            icon="mdi-crosshairs-gps"
          ></v-btn>

          <v-btn
            class="ms-1"
            color="medium-emphasis"
            density="comfortable"
            icon="mdi-dots-vertical"
          ></v-btn>
        </template>
      </v-toolbar>
    </template>
  </v-card>
</template>
