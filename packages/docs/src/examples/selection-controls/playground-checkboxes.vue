<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="disabled" class="mx-2" label="Disabled"></v-switch>
      <v-switch v-model="readonly" class="mx-2" label="Read-only"></v-switch>
      <v-switch v-model="indeterminate" class="mx-2" label="Indeterminate"></v-switch>
      <v-switch v-model="error" class="mx-2" label="Error"></v-switch>
      <v-switch v-model="success" class="mx-2" label="Success"></v-switch>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
    </v-layout>

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
      indeterminate: false,
      error: false,
      success: false,
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
