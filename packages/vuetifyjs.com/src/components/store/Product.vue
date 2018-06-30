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
            <div
              class="headline green--text text--darken-2"
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
    isOnSale,
    shortId
  } from '@/util/helpers'

  export default {
    props: {
      price: {
        type: String,
        required: true
      },
      src: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
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
      isOnSale () {
        return isOnSale(this.value.variants)
      },
      shortId () {
        return shortId(this.value.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // Temp fix until update
  .v-divider--vertical
    max-width: 1px
</style>
