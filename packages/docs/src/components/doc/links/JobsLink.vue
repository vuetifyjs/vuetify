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
  >
    <template #icon>
      <v-badge
        :value="newJobs.length"
        color="red"
        left
        overlap
      >
        <template #badge>
          {{ newJobs.length }}
        </template>

        <v-icon v-text="icon" />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script>
  // Utilities
  import { call, get } from 'vuex-pathify'
  import { wait } from '@/util/helpers'

  export default {
    name: 'JobsLink',

    computed: {
      initializing: get('app/initializing'),
      newJobs: get('jobs/newJobs'),
      page: get('route/params@page'),
      icon () {
        return this.page === 'jobs-for-vue'
          ? '$mdiBriefcaseVariant'
          : '$mdiBriefcaseVariantOutline'
      },
    },

    async mounted () {
      await this.initializing
      await wait(3000)

      this.fetch()
    },

    methods: { fetch: call('jobs/fetch') },
  }
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
