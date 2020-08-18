<template>
  <v-row justify="center">
    <v-col
      v-for="(project, i) in featured"
      :key="i"
      cols="12"
      sm="6"
      md="4"
    >
      <a
        :href="project.href"
        class="text--primary text-decoration-none"
        rel="noopener"
        target="_blank"
      >
        <app-img
          :alt="project.name"
          :name="project.name"
          :src="project.src"
          min-height="127"
        />
      </a>
    </v-col>

    <v-col
      class="mt-6"
      cols="auto"
    >
      <a
        aria-label="Link to madewithvuejs.com"
        href="https://madewithvuejs.com/vuetify?ref=vuetifyjs.com"
        rel="noopener"
        target="_blank"
        title="Link to madewithvuejs.com"
      >
        <v-img
          alt="Powered by madewithvuejs.com"
          contain
          height="65px"
          src="https://cdn.vuetifyjs.com/images/home/powered-by-madewithvue-1.svg"
        />
      </a>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'VuetifyProjects',

    data: () => ({ featured: [] }),

    created () {
      this.init()
    },

    methods: {
      init () {
        fetch('https://madewithvuejs.com/api/tag/vuetify', {
          method: 'get',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(({ data }) => {
            if (!data) return

            this.featured = data.map(feature => {
              return {
                description: feature.teaser,
                query: '',
                src: feature.image,
                name: feature.title,
                href: feature.url,
              }
            })
          })
          .catch(err => console.log(err))
      },
    },
  }
</script>
