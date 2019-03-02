<template>
  <v-layout
    d-flex
    justify-center
  >
    <v-menu
      v-model="showMenu"
      absolute
      offset-y
      style="max-width: 600px"
    >
      <v-card
        slot="activator"
        class="portrait"
        img="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
        height="300"
        width="600"
      ></v-card>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click=""
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      showMenu: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    })
  }
</script>
