<template>
  <v-layout row justify-space-around>
    <v-layout style="flex-grow: 0;" column wrap justify-space-between align-center>
      <v-select
        v-model="color"
        style="width: 250px;"
        label="Color"
        :items="colors"
      ></v-select>

      <v-switch
        v-model="left"
        label="Left"
      ></v-switch>

      <v-switch
        v-model="bottom"
        label="Bottom"
      ></v-switch>

      <v-switch
        v-model="overlap"
        label="Overlap"
      ></v-switch>
    </v-layout>

    <v-badge class="align-self-center" :color="color" :bottom="bottom" :left="left" :overlap="overlap">
      <template v-slot:badge>
        <span>!</span>
      </template>
      <v-icon
        large
        color="grey"
      >
        mail
      </v-icon>
    </v-badge>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      colors: [ 'primary', 'accent', 'warning lighten-2', 'teal', 'error lighten-2' ],
      color: 'primary',
      left: false,
      bottom: false,
      overlap: true
    })
  }
</script>
