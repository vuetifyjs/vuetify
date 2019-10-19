<template>
  <div class="text-center home-cards">
    <base-subheading>{{ heading }}</base-subheading>

    <v-container class="pa-0 mb-6">
      <v-row
        align="center"
        justify="center"
      >
        <template v-for="(card, i) in cards">
          <v-col
            :key="i"
            cols="auto"
          >
            <v-hover>
              <template v-slot="{ hover }">
                <v-skeleton-loader
                  :loading="internalValue"
                  min-width="550"
                  width="100%"
                  type="image"
                >
                  <base-card
                    v-if="Object(card) === card"
                    :href="`${card.url}?ref=vuetifyjs.com${card.query || ''}`"
                    :title="`Link to ${card.title}`"
                    class="v-card--mwvjs mx-auto"
                    width="450"
                    max-width="calc(100% - 32px)"
                    rel="noopener"
                    target="_blank"
                    @click="$ga.event('home', 'click', 'card', card.title)"
                  >
                    <v-img
                      :alt="card.title"
                      :src="card.src"
                      height="300"
                      width="100%"
                    >
                      <v-fade-transition>
                        <v-overlay
                          v-show="hover"
                          absolute
                          opacity="0.9"
                        >
                          <h3
                            class="headline mb-2"
                            v-text="card.title"
                          />
                          <div
                            class="overline grey--text mb-12 px-6"
                            v-text="card.description"
                          />
                          <v-btn
                            :aria-label="`Link to ${card.title}`"
                            color="success"
                            fab
                            large
                            tabindex="-1"
                          >
                            <v-icon>mdi-open-in-new</v-icon>
                          </v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-img>
                  </base-card>
                </v-skeleton-loader>
              </template>
            </v-hover>
          </v-col>

          <v-col
            v-if="i % 2 === 1"
            :key="`break-${i}`"
            cols="12"
            class="pa-0"
          />
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  // Mixins
  import Proxyable from 'vuetify/lib/mixins/proxyable'

  export default {
    name: 'HomeCards',

    mixins: [Proxyable],

    props: {
      cards: {
        type: Array,
        default: () => ([]),
      },
      heading: {
        type: String,
        default: undefined,
      },
    },
  }
</script>

<style lang="sass">
  .v-card--mwvjs:focus .v-overlay
    display: flex !important
</style>
