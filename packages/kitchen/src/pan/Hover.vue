<template>
  <v-container>
    <v-layout column>
      <main-header>Hover</main-header>

      <core-title>
        Simple hover
      </core-title>
      <core-section>
        <v-hover>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </core-section>

      <core-title>
        Disabled
      </core-title>
      <core-section>
        <v-hover disabled>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </core-section>

      <core-title>
        With delay
      </core-title>
      <core-section>
        <v-hover
          open-delay="100"
          close-delay="100"
        >
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Hover',

    data: () => ({})
  }
</script>
