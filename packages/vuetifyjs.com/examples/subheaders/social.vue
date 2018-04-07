<template>
  <v-card flat tile>
    <v-toolbar color="cyan" dark>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container
      fluid
      grid-list-md
      grey
      lighten-4
      v-for="type in types"
      :key="type"
    >
      <v-subheader>{{ type }}</v-subheader>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex
          xs12
          sm6
          md4
          v-for="card in cards"
          :key="card"
        >
          <v-card>
            <v-card-media height="300px" :src="`https://picsum.photos/200/300?image=${getImage()}`">
              <span class="headline white--text pl-3 pt-3" v-text="card.title"></span>
            </v-card-media>
            <v-card-actions class="white justify-center">
              <v-btn
                class="white--text"
                fab
                icon
                small
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      types: ['Places to Be', 'Places to See'],
      cards: ['Good', 'Best', 'Finest'],
      socials: [
        {
          icon: 'fab fa-facebook',
          color: 'indigo'
        },
        {
          icon: 'fab fa-linkedin',
          color: 'cyan darken-1'
        },
        {
          icon: 'fab fa-instagram',
          color: 'red lighten-3'
        }
      ]
    }),

    methods: {
      getImage () {
        const min = 550
        const max = 560

        return Math.floor(Math.random() * (max - min + 1)) + min
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
  "js": ["https://use.fontawesome.com/releases/v5.0.6/js/all.js"]
  }
</codepen-resources>
