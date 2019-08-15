<template>
  <div class="text-center">
    <v-badge left color="purple">
      <template v-slot:badge>
        <v-icon dark>mdi-adjust</v-icon>
      </template>
      <span>
        MDI icon
      </span>
    </v-badge>

    &nbsp;&nbsp;

    <v-badge color="orange">
      <template v-slot:badge>
        <v-icon dark>fas fa-fighter-jet</v-icon>
      </template>
      <span>
        Font Awesome icon
      </span>
    </v-badge>
  </div>
</template>
