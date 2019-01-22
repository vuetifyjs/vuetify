<template>
  <v-container>
    <v-layout column>
      <main-header>Hover</main-header>

      <h3 class="title grey--text mb-4 mt-5 center">
        Simple hover
      </h3>
      <v-flex>
        <v-hover>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Disabled
      </h3>
      <v-flex>
        <v-hover disabled>
          <v-sheet slot-scope="{ hover }">
            {{ hover }}
          </v-sheet>
        </v-hover>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        With delay
      </h3>
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

<style scoped>
.center {
  align-self: center;
}
</style>
