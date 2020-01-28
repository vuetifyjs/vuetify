<template>
  <v-container class="fill-height">
    <v-row justify="center">
      <v-icon @click="model--">mdi-minus</v-icon>
      {{ model }}
      <v-icon @click="model++">mdi-plus</v-icon>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-carousel
        v-model="model"
        v-bind="attrs"
      >
        <v-carousel-item
          v-for="(color, i) in colors"
          :key="color"
        >
          <v-sheet
            :color="color"
            height="100%"
            tile
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      model: 0,
    }),
  }
</script>
