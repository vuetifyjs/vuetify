<template>
  <v-container>
    <v-layout column>
      <main-header>Switches</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model1" />
        </v-layout>
      </core-section>

      <core-title>Disabled</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model21" disabled />
          <v-switch v-model="model22" disabled />
        </v-layout>
      </core-section>

      <core-title>Colors</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model31" color="cyan" />
          <v-switch v-model="model32" color="red lighten-2" />
          <v-switch v-model="model33" color="warning" />
        </v-layout>
      </core-section>

      <core-title>Flat</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model4" flat />
        </v-layout>
      </core-section>

      <core-title>Loading</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model51" loading color="cyan" />
          <v-switch v-model="model52" disabled loading color="red lighten-2" />
          <v-switch v-model="model53" disabled loading color="warning" />
        </v-layout>
      </core-section>

      <core-title>Inset</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-switch v-model="model61" color="red" inset />
          <v-switch v-model="model62" color="blue" inset />
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: '',

    data: () => ({
      model1: false,
      model21: false,
      model22: true,
      model31: true,
      model32: true,
      model33: true,
      model4: false,
      model51: true,
      model52: false,
      model53: true,
      model61: true,
      model62: false,
    }),
  }
</script>
