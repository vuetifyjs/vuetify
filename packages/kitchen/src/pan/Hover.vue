<template>
  <v-container>
    <v-layout column>
      <core-title>
        Simple hover
      </core-title>
      <v-flex>
        <v-hover>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </v-flex>

      <core-title>
        Disabled
      </core-title>
      <v-flex>
        <v-hover disabled>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </v-flex>

      <core-title>
        With delay
      </core-title>
      <v-flex>
        <v-hover
          open-delay="100"
          close-delay="100"
        >
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Hover',

    data: () => ({})
  }
</script>
