<template>
  <v-select
    :items="['Foo', 'Bar', 'Fizz', 'Buzz']"
    label="Fizzbuzz"
  >
    <template v-slot:item="{ item, attrs, on }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-title
          :id="attrs['aria-labelledby']"
          v-text="item"
        ></v-list-item-title>
      </v-list-item>
    </template>
  </v-select>
</template>
