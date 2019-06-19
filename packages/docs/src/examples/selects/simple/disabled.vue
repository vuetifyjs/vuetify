<template>
  <v-layout align-center>
    <v-flex xs12>
      <v-select
        :items="items"
        disabled
        label="Disabled"
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>
