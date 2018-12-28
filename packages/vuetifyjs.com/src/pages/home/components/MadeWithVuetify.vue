<template>
  <v-card
    class="text-xs-center py-4"
    flat
  >
    <v-subtitle-1
      class="title font-weight-regular"
      v-text="$t('Vuetify.Home.madeWithVuetify')"
    />

    <v-container grid-list-xl mb-3>
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
          <a
            :href="`${feature.url}?ref=vuetifyjs.com`"
            target="_blank"
            rel="noopener"
            @click="$ga.event('home mwvjs click', 'click', feature.title)"
          >
            <v-img
              :alt="feature.title"
              :src="feature.image"
              class="elevation-24"
              height="300px"
              width="100%"
            />
          </a>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center">
      <a
        href="https://madewithvuejs.com?ref=vuetifyjs.com"
        target="_blank"
        rel="noopener"
        @click="$ga.event('home mwvjs click', 'click', 'madewithvuejs')"
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
      },
      features () {
        return this.$t('Vuetify.Home.features', 'en')
      }
    },

    mounted () {
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

    methods: {
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
