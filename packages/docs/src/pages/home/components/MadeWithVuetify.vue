<template>
  <v-card
    v-observe.once="init"
    class="text-center py-12"
    flat
  >
    <h3
      class="font-weight-medium grey--text text--darken-2"
      v-text="$t('Vuetify.Home.madeWithVuetify')"
    />

    <v-container
      v-if="featured.length > 0"
      grid-list-xl
      mb-4
    >
      <v-layout
        align-center
        fill-height
        justify-center
        wrap
      >
        <v-flex
          v-for="(feature, i) in computedFeatured"
          :key="i"
          xs12
          sm6
          md4
        >
          <v-hover>
            <template v-slot:default="{ hover }">
              <v-card
                :title="`Link to ${feature.title}`"
                :href="`${feature.url}?ref=vuetifyjs.com`"
                class="v-card--mwvjs"
                elevation="24"
                target="_blank"
                rel="noopener"
                @click="$ga.event('home', 'click', 'mwvjs', feature.title)"
              >
                <v-img
                  :alt="feature.title"
                  :src="feature.image"
                  height="300px"
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
                        v-text="feature.title"
                      />
                      <div
                        class="overline grey--text mb-12 px-6"
                        v-text="feature.teaser"
                      />
                      <v-btn
                        :aria-label="`Link to ${feature.title}`"
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
              </v-card>
            </template>
          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-center">
      <a
        aria-label="Link to madewithvuejs.com"
        href="https://madewithvuejs.com/vuetify?ref=vuetifyjs.com"
        rel="noopener"
        target="_blank"
        title="Link to madewithvuejs.com"
        @click="$ga.event('home', 'click', ' mwvjs')"
      >
        <v-img
          alt="Powered by madewithvuejs.com"
          contain
          src="https://cdn.vuetifyjs.com/images/home/powered-by-madewithvue-1.svg"
          height="65px"
        />
      </a>
    </div>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      featured: [],
    }),

    computed: {
      computedFeatured () {
        return this.featured.slice(0, 6)
      },
    },

    methods: {
      init (entries) {
        for (const entry of entries) {
          if (!entry.isIntersecting) return
        }

        fetch('https://madewithvuejs.com/api/tag/vuetify', {
          method: 'get',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(this.setFeatured)
          .catch(err => console.log(err))
      },
      setFeatured (data) {
        const featured = !data ? [] : data.data.map(f => {
          f.hover = false
          return f
        })

        this.featured = this.shuffle(featured)
      },
      shuffle (array) {
        let currentIndex = array.length
        let temporaryValue
        let randomIndex
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          // And swap it with the current element.
          temporaryValue = array[currentIndex]
          array[currentIndex] = array[randomIndex]
          array[randomIndex] = temporaryValue
        }
        return array
      },
    },
  }
</script>

<style lang="sass">
  .v-card--mwvjs:focus .v-overlay
    display: flex !important
</style>
