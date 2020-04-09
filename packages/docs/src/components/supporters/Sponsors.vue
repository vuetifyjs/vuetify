<template>
  <v-container
    class="pa-0"
    tag="section"
  >
    <supporters-supporter-group
      v-show="tier.includes(0)"
      :group="supporters['Premiere']"
      :title="!hideTitles ? 'Premiere' : undefined"
      :class="classes"
      :x-large="!compact"
    />

    <supporters-supporter-group
      v-show="tier.includes(1)"
      :group="supporters['Diamond']"
      :title="!hideTitles ? 'Diamond' : undefined"
      :class="classes"
      :large="!compact"
    />

    <supporters-supporter-group
      v-show="tier.includes(2)"
      :group="supporters['Platinum']"
      :title="!hideTitles ? 'Platinum' : undefined"
      :class="classes"
    />

    <supporters-supporter-group
      v-show="tier.includes(6)"
      :group="supporters['Collective']"
      :title="!hideTitles ? 'Open Collective' : undefined"
      :class="classes"
    />

    <supporters-supporter-group
      v-show="tier.includes(3)"
      :group="supporters['Gold']"
      :title="!hideTitles ? 'Gold' : undefined"
      :class="classes"
      small
    />

    <supporters-supporter-group
      v-show="tier.includes(4)"
      :group="supporters.affiliate"
      :title="!hideTitles ? 'Affiliate' : undefined"
      :class="classes"
      small
    />

    <supporters-supporter-group
      v-show="tier.includes(5)"
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
        default: () => ([0, 1, 2, 3, 4, 5, 6]),
      },
    },

    computed: {
      supporters: sync('app/supporters'),
      classes () {
        return {
          'mb-0': this.dense,
          'mb-5': !this.dense,
        }
      },
    },
  }
</script>
