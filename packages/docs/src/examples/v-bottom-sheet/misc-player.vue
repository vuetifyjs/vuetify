<template>
  <v-bottom-sheet inset>
    <template v-slot:activator="{ props }">
      <div class="text-center">
        <v-btn
          color="red"
          v-bind="props"
        >
          Open Player
        </v-btn>
      </div>
    </template>

    <v-sheet>
      <v-progress-linear model-value="50"></v-progress-linear>

      <v-list>
        <v-list-item>
          <v-list-item-title>The Walker</v-list-item-title>

          <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>

          <template v-slot:append>
            <v-btn
              icon="mdi-rewind"
              variant="text"
            ></v-btn>

            <v-btn
              :class="{ 'mx-5': $vuetify.display.mdAndUp }"
              icon="mdi-pause"
              variant="text"
            ></v-btn>

            <v-btn
              :class="{ 'me-3': $vuetify.display.mdAndUp }"
              class="ms-0"
              icon="mdi-fast-forward"
              variant="text"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
