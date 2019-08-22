<template>
  <v-layout
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
          v-if="tier.includes(0)"
          :group="supporters['1500']"
          :title="!hideTitles ? '$1500/mo' : undefined"
          :class="classes"
          :x-large="!compact"
        />

        <supporter-group
          v-if="tier.includes(1)"
          :group="supporters['500']"
          :title="!hideTitles ? '$500/mo' : undefined"
          :class="classes"
          :large="!compact"
        />

        <supporter-group
          v-if="tier.includes(2)"
          :group="supporters['250']"
          :title="!hideTitles ? '$250/mo' : undefined"
          :class="classes"
        />

        <supporter-group
          v-if="tier.includes(3)"
          :group="supporters['50']"
          :title="!hideTitles ? '$50/mo' : undefined"
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
    </v-flex>
  </v-layout>
</template>

<script>
  // Utilities
  import {
    mapMutations,
    mapState,
  } from 'vuex'

  export default {
    components: {
      SupporterGroup: () => import('@/components/supporters/SupporterGroup'),
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
      ...mapState('app', ['supporters']),
      classes () {
        return {
          'mb-0': this.dense,
          'mb-5': !this.dense,
        }
      },
    },

    async created () {
      const supporters = require('@/data/api/supporters.json')

      if (supporters) this.setSupporters(supporters)
    },

    methods: {
      ...mapMutations('app', ['setSupporters']),
    },
  }
</script>
