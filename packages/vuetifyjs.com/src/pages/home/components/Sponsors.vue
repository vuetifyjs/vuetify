<template>
  <v-card flat color="grey lighten-4 pa-5 text-xs-center">
    <v-layout
      column
      mb-5
    >
      <v-subtitle-1 class="grey--text font-weight-bold">
        Patreon Sponsors
      </v-subtitle-1>

      <v-container
        v-for="(tier, i) in tiers"
        :key="i"
        grid-list-xl
      >
        <v-layout
          justify-center
          wrap
        >
          <v-flex
            v-for="sponsor in tier.supporters"
            :key="sponsor.name"
            shrink
          >
            <a
              :href="sponsor.href"
              target="_blank"
              rel="noopener"
              @click="$ga.event('home sponsor click', 'click', supporter.name)"
            >
              <v-img
                :alt="sponsor.name"
                :src="`http://cdn.vuetifyjs.com/images/${sponsor.logo}`"
                :width="i > 0 ? 120 : 160"
                class="d-flex align-center justify-center"
                contain
                height="48"
              />
            </a>
          </v-flex>
        </v-layout>
      </v-container>
      <v-flex xs12>
        <misc-sponsor-btn large />
      </v-flex>
    </v-layout>

    <v-subtitle-1 class="grey--text font-weight-bold">
      Open Collective Sponsors
    </v-subtitle-1>
  </v-card>
</template>

<script>
  // Utilities
  import {
    mapGetters
  } from 'vuex'

  export default {
    computed: {
      ...mapGetters('app', ['supporters']),
      tiers () {
        return [
          {
            name: 'Diamond',
            supporters: [...this.supporters.diamond]
          },
          {
            name: 'Palladium',
            supporters: [...this.supporters.palladium]
          },
          {
            name: 'Special',
            supporters: [...this.supporters.special]
          }
        ]
      }
    }
  }
</script>
