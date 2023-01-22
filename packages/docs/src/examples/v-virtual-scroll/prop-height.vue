<template>
  <div style="display: flex; height: 200px;">
    <v-virtual-scroll :items="items">
      <template v-slot:default="{ item }">
        Virtual Item {{ item }}
      </template>
    </v-virtual-scroll>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 1000 }, (k, v) => v + 1),
    }),
  }
</script>
