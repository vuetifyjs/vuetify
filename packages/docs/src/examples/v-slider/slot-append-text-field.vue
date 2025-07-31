<template>
  <v-card style="margin: auto" width="400">
    <v-responsive
      :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
      height="300px"
    ></v-responsive>

    <v-card-text>
      <v-slider
        v-model="red"
        :max="255"
        :step="1"
        class="ma-4"
        label="R"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="red"
            density="compact"
            style="width: 80px"
            type="number"
            variant="outlined"
            hide-details
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="green"
        :max="255"
        :step="1"
        class="ma-4"
        label="G"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="green"
            density="compact"
            style="width: 80px"
            type="number"
            variant="outlined"
            hide-details
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="blue"
        :max="255"
        :step="1"
        class="ma-4"
        label="B"
        hide-details
      >
        <template v-slot:append>
          <v-text-field
            v-model="blue"
            density="compact"
            style="width: 80px"
            type="number"
            variant="outlined"
            hide-details
          ></v-text-field>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const red = ref(64)
  const green = ref(128)
  const blue = ref(10)
</script>

<script>
  export default {
    data () {
      return {
        red: 64,
        green: 128,
        blue: 10,
      }
    },
  }
</script>
