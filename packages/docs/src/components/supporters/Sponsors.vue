<template>
  <v-container
    class="pa-0"
    tag="section"
  >
    <supporters-supporter-group
      v-show="tier.includes(1)"
      :group="1"
      :title="!hideTitles ? 'Premiere' : undefined"
      :class="classes"
      :x-large="!compact"
    />

    <supporters-supporter-group
      v-show="tier.includes(2)"
      :group="2"
      :title="!hideTitles ? 'Diamond' : undefined"
      :class="classes"
      :large="!compact"
    />

    <supporters-supporter-group
      v-show="tier.includes(3)"
      :group="3"
      :title="!hideTitles ? 'Platinum' : undefined"
      :class="classes"
    />

    <supporters-supporter-group
      v-show="tier.includes(4)"
      :group="4"
      :title="!hideTitles ? 'Gold' : undefined"
      :class="classes"
      small
    />

    <supporters-supporter-group
      v-show="tier.includes(5)"
      :group="5"
      :title="!hideTitles ? 'Affiliate' : undefined"
      :class="classes"
      small
    />

    <supporters-supporter-group
      v-show="tier.includes(6)"
      :group="6"
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
        default: () => ([1, 2, 3, 4, 5, 6, 7]),
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
