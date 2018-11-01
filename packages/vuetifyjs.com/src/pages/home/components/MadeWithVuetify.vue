<template>
  <v-card
    class="pa-5 text-xs-center"
    flat
  >
    <v-subtitle-1 class="grey--text font-weight-bold">
      Made With Vuetify
    </v-subtitle-1>

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
          <v-card
            :href="`${feature.url}?ref=vuetifyjs.com`"
            :img="feature.image"
            class="elevation-24"
            height="300px"
            target="_blank"
            rel="noopener"
            @click="$ga.event('home mwvjs click', 'click', feature.title)"
          />
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
      this.$http({
        method: 'GET',
        url: 'https://madewithvuejs.com/api/tag/vuetify',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.featured = this.setFeatured(res.data)
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
