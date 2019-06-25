<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-checkbox v-model="disabled" class="mx-2" label="Disabled"></v-checkbox>
      <v-checkbox v-model="readonly" class="mx-2" label="Read-only"></v-checkbox>
      <v-checkbox v-model="loading" class="mx-2" label="Loading"></v-checkbox>
      <v-checkbox v-model="flat" class="mx-2" label="Flat"></v-checkbox>
      <v-checkbox v-model="inset" class="mx-2" label="Inset"></v-checkbox>
      <v-checkbox v-model="error" class="mx-2" label="Error"></v-checkbox>
      <v-checkbox v-model="success" class="mx-2" label="Success"></v-checkbox>
      <v-flex xs12>
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-flex>
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
