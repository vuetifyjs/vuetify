<template>
  <div class="text-xs-center">
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <template #activator="{ on: menu }">
        <v-btn
          color="primary"
          dark
          v-on="{ ...menu }"
        >
          Scale Transition
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-x-transition"
      bottom
      right
    >
      <template #activator="{ on: menu }">
        <v-btn
          class="deep-orange"
          color="primary"
          dark
          v-on="{ ...menu }"
        >
          Slide X Transition
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <template #activator="{ on: menu }">
        <v-btn
          class="purple"
          color="primary"
          dark
          v-on="{ ...menu }"
        >
          Slide Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    })
  }
</script>
