<template>
  <v-select
    v-model="selectedFruits"
    :items="fruits"
    label="Favorite Fruits"
    multiple
  >
    <template v-slot:prepend-item>
      <v-list-tile
        ripple
        @click="toggle"
      >
        <v-list-tile-action>
          <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:append-item>
      <v-divider class="mb-2"></v-divider>
      <v-list-tile disabled>
        <v-list-tile-avatar color="grey lighten-3">
          <v-icon>mdi-food-apple</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content v-if="likesAllFruit">
          <v-list-tile-title>Holy smokes, someone call the fruit police!</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-content v-else-if="likesSomeFruit">
          <v-list-tile-title>Fruit Count</v-list-tile-title>
          <v-list-tile-sub-title>{{ selectedFruits.length }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-content v-else>
          <v-list-tile-title>
            How could you not like fruit?
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Go ahead, make a selection above!
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-select>
</template>

<script>
  export default {
    data: () => ({
      fruits: [
        'Apples',
        'Apricots',
        'Avocado',
        'Bananas',
        'Blueberries',
        'Blackberries',
        'Boysenberries',
        'Bread fruit',
        'Cantaloupes (cantalope)',
        'Cherries',
        'Cranberries',
        'Cucumbers',
        'Currants',
        'Dates',
        'Eggplant',
        'Figs',
        'Grapes',
        'Grapefruit',
        'Guava',
        'Honeydew melons',
        'Huckleberries',
        'Kiwis',
        'Kumquat',
        'Lemons',
        'Limes',
        'Mangos',
        'Mulberries',
        'Muskmelon',
        'Nectarines',
        'Olives',
        'Oranges',
        'Papaya',
        'Peaches',
        'Pears',
        'Persimmon',
        'Pineapple',
        'Plums',
        'Pomegranate',
        'Raspberries',
        'Rose Apple',
        'Starfruit',
        'Strawberries',
        'Tangerines',
        'Tomatoes',
        'Watermelons',
        'Zucchini'
      ],
      selectedFruits: []
    }),

    computed: {
      likesAllFruit () {
        return this.selectedFruits.length === this.fruits.length
      },
      likesSomeFruit () {
        return this.selectedFruits.length > 0 && !this.likesAllFruit
      },
      icon () {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectedFruits = []
          } else {
            this.selectedFruits = this.fruits.slice()
          }
        })
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
