<template>
  <app-tooltip-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'resources',
        page: 'jobs-for-vue'
      }
    }"
    class="jobs-link"
    path="jobs"
    @click="onClick"
  >
    <template #icon>
      <v-badge
        :value="newJobs.length"
        color="#ED561B"
        dot
        left
        overlap
      >
        <v-icon
          class="mx-1"
          v-text="icon"
        />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script>
  // Utilities
  import { call, get } from 'vuex-pathify'

  export default {
    name: 'JobsLink',

    computed: {
      name: get('route/name'),
      newJobs: get('jobs/newJobs'),
      page: get('route/params@page'),
      icon () {
        return this.page === 'jobs-for-vue'
          ? '$mdiBriefcaseVariant'
          : '$mdiBriefcaseVariantOutline'
      },
    },

    async mounted () {
      this.fetch()
    },

    methods: {
      fetch: call('jobs/fetch'),
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'jobs',
          value: this.name,
        })
      },
    },
  }
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
