<template>
  <v-layout justify-space-around wrap>
    <v-flex xs12 sm6 class="pa-1">
      <v-text-field v-model="label" label="Label"></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 class="pa-1">
      <v-text-field v-model="hint" label="Hint"></v-text-field>
    </v-flex>
    <v-flex xs12 class="pa-1">
      <v-text-field v-model="placeholder" label="Placeholder"></v-text-field>
    </v-flex>
    <v-switch v-model="shaped" class="ma-1" label="Shaped" :disabled="!outlined && !filled"></v-switch>
    <v-switch v-model="outlined" class="ma-1" label="Outlined"></v-switch>
    <v-switch v-model="rounded" class="ma-1" label="Rounded"></v-switch>
    <v-switch v-model="solo" class="ma-1" label="Solo"></v-switch>
    <v-switch v-model="singleLine" class="ma-1" label="Single-line"></v-switch>
    <v-switch v-model="filled" class="ma-1" label="Filled"></v-switch>
    <v-switch v-model="clearable" class="ma-1" label="Clearable"></v-switch>
    <v-switch v-model="browserAutocomplete" class="ma-1" label="Browser autocomplete"></v-switch>
    <v-switch v-model="loading" class="ma-1" label="Loading"></v-switch>
    <v-switch v-model="flat" class="ma-1" label="Flat" :disable="!solo"></v-switch>
    <v-flex xs12 class="pa-1">
      <v-layout wrap justify-space-around>
        <v-switch v-model="counterEn" class="ma-1"></v-switch>
        <v-slider v-model="counter" label="Counter"></v-slider>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-text-field
        v-model="model"
        :label="label"
        :hint="hint"
        :placeholder="placeholder"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :solo="solo"
        :single-line="singleLine"
        :filled="filled"
        :clearable="clearable"
        :browser-autocomplete="browserAutocomplete"
        :loading="loading"
        :flat="flat"
        :counter="counterEn ? counter : false"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      Value: {{ model }}
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      model: 'I\'m a text field',
      label: 'Hey!',
      hint: 'Customize me!',
      placeholder: '',
      shaped: false,
      outlined: false,
      rounded: false,
      solo: false,
      singleLine: true,
      filled: false,
      clearable: false,
      browserAutocomplete: false,
      loading: false,
      flat: false,
      counterEn: false,
      counter: 0
    })
  }
</script>
