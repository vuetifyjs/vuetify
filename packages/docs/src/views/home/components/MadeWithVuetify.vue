<template>
  <base-section
    id="home-made-with-vuetify"
    v-intersect.once="{
      options: {
        rootMargin: '1000px 1000px 1000px 1000px'
      },
      handler: init
    }"
  >
    <home-cards
      heading="Vuetify.Home.madeWithVuetify"
      subheading="Vuetify.Home.madeWithVuetifyText"
      :cards="featured"
      :value="!featured.length"
    />

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
  </base-section>
</template>

<script>
  export default {
    name: 'HomeMadeWithVuetify',

    components: {
      HomeCards: () => import('./Cards'),
    },

    data: () => ({
      featured: [],
    }),

    computed: {
      computedFeatured () {
        return this.featured.slice(0, 6)
      },
    },

    watch: {
      featured (val) {
      },
    },

    methods: {
      init (
        entries,
        observer,
        isVisible,
      ) {
        if (!isVisible) return

        const storage = localStorage.getItem('vuetify__featured__projects') || '{}'
        const featured = JSON.parse(storage)
        // Cache for 24hrs
        const cacheTime = 24 * 60 * 60 * 1000

        if (
          featured.updatedAt &&
          (featured.updatedAt + cacheTime) > Date.now()
        ) {
          this.featured = featured.featured

          return
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
        if (!data) return []

        const featured = data.data.map(feature => {
          return {
            title: feature.title,
            description: feature.teaser,
            src: feature.image,
            url: feature.url,
            query: '',
          }
        })

        this.featured = this.shuffle(featured).slice(0, 4)

        const storage = {
          updatedAt: Date.now(),
          featured: this.featured,
        }

        localStorage.setItem('vuetify__featured__projects', JSON.stringify(storage))
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
