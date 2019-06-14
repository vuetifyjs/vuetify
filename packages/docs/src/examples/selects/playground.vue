<template>
  <v-layout row wrap align-center justify-space-around>
    <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
    <v-switch v-model="readonly" class="ma-2" label="Readonly"></v-switch>
    <v-switch v-model="chips" class="ma-2" label="Chips"></v-switch>
    <v-switch v-model="multiple" class="ma-2" label="Multiple"></v-switch>
    <v-switch v-model="appendIcon" class="ma-2" label="Append icon"></v-switch>
    <v-switch v-model="prependIcon" class="ma-2" label="Prepend icon"></v-switch>
    <v-flex xs12>
      <v-select
        :items="items"
        :disabled="disabled"
        :readonly="readonly"
        :chips="chips"
        :multiple="multiple"
        :append-icon="appendIcon ? 'mdi-plus' : ''"
        :prepend-icon="prependIcon ? 'mdi-minus' : ''"
        label="Label"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      disabled: false,
      readonly: false,
      chips: false,
      multiple: false,
      appendIcon: false,
      prependIcon: false,
    }),
  }
</script>
