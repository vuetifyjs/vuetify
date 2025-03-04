<template>
  <div class="d-flex justify-center">
    <v-menu
      v-model="showMenu"
      style="max-width: 600px"
    >
      <template v-slot:activator="{ props }">
        <v-card
          class="portrait"
          height="300"
          image="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
          width="600"
          v-bind="props"
        ></v-card>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const showMenu = ref(false)

  const items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ]
</script>

<script>
  export default {
    data: () => ({
      showMenu: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
