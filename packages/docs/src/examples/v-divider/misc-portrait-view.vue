<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="8"
    >
      <v-card>
        <v-card-title class="bg-cyan-darken-1">
          <span class="text-h5">Sarah Mcbeal</span>

          <v-spacer></v-spacer>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>

          <v-btn
            dark
            icon
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-phone</v-icon>
            </template>

            <v-list-item-title>(650) 555-1234</v-list-item-title>

            <template v-slot:append>
              <v-icon>mdi-message-text</v-icon>
            </template>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-phone</v-icon>
            </template>

            <v-list-item-title>(323) 555-6789</v-list-item-title>

            <template v-slot:append>
              <v-icon>mdi-message-text</v-icon>
            </template>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-email</v-icon>
            </template>

            <v-list-item-title>mcbeal@example.com</v-list-item-title>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-map-marker</v-icon>
            </template>

            <v-list-item-title>Orlando, FL 79938</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-img
          src="https://picsum.photos/700?image=996"
          height="200px"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
