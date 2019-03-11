<template>
  <v-select
    v-model="value"
    :items="items"
    label="Select Item"
    multiple
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index === 0">
        <span>{{ item }}</span>
      </v-chip>
      <span
        v-if="index === 1"
        class="grey--text caption"
      >(+{{ value.length - 1 }} others)</span>
    </template>
  </v-select>
</template>
<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'],
      value: ['foo', 'bar', 'fizz']
    })
  }
</script>
