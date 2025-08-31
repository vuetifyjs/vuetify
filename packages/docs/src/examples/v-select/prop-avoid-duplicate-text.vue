<template>
  <v-app>
    <v-container>
      <v-select v-model="model" :items="items">
        <template #item="{props, item}">
          <v-list-item v-bind="props" :title="null">
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
        </template>
      </v-select>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      model: 'Foo',
    }),
  }
</script>
