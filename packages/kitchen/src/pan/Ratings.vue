<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Simple
      </h3>
      <v-flex align-self-center>
        <v-rating value="3" />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Dense
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="3"
          dense
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Colors
      </h3>
      <v-flex>
        <v-layout
          row
          justify-space-around
        >
          <v-rating
            value="1"
            color="success"
          />
          <v-rating
            value="3"
            color="primary"
          />
          <v-rating
            value="5"
            color="red darken-2"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Background colors
      </h3>
      <v-flex>
        <v-layout
          row
          justify-space-around
        >
          <v-rating
            value="1"
            background-color="success lighten-2"
          />
          <v-rating
            value="3"
            background-color="primary lighten-2"
          />
          <v-rating
            value="4"
            background-color="red lighten-2"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Colors & background colors
      </h3>
      <v-flex>
        <v-layout
          row
          justify-space-around
        >
          <v-rating
            value="1"
            color="success"
            background-color="success lighten-2"
          />
          <v-rating
            value="3"
            color="primary"
            background-color="primary lighten-2"
          />
          <v-rating
            value="4"
            color="red darken-2"
            background-color="red lighten-2"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Sizes
      </h3>
      <v-flex>
        <v-layout
          column
          align-center
        >
          <v-rating
            v-model="rating"
            background-color="purple lighten-3"
            color="purple"
            small
          />
          <v-rating
            v-model="rating"
            background-color="pink lighten-3"
            color="pink"
          />
          <v-rating
            v-model="rating"
            background-color="orange lighten-3"
            color="orange"
            medium
          />
          <v-rating
            v-model="rating"
            background-color="green lighten-3"
            color="green"
            large
          />
          <v-rating
            v-model="rating"
            background-color="red lighten-3"
            color="red"
            x-large
          />
          <v-rating
            v-model="rating"
            background-color="indigo lighten-3"
            color="indigo"
            size="64"
          />
          <v-rating
            v-model="rating"
            background-color="accent lighten-1"
            color="accent"
            size="128"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Dense with different sizes
      </h3>
      <v-flex>
        <v-layout
          column
          align-center
        >
          <v-rating
            v-model="rating1"
            background-color="purple lighten-3"
            color="purple"
            small
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="pink lighten-3"
            color="pink"
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="orange lighten-3"
            color="orange"
            medium
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="green lighten-3"
            color="green"
            large
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="red lighten-3"
            color="red"
            x-large
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="indigo lighten-3"
            color="indigo"
            size="64"
            dense
          />
          <v-rating
            v-model="rating1"
            background-color="accent lighten-1"
            color="accent"
            size="128"
            dense
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom length
      </h3>
      <v-flex>
        <v-layout
          row
          justify-space-around
        >
          <v-rating
            value="1"
            length="3"
          />
          <v-rating
            value="5"
            length="7"
          />
          <v-rating
            value="7"
            length="10"
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Hover
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="2"
          hover
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Readonly
      </h3>
      <v-flex>
        <v-layout
          row
          justify-space-around
        >
          <v-rating
            value="2"
            readonly
          />
          <v-rating
            value="5"
            readonly
          />
          <v-rating
            value="4"
            readonly
          />
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Half-increment
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="1.5"
          half-increments
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Half-increment & hover
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="3.5"
          half-increments
          hover
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom icons
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="4.5"
          half-increments
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
          half-icon="mdi-heart-half-full"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Custom icons & color
      </h3>
      <v-flex align-self-center>
        <v-rating
          value="3.5"
          half-increments
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
          half-icon="mdi-heart-half-full"
          color="red lighten-1"
          background-color="red lighten-3"
        />
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Scoped slots
      </h3>
      <v-flex align-self-center>
        <v-rating value="2">
          <v-icon
            slot="item"
            slot-scope="props"
            :color="props.isFilled ? colors[props.index] : 'grey lighten-1'"
            large
            @click="props.click"
          >
            {{ props.isFilled ? 'mdi-star-circle' : 'mdi-circle-outline' }}
          </v-icon>
        </v-rating>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Usage with cards
      </h3>
      <v-flex>
        <v-card
          class="mx-auto elevation-20"
          color="purple"
          dark
          style="max-width: 400px;"
        >
          <v-layout justify-space-between>
            <v-flex xs8>
              <v-card-title primary-title>
                <div>
                  <div class="headline">
                    Halycon Days
                  </div>
                  <div>Ellie Goulding</div>
                  <div>(2013)</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-img
              class="shrink ma-2"
              contain
              height="125px"
              src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
              style="flex-basis: 125px"
            />
          </v-layout>
          <v-divider dark />
          <v-card-actions class="pa-3">
            Rate this album
            <v-spacer />
            <span class="grey--text text--lighten-2 caption mr-2">
              ({{ rating2 }})
            </span>
            <v-rating
              v-model="rating2"
              background-color="white"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
            />
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Ratings',

    data: () => ({
      rating: 4,
      rating1: 4,
      colors: ['green', 'purple', 'orange', 'indigo', 'red'],
      rating2: 4
    })
  }
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
