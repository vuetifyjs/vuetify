<template>
  <v-card
    v-if="featured.length > 0"
    class="text-xs-center py-4"
    flat
  >
    <h4
      class="font-weight-medium grey--text"
      v-text="$t('Vuetify.Home.madeWithVuetify')"
    />

    <v-container
      grid-list-xl
      mb-3
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
                elevation="24"
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
                        class="overline grey--text mb-5 px-4"
                        v-text="feature.teaser"
                      />
                      <v-btn
                        :title="`Link to ${feature.title}`"
                        :href="`${feature.url}?ref=vuetifyjs.com`"
                        color="success"
                        fab
                        large
                        target="_blank"
                        rel="noopener"
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

    <div class="text-xs-center">
      <a
        href="https://madewithvuejs.com/vuetify?ref=vuetifyjs.com"
        target="_blank"
        rel="noopener"
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
      featured: []
    }),

    computed: {
      computedFeatured () {
        return this.featured.slice(0, 6)
      }
    },

    // TODO: Remove when v-img
    // supports lazy loading
    mounted () {
      this.$nextTick(this.init)
    },

    methods: {
      init () {
        fetch('https://madewithvuejs.com/api/tag/vuetify', {
          method: 'get',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(res => {
            this.featured = this.setFeatured(res)
          })
          .catch(err => console.log(err))
      },
      setFeatured (data) {
        if (!data) return []
        const featured = data.data.map(f => {
          f.hover = false
          return f
        })
        return this.shuffle(featured)
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
      }
    }
  }
</script>
