<template>
  <div>
    <div class="d-flex justify-space-around align-center py-4">
      <v-btn
        icon="mdi-minus"
        variant="text"
        @click="model = Math.max(model - 1, 0)"
      ></v-btn>
      {{ model }}
      <v-btn
        icon="mdi-plus"
        variant="text"
        @click="model = Math.min(model + 1, 4)"
      ></v-btn>
    </div>
    <v-carousel v-model="model">
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
        :value="i"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              Slide {{ i + 1 }}
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const colors = [
    'primary',
    'secondary',
    'yellow darken-2',
    'red',
    'orange',
  ]

  const model = ref(0)
</script>

<script>
  export default {
    data () {
      return {
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        model: 0,
      }
    },
  }
</script>
