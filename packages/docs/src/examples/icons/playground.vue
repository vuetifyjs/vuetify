<template>
  <v-container>
    <v-row

      justify="space-around"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="icon"
          :items="icons"
        ></v-select>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-select
          v-model="color"
          :items="colors"
        ></v-select>
      </v-col>
      <v-col
        class="text-center"
        cols="12"
      >
        <v-icon :color="color">{{ icon }}</v-icon>
      </v-col>
    </v-row>
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
