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

        <v-icon v-text="'$mdiBriefcaseSearchOutline'" />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'JobsLink',

    computed: {
      newJobs: get('jobs/newJobs'),
    },
  }
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
