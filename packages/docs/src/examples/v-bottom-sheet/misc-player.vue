<template>
  <div class="text-center">
    <v-bottom-sheet inset>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          v-bind="attrs"
          v-on="on"
        >
          Open Player
        </v-btn>
      </template>
      <v-card rounded="0">
        <v-progress-linear
          :model-value="50"
          class="my-0"
          height="3"
        ></v-progress-linear>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>The Walker</v-list-item-title>
              <v-list-item-subtitle>Fitz & The Trantrums</v-list-item-subtitle>
            </v-list-item-content>

            <v-spacer></v-spacer>

            <v-list-item-icon>
              <v-btn icon>
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon :class="{ 'mx-5': $vuetify.display.mdAndUp }">
              <v-btn icon>
                <v-icon>mdi-pause</v-icon>
              </v-btn>
            </v-list-item-icon>

            <v-list-item-icon
              class="ms-0"
              :class="{ 'me-3': $vuetify.display.mdAndUp }"
            >
              <v-btn icon>
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>
