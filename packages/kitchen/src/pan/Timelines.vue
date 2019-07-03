<template>
  <v-container>
    <v-layout column>
      <core-title>
        Basic
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Opposite slot
      </core-title>
      <core-section>
        <v-timeline>
          <v-timeline-item
            v-for="n in 2"
            :key="n"
            color="red lighten-2"
            :large="n % 2"
          >
            <template #opposite>
              <span>
                Tus eu perfecto
              </span>
            </template>
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
      </core-section>

      <core-title>
        Different colors
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Large dots
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Icons in dots
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Dense
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Dense with large dots
      </core-title>
      <core-section>
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
      </core-section>

      <core-title>
        Dense with icons
      </core-title>
      <core-section>
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
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Timelines',

    data: () => ({}),
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
