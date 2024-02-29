<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      color="grey-lighten-4"
      height="72"
      flat
    >
      <v-avatar
        class="ms-2"
        color="surface-variant"
        size="32"
        variant="flat"
      ></v-avatar>
      <v-avatar
        class="mx-2"
        color="surface-variant"
        size="32"
        variant="flat"
      ></v-avatar>

      <v-btn
        class="me-2"
        color="grey"
        height="40"
        variant="flat"
        width="80"
      ></v-btn>

      <v-btn
        class="me-2"
        color="grey"
        height="40"
        variant="flat"
        width="100"
      ></v-btn>

      <v-btn
        class="me-2"
        color="grey"
        height="40"
        variant="flat"
        width="120"
      ></v-btn>

      <v-btn
        class="me-2"
        color="grey"
        height="40"
        variant="flat"
        width="120"
      ></v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-footer
      color="grey"
      height="44"
      app
    ></v-footer>

    <v-navigation-drawer floating>
      <div class="d-flex px-2 my-2">
        <v-btn
          class="flex-grow-1"
          color="grey"
          height="40"
          variant="flat"
        ></v-btn>

        <v-avatar
          class="ms-2"
          color="surface-variant"
          variant="flat"
          rounded
        ></v-avatar>
      </div>

      <div class="d-flex px-2 my-2 align-center">
        <v-btn
          class="flex-grow-1 me-2"
          color="grey-lighten-4"
          height="40"
          variant="flat"
        ></v-btn>

        <v-avatar
          color="surface-variant"
          size="18"
        ></v-avatar>

        <v-avatar
          class="ms-1"
          color="surface-variant"
          size="18"
        ></v-avatar>
      </div>

      <div class="px-2 my-2">
        <v-text-field
          class="mb-4"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
        ></v-text-field>

        <v-sheet
          class="mb-2"
          color="surface-variant"
          height="24"
          rounded="pill"
          width="50%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="40%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="20%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="90%"
        ></v-sheet>

        <v-sheet
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="70%"
        ></v-sheet>

        <v-divider class="my-6"></v-divider>

        <v-sheet
          class="mb-2"
          color="surface-variant"
          height="24"
          rounded="pill"
          width="30%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="65%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="70%"
        ></v-sheet>

        <v-sheet
          class="mb-1"
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="40%"
        ></v-sheet>

        <v-sheet
          color="grey-lighten-1"
          height="12"
          rounded="pill"
          width="100%"
        ></v-sheet>

        <v-divider class="my-6"></v-divider>
      </div>
    </v-navigation-drawer>

    <v-main>
      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="grey-lighten-4"
      >
        <v-sheet
          color="grey-lighten-2"
          height="24"
          rounded="pill"
          width="88"
        ></v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 5"
            :key="n"
          >
            <v-sheet
              class="ma-3"
              color="grey-lighten-1"
              height="200"
              width="250"
              rounded
            ></v-sheet>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-sheet
        class="mx-auto pa-2 pt-6"
        color="grey-lighten-2"
      >
        <v-sheet
          color="grey"
          height="24"
          rounded="pill"
          width="88"
        ></v-sheet>

        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="n in 15"
            :key="n"
          >
            <v-sheet
              :width="n === 1 ? 300 : 150"
              class="ma-3"
              color="grey-lighten-1"
              height="200"
              rounded
            ></v-sheet>
          </v-slide-group-item>
        </v-slide-group>

        <v-container fluid>
          <v-row>
            <v-col
              v-for="n in 24"
              :key="n"
              cols="2"
            >
              <v-sheet
                color="grey-lighten-1"
                height="200"
                rounded
              ></v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
