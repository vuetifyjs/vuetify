<template>
  <div>
    <v-toolbar color="cyan" dark tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-tabs
        color="cyan"
        slot="extension"
        v-model="tab"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab
          v-for="(item, i) in items"
          :key="i"
          :href="'#tab-' + (i + 1)"
        >
          {{ item }}
        </v-tab>
        <v-menu :nudge-width="100" left bottom>
          <v-tab slot="activator">
            Menu
            <v-icon>arrow_drop_down</v-icon>
          </v-tab>
          <v-list class="grey lighten-3">
            <v-list-tile
              tag="a"
              v-for="n in 4"
              :key="n"
              @click=""
            >
              Item {{ n }}
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 5"
        :key="i"
        :id="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news'
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
