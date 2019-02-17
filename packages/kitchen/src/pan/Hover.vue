<template>
  <v-container>
    <v-layout column>
      <main-header>Hover</main-header>

      <core-title>
        Simple hover
      </core-title>
      <core-section>
        <v-hover>
          <template #default="{ hover }">
            <v-sheet>
              {{ hover }}
            </v-sheet>
          </template>
        </v-hover>
      </core-section>

      <core-title>
        Disabled
      </core-title>
      <core-section>
        <v-hover disabled>
          <template #default="{ hover }">
            <v-sheet>
              {{ hover }}
            </v-sheet>
          </template>
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
          <template #default="{ hover }">
            <v-sheet>
              {{ hover }}
            </v-sheet>
          </template>
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
