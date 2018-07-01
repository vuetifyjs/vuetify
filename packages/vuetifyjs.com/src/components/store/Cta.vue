<template>
  <v-card
    class="elevation-8 mb-5"
    tile
  >
    <v-layout
      fill-height
      wrap
    >
      <v-flex
        md6
        xs12
      >
        <v-card
          flat
          height="100%"
          tile
        >
          <v-card-media
            height="100%"
            src="/doc-images/store/angryman.png"
          />
        </v-card>
      </v-flex>

      <v-flex
        md6
        xs12
      >
        <v-layout
          fill-height
          wrap
        >
          <v-flex
            v-for="(highlight, i) in highlights"
            :key="i"
            xs6
          >
            <v-card
              :to="{
                name: 'store/Product',
                params: { id: shortId(highlight.id) }
              }"
              :color="highlight.value ? 'blue lighten-4' : ''"
              class="pa-3"
              flat
              height="auto"
              tile
              style="transition: .2s ease;"
              @mouseenter="highlight.value = true"
              @mouseleave="highlight.value = false"
            >
              <v-card-media
                :src="highlight.variants[0].image.src"
                contain
                height="135px"
              >
                <div
                  v-if="highlight.isOnSale"
                  class="grow text-xs-right"
                >
                  <v-chip
                    class="white--text"
                    color="red lighten-2"
                    disabled
                    small
                  >
                    {{ $t('Vuetify.Store.onSale') }}
                  </v-chip>
                </div>
              </v-card-media>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  // Helpers
  import { mapState } from 'vuex'
  import {
    isOnSale,
    shortId
  } from '@/util/helpers'

  export default {
    data: () => ({
      highlights: []
    }),

    computed: {
      ...mapState('store', ['products'])
    },

    watch: {
      products: {
        immediate: true,
        handler () {
          this.highlights = this.products.map(product =>
            Object.assign({
              isOnSale: isOnSale(product.variants),
              value: false
            }, product)
          ).sort((a, b) => {
            return a.isOnSale
              ? -1
              : b.isOnSale ? 1 : 0
          }).slice(0, 4)
        }
      }
    },

    methods: {
      shortId: shortId
    }
  }
</script>
