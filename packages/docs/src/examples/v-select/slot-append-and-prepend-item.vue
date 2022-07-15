<template>
  <v-container fluid>
    <v-select
      v-model="selectedFruits"
      :items="fruits"
      label="Favorite Fruits"
      multiple
    >
      <template v-slot:prepend-item>
        <v-list-item
          title="Select All"
          @click="toggle"
        >
          <template v-slot:prepend>
            <v-checkbox-btn
              :color="likesSomeFruit ? 'indigo-darken-4' : undefined"
              :indeterminate="likesSomeFruit && !likesAllFruit"
              :model-value="likesSomeFruit"
            ></v-checkbox-btn>
          </template>
        </v-list-item>

        <v-divider class="mt-2"></v-divider>
      </template>

      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>

        <v-list-item
          :subtitle="subtitle"
          :title="title"
          disabled
        >
          <template v-slot:prepend>
            <v-avatar icon="mdi-food-apple" color="primary">
              mdi-food-apple
            </v-avatar>
          </template>
        </v-list-item>
      </template>
    </v-select>
  </v-container>
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
        'Zucchini',
      ],
      selectedFruits: [],
    }),

    computed: {
      likesAllFruit () {
        return this.selectedFruits.length === this.fruits.length
      },
      likesSomeFruit () {
        return this.selectedFruits.length > 0
      },
      title () {
        if (this.likesAllFruit) return 'Holy smokes, someone call the fruit police!'

        if (this.likesSomeFruit) return 'Fruit Count'

        return 'How could you not like fruit?'
      },
      subtitle () {
        if (this.likesAllFruit) return undefined

        if (this.likesSomeFruit) return this.selectedFruits.length

        return 'Go ahead, make a selection above!'
      },
    },

    methods: {
      toggle () {
        if (this.likesAllFruit) {
          this.selectedFruits = []
        } else {
          this.selectedFruits = this.fruits.slice()
        }
      },
    },
  }
</script>
