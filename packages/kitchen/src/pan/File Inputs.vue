<template>
  <v-container>
    <v-layout column>
      <main-header>File inputs</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-file-input></v-file-input>
      </core-section>

      <core-title>Multiple</core-title>
      <core-section>
        <v-file-input multiple></v-file-input>
      </core-section>

      <core-title>Chips</core-title>
      <core-section>
        <v-file-input chips></v-file-input>
      </core-section>

      <core-title>Small chips</core-title>
      <core-section>
        <v-file-input small-chips></v-file-input>
      </core-section>

      <core-title>Counter</core-title>
      <core-section>
        <v-file-input multiple counter></v-file-input>
      </core-section>

      <core-title>Size displaying</core-title>
      <core-section>
        <v-file-input display-size></v-file-input>
      </core-section>

      <core-title>Size displaying & multiple</core-title>
      <core-section>
        <v-file-input display-size multiple></v-file-input>
      </core-section>

      <core-title>Size displaying & counter</core-title>
      <core-section>
        <v-file-input display-size multiple counter></v-file-input>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FileInputs',

    data: () => ({})
  }
</script>
