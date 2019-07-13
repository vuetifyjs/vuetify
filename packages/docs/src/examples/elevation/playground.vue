<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex
        xs12
        md4
      >
        <v-slider
          v-model="selected"
          prepend-icon="mdi-pan-horizontal"
          min="0"
          max="24"
          thumb-label
        ></v-slider>
      </v-flex>
      <v-flex
        xs12
        md4
        offset-md3
      >
        <v-card :elevation="selected">
          <v-card-text>
            <p class="text-xs-center ma-0">
              Elevation {{ selected }}
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
