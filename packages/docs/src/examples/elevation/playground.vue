<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-slider
          v-model="selected"
          prepend-icon="mdi-pan-horizontal"
          min="0"
          max="24"
          thumb-label
        ></v-slider>
      </v-col>
      <v-col
        cols="12"
        md="4"
        offset-md="3"
      >
        <v-card :elevation="selected">
          <v-card-text>
            <p class="text-center ma-0">
              Elevation {{ selected }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selected: 0,
      }
    },
  }
</script>
