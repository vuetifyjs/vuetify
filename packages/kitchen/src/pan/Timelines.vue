<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Basic
      </h3>
      <v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            large
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Opposite slot
      </h3>
      <v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            :large="n % 2"
          >
            <span slot="opposite">
              Tus eu perfecto
            </span>
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Different colors
      </h3>
      <v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            :color="n % 2 ? 'red lighten-2' : 'success'"
            large
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Large dots
      </h3>
      <v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            large
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Icons in dots
      </h3>
      <v-flex>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            :icon="n % 2 ? 'mdi-magnify' : 'mdi-book'"
            :large="n % 2"
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Dense
      </h3>
      <v-flex>
        <v-timeline dense>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Dense with large dots
      </h3>
      <v-flex>
        <v-timeline dense>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            large
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Dense with icons
      </h3>
      <v-flex>
        <v-timeline dense>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            icon="mdi-magnify"
            :large="n % 2"
          >
            <v-card class="elevation-2">
              <v-card-title class="headline">
                Lorem ipsum
              </v-card-title>
              <v-card-text>
                Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Timelines',

    data: () => ({})
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
