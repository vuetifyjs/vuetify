<template>
  <app-tooltip-btn
    class="jobs-link"
    path="jobs"
    @click="onClick"
  >
    <template #icon>
      <v-badge
        :model-value="newJobs.length > 0"
        color="#ED561B"
        dot
        location="top-end"
      >
        <v-icon
          :icon="icon"
          class="mx-1"
        />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script lang="ts">
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'JobsLink',

    components: { AppTooltipBtn },

    setup () {
      const { path } = useRoute()

      const icon = computed(() => {
        return path.match('vue-jobs')
          ? 'mdi-briefcase-variant'
          : 'mdi-briefcase-variant-outline'
      })

      return {
        icon,
        onClick () {
          // this.$gtag.event('click', {
          //   event_category: 'toolbar',
          //   event_label: 'jobs',
          //   value: route.name,
          // })
        },
        newJobs: [],
      }
    },
  })
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
