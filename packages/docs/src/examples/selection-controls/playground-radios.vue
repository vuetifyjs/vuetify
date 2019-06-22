<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="disabled" class="mx-2" label="Disabled"></v-switch>
      <v-switch v-model="readonly" class="mx-2" label="Read-only"></v-switch>
      <v-switch v-model="mandatory" class="mx-2" label="Mandatory"></v-switch>
      <v-switch v-model="multiple" class="mx-2" label="Multiple"></v-switch>
      <v-switch v-model="error" class="mx-2" label="Error"></v-switch>
      <v-switch v-model="success" class="mx-2" label="Success"></v-switch>
      <v-switch v-model="row" class="mx-2" label="Row"></v-switch>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
    </v-layout>

    <v-radio-group
      :disabled="disabled"
      :readonly="readonly"
      :mandatory="mandatory"
      :multiple="multiple"
      :error="error"
      :success="success"
      :row="row"
      :color="color"
    >
      <v-radio label="I'm a radio button"></v-radio>
      <v-radio label="I'm a radio button"></v-radio>
      <v-radio label="I'm a radio button"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    data: () => ({
      disabled: false,
      readonly: false,
      mandatory: false,
      multiple: false,
      error: false,
      success: false,
      row: false,
      color: 'accent',
      colors: [
        'accent',
        'teal',
        'blue',
        'error',
        'success',
      ],
    }),
  }
</script>
