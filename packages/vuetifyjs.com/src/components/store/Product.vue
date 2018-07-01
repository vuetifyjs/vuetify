<template>
  <v-card
    :to="{ name: 'store/Product', params: { id: shortId }}"
    hover
  >
    <v-container>
      <v-layout>
        <v-flex xs5>
          <v-card-media
            :src="src"
            contain
            height="150"
          />
        </v-flex>
        <v-flex
          d-flex
          xs7
        >
          <v-divider
            class="mr-4"
            vertical
          />
          <div>
            <h3
              class="headline font-weight-medium mb-2"
              v-text="title"
            />
            <div
              class="grey--text mb-4"
              v-text="description"
            />
            <span
              v-if="compareAtPrice"
              class="headline grey--text text--darken-2 text--line-through"
              v-text="`$${compareAtPrice}`"
            />
            <span
              :class="{
                'red--text text--lighten-2': compareAtPrice,
                'grey--text text--darken-2': !compareAtPrice
              }"
              class="headline"
              v-text="`$${price}`"
            />
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  // Utilities
  import {
    shortId
  } from '@/util/helpers'

  export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },

    computed: {
      description () {
        const { description } = this.value

        if (description.length < 55) return description

        return description.slice(0, 52) + '...'
      },
      price () {
        return this.value.variants[0].price
      },
      compareAtPrice () {
        for (const variant of this.value.variants) {
          const diff = parseFloat(variant.price) < parseFloat(variant.compareAtPrice)

          if (diff) return variant.compareAtPrice
        }

        return false
      },
      shortId () {
        return shortId(this.value.id)
      },
      src () {
        return this.value.variants[0].image.src
      },
      title () {
        return this.value.title
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // Temp fix until update
  .v-divider--vertical
    max-width: 1px
</style>
