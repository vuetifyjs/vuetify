<template>
  <v-layout
    id="patrons"
    align-center
    tag="section"
    wrap
  >
    <v-flex xs12>
      <core-subtitle goto="patrons">patrons</core-subtitle>
    </v-flex>

    <v-flex
      xs12
      my-3
      tag="v-divider"
    />

    <v-flex>
      <v-container
        fluid
        grid-list-md
      >
        <supporter-group
          :group="supporters.diamond"
          class="mb-5"
          title="Diamond"
        />

        <supporter-group
          :group="supporters.palladium"
          class="mb-5"
          title="Palladium"
          small
        />

        <supporter-group
          :group="supporters.gold"
          class="mb-5"
          title="Gold"
          small
        />

        <supporter-group
          :group="supporters.affiliates"
          class="mb-5"
          title="Affiliate"
          small
        />

        <supporter-group
          :group="supporters.service"
          title="Service"
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

    data: () => ({
      supporters
    })
  }
</script>
