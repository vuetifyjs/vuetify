<template>
  <app-tooltip-btn
    to="/resources/jobs-for-vue/"
    class="jobs-link"
    path="jobs"
    @click="onClick"
  >
    <template #icon>
      <v-badge
        :value="newJobs.length"
        color="#ED561B"
        dot
        location="top-end"
      >
        <v-icon
          class="mx-1"
          icon="mdi-briefcase-variant-outline"
        />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script lang="ts">
  // Utilities
  // import { call, get } from 'vuex-pathify'
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  export default {
    name: 'JobsLink',

    components: { AppTooltipBtn },

    // computed: {
    //   name: get('route/name'),
    //   newJobs: get('jobs/newJobs'),
    //   page: get('route/params@page'),
    //   icon () {
    //     return this.page === 'jobs-for-vue'
    //       ? '$mdiBriefcaseVariant'
    //       : '$mdiBriefcaseVariantOutline'
    //   },
    // },

    // async mounted () {
    //   this.fetch()
    // },

    // methods: {
    //   fetch: call('jobs/fetch'),
    // },

    setup () {
      function onClick () {
        // this.$gtag.event('click', {
        //   event_category: 'toolbar',
        //   event_label: 'jobs',
        //   value: route.name,
        // })
      }

      return {
        onClick,
        newJobs: [],
      }
    },
  }
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
