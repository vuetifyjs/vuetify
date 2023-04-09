<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-app-bar
      app
      clipped-left
      flat
    >
      <v-avatar
        v-for="n in 2"
        :key="`avatar--${n}`"
        class="me-3"
        color="grey-lighten-1"
        size="36"
      ></v-avatar>

      <div class="mx-2"></div>

      <v-btn
        v-for="n in 4"
        :key="n"
        class="me-3"
        color="grey-lighten-1"
        variant="flat"
        min-width="96"
        rounded
        size="small"
      ></v-btn>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      class="pa-2"
      clipped
      width="300"
    >
      <div class="d-flex align-center pa-1">
        <v-btn rounded variant="flat" color="grey-lighten-3" class="grow"></v-btn>

        <v-btn
          min-width="0"
          variant="flat"
          class="ms-3"
          color="grey-lighten-3"
        ></v-btn>
      </div>

      <div class="d-flex align-center pa-1">
        <v-btn rounded variant="flat" color="grey-lighten-3" class="grow"></v-btn>

        <v-btn
          v-for="n in 2"
          :key="`btn--${n}`"
          class="ms-3"
          color="grey-lighten-1"
          fab
          size="x-small"
          variant="flat"
        ></v-btn>
      </div>

      <div class="pa-1 mb-4">
        <v-text-field
          density="compact"
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </div>
    </v-navigation-drawer>

    <v-main>
      <!--  -->
    </v-main>

    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-text-field
        bg-color="grey lighten-1"
        density="compact"
        flat
        hide-details
        rounded
        variant="solo"
      ></v-text-field>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      links: [
        'Store',
        'Library',
        'Community',
        'Profile',
      ],
    }),
  }
</script>
