<template>
  <v-container>
    <v-layout column>
      <v-layout row>
        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Basic
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Disabled
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" disabled />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Read only
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" readonly />
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Basic
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" vertical />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Disabled
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" vertical disabled />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Read only
          </h3>
          <v-layout row align-center>
            <v-slider v-model="disabled" vertical readonly />
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" label="Label" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Inverse label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" label="Label" inverse-label />
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" label="Label" />
          </v-layout>
        </v-flex>

        <v-flex>
          <h3 class="title grey--text mb-4 mt-5 center">
            Inverse label
          </h3>
          <v-layout row align-center>
            <v-slider v-model="basic" label="Label" vertical inverse-label />
          </v-layout>
        </v-flex>
      </v-layout>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Sliders',

    data: () => ({
      basic: 0,
      disabled: 20
    })
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
