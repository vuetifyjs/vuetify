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
        :value="showBadge"
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
  import { differenceInDays, parseISO } from 'date-fns'

  export default {
    name: 'JobsLink',

    computed: {
      name: get('route/name'),
      newJobs: get('jobs/newJobs'),
      notification: get('user/last@jobs'),
      page: get('route/params@page'),
      icon () {
        return this.page === 'jobs-for-vue'
          ? '$mdiBriefcaseVariant'
          : '$mdiBriefcaseVariantOutline'
      },
      showBadge () {
        return (
          this.newJobs.length &&
          (
            !this.notification ||
            differenceInDays(Date.now(), parseISO(this.notification)) < 3
          )
        )
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
