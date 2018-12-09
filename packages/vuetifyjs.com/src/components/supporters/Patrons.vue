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
          large
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
  const supporters = require('@/data/supporters.json')

  export default {
    components: {
      SupporterGroup: () => import('@/components/supporters/SupporterGroup')
    },

    props: {
      dense: {
        type: Boolean,
        default: false
      },
      hideTitles: {
        type: Boolean,
        default: false
      },
      tier: {
        type: Number,
        default: 10
      }
    },

    data: () => ({
      supporters
    }),

    computed: {
      classes () {
        return {
          'mb-2': this.dense,
          'mb-5': !this.dense
        }
      }
    }
  }
</script>
