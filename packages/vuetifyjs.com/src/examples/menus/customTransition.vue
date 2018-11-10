<template>
  <div class="text-xs-center">
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
        Scale Transition
      </v-btn>

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
      <v-btn
        slot="activator"
        class="deep-orange"
        color="primary"
        dark
      >
        Slide X Transition
      </v-btn>

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
      <v-btn
        slot="activator"
        class="purple"
        color="primary"
        dark
      >
        Slide Y Transition
      </v-btn>
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
