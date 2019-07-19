<template>
  <v-container grid-list-xl>
    <v-layout
      wrap
      justify-space-around
    >
      <v-flex
        xs12
        md6
      >
        <v-select
          v-model="icon"
          :items="icons"
        ></v-select>
      </v-flex>
      <v-flex
        xs12
        md6
      >
        <v-select
          v-model="color"
          :items="colors"
        ></v-select>
      </v-flex>
      <v-flex
        xs12
        text-center
      >
        <v-icon :color="color">{{ icon }}</v-icon>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'mdi-anchor',
        'mdi-xbox-controller',
        'mdi-watch',
        'mdi-tilde',
        'mdi-tennis',
        'mdi-mouse',
        'fas fa-lock',
      ],
      icon: 'mdi-tennis',
      colors: [
        'warning',
        'red',
        'teal lighten-2',
        'primary',
        'grey',
      ],
      color: 'primary',
    }),
  }
</script>
