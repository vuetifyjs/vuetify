<template>
  <v-container>
    <v-layout column>
      <main-header>File inputs</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-file-input />
      </core-section>

      <core-title>Multiple</core-title>
      <core-section>
        <v-file-input multiple />
      </core-section>

      <core-title>Chips</core-title>
      <core-section>
        <v-file-input chips />
      </core-section>

      <core-title>Small chips</core-title>
      <core-section>
        <v-file-input small-chips />
      </core-section>

      <core-title>Counter</core-title>
      <core-section>
        <v-file-input multiple counter />
      </core-section>

      <core-title>Size displaying</core-title>
      <core-section>
        <v-file-input display-size />
      </core-section>

      <core-title>Size displaying & multiple</core-title>
      <core-section>
        <v-file-input display-size multiple />
      </core-section>

      <core-title>Size displaying & counter</core-title>
      <core-section>
        <v-file-input display-size multiple counter />
      </core-section>

      <core-title>Non-deletable</core-title>
      <core-section>
        <v-file-input :deletable-chips="false" chips />
      </core-section>

      <core-title>Non-clearable</core-title>
      <core-section>
        <v-file-input :clearable="false" chips />
      </core-section>

      <core-title>Loading</core-title>
      <core-section>
        <v-file-input loading />
      </core-section>

      <core-title>Disabled</core-title>
      <core-section>
        <v-file-input disabled />
      </core-section>

      <core-title>Placeholder</core-title>
      <core-section>
        <v-file-input placeholder="Placeholder" />
      </core-section>

      <core-title>Placeholder & chips</core-title>
      <core-section>
        <v-file-input placeholder="Placeholder" chips />
      </core-section>

      <core-title>Accept only specific types</core-title>
      <core-section>
        <v-file-input accept="image/*" />
      </core-section>

      <core-title>Validation (2 MB limit)</core-title>
      <core-section>
        <v-file-input display-size :rules="rules" />
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'FileInputs',

    data: () => ({
      rules: [
        value => value.length > 0 || value.map(f => f.size).reduce((a, b) => a + b) < 2000000 || 'File must be smaller than 2 MB!',
      ],
    }),
  }
</script>
