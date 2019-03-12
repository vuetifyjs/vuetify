<template>
  <v-layout
    id="patrons"
    align-center
    tag="section"
    wrap
  >
    <v-flex>
      <v-container
        fluid
        grid-list-md
        pa-0
      >
        <supporter-group
          v-if="tier >= 1"
          :group="supporters.diamond"
          :title="!hideTitles ? 'Diamond' : undefined"
          :class="classes"
          :large="!compact"
          :small="compact"
        />

        <supporter-group
          v-if="tier >= 2"
          :group="supporters.palladium"
          :title="!hideTitles ? 'Palladium' : undefined"
          :class="classes"
        />

        <supporter-group
          v-if="tier >= 3"
          :group="supporters.gold"
          :title="!hideTitles ? 'Gold' : undefined"
          :class="classes"
          small
        />

        <supporter-group
          v-if="tier >= 4"
          :group="supporters.affiliates"
          :title="!hideTitles ? 'Affiliate' : undefined"
          :class="classes"
          small
        />

        <supporter-group
          v-if="tier >= 5"
          :group="supporters.service"
          :title="!hideTitles ? 'Service' : undefined"
          small
        />
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    components: {
      SupporterGroup: () => import('@/components/supporters/SupporterGroup')
    },

    props: {
      compact: {
        type: Boolean,
        default: false
      },
      dense: {
        type: Boolean,
        default: false
      },
      hideTitles: {
        type: Boolean,
        default: false
      },
      tier: {
        type: [Number, String],
        default: 10
      }
    },

    computed: {
      ...mapState('app', ['supporters']),
      classes () {
        return {
          'mb-0': this.dense,
          'mb-5': !this.dense
        }
      }
    },

    async created () {
      if (this.$ssrContext || Object.keys(this.supporters).length) return

      const supporters = require('@/data/api/supporters.json')

      // const supporters = await fetch('https://cdn.vuetifyjs.com/supporters.json', {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }).then(res => res.json())

      if (supporters) this.setSupporters(supporters)
    },

    methods: {
      ...mapMutations('app', ['setSupporters'])
    }
  }
</script>
