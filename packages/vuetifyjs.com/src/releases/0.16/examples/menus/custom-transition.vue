<template>
  <div class="text-xs-center">
    <v-menu
      origin="center center"
      transition="scale-transition"
      bottom
    >
      <v-btn color="primary" dark slot="activator">
        Scale Transition
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-x-transition"
      bottom
      right
    >
      <v-btn color="primary" dark slot="activator" class="deep-orange">
        Slide X Transition
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-y-transition"
      bottom
    >
      <v-btn color="primary" dark slot="activator" class="purple">
        Slide Y Transition
      </v-btn>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="">
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
