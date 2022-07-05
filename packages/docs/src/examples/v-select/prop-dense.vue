<template>
  <div class="d-flex flex-column">
    <v-select
      :items="items"
      label="Compact"
      density="compact"
    ></v-select>

    <v-select
      :items="items"
      label="Comfortable"
      density="comfortable"
    ></v-select>

    <v-select
      :items="items"
      label="Default"
    ></v-select>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>
