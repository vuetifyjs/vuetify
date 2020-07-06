<template>
  <v-row align="center">
    <v-col cols="12">
      <v-select
        :items="items"
        readonly
        label="Read-only"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>
