<template>
  <v-container>
    <v-select v-model="model" :items="items">
      <template v-slot:item="{ props, item }">
        <v-list-item v-bind="props" :title="null">
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-select>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      model: 'Foo',
    }),
  }
</script>
