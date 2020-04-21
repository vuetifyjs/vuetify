<template>
  <base-section
    id="home-made-with-vuetify"
    v-intersect.once="{
      handler: init,
      options: { rootMargin: '600px 0px' }
    }"
  >
    <home-cards
      :cards="featured"
      :value="!featured.length"
      heading="Vuetify.Home.madeWithVuetify"
      subheading="Vuetify.Home.madeWithVuetifyText"
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
          height="65px"
          src="https://cdn.vuetifyjs.com/images/home/powered-by-madewithvue-1.svg"
        />
      </a>
    </div>
  </base-section>
</template>

<script>
  export default {
    name: 'HomeMadeWithVuetify',

    provide: { id: 'home-made-with-vuetify' },

    components: {
      HomeCards: () => import('./Cards'),
    },

    data: () => ({ featured: [] }),

    computed: {
      computedFeatured () {
        return this.featured.slice(0, 6)
      },
    },

    methods: {
      init (
        entries,
        observer,
        isVisible,
      ) {
        if (!isVisible) return

        const storage = localStorage.getItem('vuetify-featured-mwvjs-projects') || '{}'
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
            description: feature.teaser,
            query: '',
            src: feature.image,
            title: feature.title,
            url: feature.url,
          }
        })

        this.featured = this.shuffle(featured).slice(0, 4)

        const storage = {
          featured: this.featured,
          updatedAt: Date.now(),
        }

        localStorage.setItem('vuetify-featured-mwvjs-projects', JSON.stringify(storage))
      },
      shuffle (array) {
        let currentIndex = array.length
        let randomIndex
        let temporaryValue

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
