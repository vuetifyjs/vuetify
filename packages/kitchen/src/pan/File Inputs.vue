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

      <core-title>Non-deletable</core-title>
      <core-section>
        <v-file-input :deletable-chips="false" chips></v-file-input>
      </core-section>

      <core-title>Non-clearable</core-title>
      <core-section>
        <v-file-input :clearable="false" chips></v-file-input>
      </core-section>

      <core-title>Loading</core-title>
      <core-section>
        <v-file-input loading></v-file-input>
      </core-section>

      <core-title>Progress</core-title>
      <core-section>
        <v-file-input progress="30"></v-file-input>
        <v-file-input progress="70"></v-file-input>
      </core-section>

      <core-title>Disabled</core-title>
      <core-section>
        <v-file-input disabled></v-file-input>
      </core-section>

      <core-title>Placeholder</core-title>
      <core-section>
        <v-file-input placeholder="Placeholder"></v-file-input>
      </core-section>

      <core-title>Placeholder & chips</core-title>
      <core-section>
        <v-file-input placeholder="Placeholder" chips></v-file-input>
      </core-section>

      <core-title>Accept only specific types</core-title>
      <core-section>
        <v-file-input accept="image/*"></v-file-input>
      </core-section>

      <core-title>Validation (1 MB limit)</core-title>
      <core-section>
        <v-file-input display-size :rules="rules"></v-file-input>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FileInputs',

    data: () => ({
      rules: [
        value => value.length > 0 || value.map(f => f.size).reduce((a, b) => a + b) < 2000000 || "File must be smaller than 2 MB!",
      ],
    }),
  }
</script>
