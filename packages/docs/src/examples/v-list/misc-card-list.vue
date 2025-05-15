<template>
  <v-card
    class="mx-auto"
    max-width="375"
  >
    <v-img
      class="text-white"
      height="300px"
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      cover
    >
      <div class="d-flex flex-column h-100">
        <v-card-title class="d-flex ga-2 px-2">
          <v-btn icon="mdi-chevron-left" variant="text"></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-pencil" variant="text"></v-btn>
          <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="pb-6 text-center">
          <div class="text-h4">Ali Conners</div>
        </v-card-title>
      </div>
    </v-img>

    <v-list lines="two">
      <v-list-item>
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="indigo" icon="mdi-phone"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-title>(650) 555-1234</v-list-item-title>
        <v-list-item-subtitle>Mobile</v-list-item-subtitle>

        <template v-slot:append>
          <v-avatar>
            <v-icon icon="mdi-message-text"></v-icon>
          </v-avatar>
        </template>
      </v-list-item>

      <v-list-item>
        <template v-slot:prepend>
          <v-avatar></v-avatar>
        </template>

        <v-list-item-title>(323) 555-6789</v-list-item-title>
        <v-list-item-subtitle>Work</v-list-item-subtitle>

        <template v-slot:append>
          <v-avatar>
            <v-icon icon="mdi-message-text"></v-icon>
          </v-avatar>
        </template>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="indigo" icon="mdi-email"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-title>aliconnors@example.com</v-list-item-title>
        <v-list-item-subtitle>Personal</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <template v-slot:prepend>
          <v-avatar></v-avatar>
        </template>

        <v-list-item-title>ali_connors@example.com</v-list-item-title>
        <v-list-item-subtitle>Work</v-list-item-subtitle>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <template v-slot:prepend>
          <v-avatar>
            <v-icon color="indigo" icon="mdi-map-marker"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-title>1400 Main Street</v-list-item-title>
        <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>
