<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-item class="bg-cyan-darken-1">
      <v-card-title>
        <span class="text-h5">Sarah Mcbeal</span>
      </v-card-title>

      <template v-slot:append>
        <v-defaults-provider
          :defaults="{
            VBtn: {
              variant: 'text',
              density: 'comfortable',
            }
          }"
        >
          <v-btn icon="mdi-chevron-left"></v-btn>

          <v-btn icon="mdi-pencil"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </v-defaults-provider>
      </template>
    </v-card-item>

    <v-list>
      <v-list-item
        append-icon="mdi-message-text"
        prepend-icon="mdi-phone"
        title="(650) 555-1234"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        append-icon="mdi-message-text"
        prepend-icon="mdi-phone"
        title="(323) 555-6789"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        prepend-icon="mdi-email"
        title="mcbeal@example.com"
      ></v-list-item>

      <v-divider inset></v-divider>

      <v-list-item
        prepend-icon="mdi-map-marker"
        title="Orlando, FL 79938"
      ></v-list-item>
    </v-list>

    <v-img
      cover
      height="200"
      src="https://picsum.photos/700?image=996"
    ></v-img>
  </v-card>
</template>
