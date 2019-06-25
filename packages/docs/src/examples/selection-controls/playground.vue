<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-checkbox v-model="disabled" class="mx-2" label="Disabled"></v-checkbox>
      <v-checkbox v-model="readonly" class="mx-2" label="Read-only"></v-checkbox>
      <v-checkbox v-model="error" class="mx-2" label="Error"></v-checkbox>
      <v-checkbox v-model="success" class="mx-2" label="Success"></v-checkbox>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
      <v-flex xs12>
        <header>Switches</header>
      </v-flex>
      <v-checkbox v-model="loading" class="mx-2" label="Loading"></v-checkbox>
      <v-checkbox v-model="flat" class="mx-2" label="Flat"></v-checkbox>
      <v-checkbox v-model="inset" class="mx-2" label="Inset"></v-checkbox>
      <v-flex xs12>
        <header>Radios</header>
      </v-flex>
      <v-switch v-model="mandatory" class="mx-2" label="Mandatory"></v-switch>
      <v-switch v-model="multiple" class="mx-2" label="Multiple"></v-switch>
      <v-switch v-model="row" class="mx-2" label="Row"></v-switch>
      <v-flex xs12>
        <header>Checkboxes</header>
      </v-flex>
      <v-switch v-model="indeterminate" class="mx-2" label="Indeterminate"></v-switch>
    </v-layout>

    <v-switch
      :disabled="disabled"
      :readonly="readonly"
      :loading="loading"
      :flat="flat"
      :inset="inset"
      :error="error"
      :success="success"
      :color="color"
      label="I'm a switch"
    ></v-switch>
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
    <v-checkbox
      :disabled="disabled"
      :readonly="readonly"
      :indeterminate="indeterminate"
      :error="error"
      :success="success"
      :color="color"
      label="I'm a checkbox"
    ></v-checkbox>
  </div>
</template>

<script>
  export default {
    data: () => ({
      disabled: false,
      readonly: false,
      loading: false,
      flat: false,
      inset: false,
      error: false,
      success: false,
      mandatory: false,
      multiple: false,
      row: false,
      indeterminate: false,
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
