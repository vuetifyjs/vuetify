<template>
  <v-container
    id="home-sponsors"
    class="pa-0"
    fluid
    tag="section"
  >
    <supporter-group
      v-if="tier.includes(0)"
      :group="supporters['Premiere']"
      :title="!hideTitles ? 'Premiere' : undefined"
      :class="classes"
      :x-large="!compact"
    />

    <supporter-group
      v-if="tier.includes(1)"
      :group="supporters['Diamond']"
      :title="!hideTitles ? 'Diamond' : undefined"
      :class="classes"
      :large="!compact"
    />

    <supporter-group
      v-if="tier.includes(2)"
      :group="supporters['Platinum']"
      :title="!hideTitles ? 'Platinum' : undefined"
      :class="classes"
    />

    <supporter-group
      v-if="tier.includes(3)"
      :group="supporters['Gold']"
      :title="!hideTitles ? 'Gold' : undefined"
      :class="classes"
      small
    />

    <supporter-group
      v-if="tier.includes(4)"
      :group="supporters.affiliate"
      :title="!hideTitles ? 'Affiliate' : undefined"
      :class="classes"
      small
    />

    <supporter-group
      v-if="tier.includes(5)"
      :group="supporters.service"
      :title="!hideTitles ? 'Service' : undefined"
      small
    />
  </v-container>
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    components: {
      SupporterGroup: () => import(
        /* webpackChunkName: "supportergroup" */
        '@/components/supporters/SupporterGroup'
      ),
    },

    props: {
      compact: {
        type: Boolean,
        default: false,
      },
      dense: {
        type: Boolean,
        default: false,
      },
      hideTitles: {
        type: Boolean,
        default: false,
      },
      tier: {
        type: Array,
        default: () => ([0, 1, 2, 3, 4, 5]),
      },
    },

    computed: {
      ...sync('supporters/supporters'),
      classes () {
        return {
          'mb-0': this.dense,
          'mb-5': !this.dense,
        }
      },
    },

    created () {
      this.supporters = require('@/data/api/supporters.json') || {}
    },
  }
</script>
