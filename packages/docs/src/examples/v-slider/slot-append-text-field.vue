<template>
  <v-card width="400" style="margin: auto">
    <v-responsive
      :style="{ background: `rgb(${red}, ${green}, ${blue})` }"
      height="300px"
    ></v-responsive>

    <v-card-text>
      <v-slider
        v-model="red"
        :max="255"
        :step="1"
        label="R"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="red"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="green"
        :max="255"
        :step="1"
        label="G"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="green"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>

      <v-slider
        v-model="blue"
        :max="255"
        :step="1"
        label="B"
        hide-details
        class="ma-4"
      >
        <template v-slot:append>
          <v-text-field
            v-model="blue"
            type="number"
            style="width: 80px"
            density="compact"
            hide-details
            variant="outlined"
          ></v-text-field>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

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
