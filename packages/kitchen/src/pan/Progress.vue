<template>
  <v-container>
    <v-layout column>
      <main-header>Progress</main-header>

      <sub-header>Linear</sub-header>

      <core-title>Default</core-title>
      <core-section>
        <v-slider v-model="model1" />
        <v-progress-linear v-model="model1" />
      </core-section>

      <core-title>Colors</core-title>
      <core-section>
        <v-slider v-model="model2" />
        <v-progress-linear v-model="model2" color="teal lighten-2" />
        <v-progress-linear v-model="model2" background-color="orange lighten-3" />
        <v-progress-linear v-model="model2" color="warning" background-color="#faa" />
        <v-progress-linear v-model="model2" color="warning" background-color="#faa" background-opacity="0.5" />
      </core-section>

      <core-title>Reactive</core-title>
      <core-section>
        <v-slider v-model="model3" />
        <v-progress-linear v-model="model3" reactive />
      </core-section>

      <core-title>Indeterminate</core-title>
      <core-section>
        <v-progress-linear indeterminate />
      </core-section>

      <core-title>Indeterminate & query</core-title>
      <core-section>
        <v-progress-linear indeterminate query />
      </core-section>

      <core-title>Rounded</core-title>
      <core-section>
        <v-slider v-model="model4" />
        <v-progress-linear v-model="model4" rounded />
      </core-section>

      <core-title>Custom height</core-title>
      <core-section>
        <v-slider v-model="model5" />
        <v-progress-linear v-model="model5" height="24" />
      </core-section>

      <core-title>Striped</core-title>
      <core-section>
        <v-slider v-model="model6" />
        <v-progress-linear v-model="model6" height="24" striped />
      </core-section>

      <core-title>Buffer</core-title>
      <core-section>
        <v-slider v-model="model71" />
        <v-slider v-model="model72" />
        <v-progress-linear v-model="model71" :buffer-value.sync="model72" />
      </core-section>

      <core-title>Stream</core-title>
      <core-section>
        <v-slider v-model="model81" />
        <v-slider v-model="model82" />
        <v-progress-linear v-model="model81" :buffer-value.sync="model82" stream />
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Progress',

    data: () => ({
      model1: 42,
      model2: 42,
      model3: 42,
      model4: 42,
      model5: 42,
      model6: 42,
      model71: 42,
      model72: 89,
      model81: 42,
      model82: 89,
    }),
  }
</script>
