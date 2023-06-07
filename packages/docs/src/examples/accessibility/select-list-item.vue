<template>
  <v-select
    :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
    label="Fizzbuzz"
  >
    <template v-slot:item="{ item, props }">
      <v-list-item v-bind="props">
        <template v-slot:title>
          {{ item.raw }}
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
