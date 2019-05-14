<template>
  <v-layout row wrap justify-space-around>
    <v-select v-model="icon" :items="icons"></v-select>
    <v-select v-model="color" :items="colors"></v-select>
    <v-layout class="fw" justify-center>
      <v-icon :color="color">{{ icon }}</v-icon>
    </v-layout>
  </v-layout>
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
        'fas fa-lock'
      ],
      icon: 'mdi-tennis',
      colors: [
        'warning',
        'red',
        'teal lighten-2',
        'primary',
        'grey'
      ],
      color: 'primary'
    })
  }
</script>

<style scoped>
.v-select, .fw {
  min-width: 100%;
}
</style>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
