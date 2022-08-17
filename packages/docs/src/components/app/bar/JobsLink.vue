<template>
  <app-tooltip-btn
    :to="rpath('/resources/jobs-for-vue')"
    class="jobs-link"
    path="jobs"
    @click="onClick"
  >
    <template #icon>
      <v-badge
        :model-value="newJobs.length > 0"
        color="#ED561B"
        dot
        location="top end"
      >
        <v-icon
          :icon="icon"
          class="mx-1"
          color="medium-emphasis"
        />
      </v-badge>
    </template>
  </app-tooltip-btn>
</template>

<script lang="ts">
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute, useRouter } from 'vue-router'

  // Utilities
  import { computed, defineComponent } from 'vue'
  import { rpath } from '@/util/routes'

  export default defineComponent({
    name: 'JobsLink',

    components: { AppTooltipBtn },

    setup () {
      const { currentRoute } = useRouter()
      const { event } = useGtag()
      const { name } = useRoute()

      const icon = computed(() => {
        return currentRoute.value.path.match('resources/jobs-for-vue')
          ? 'mdi-briefcase-variant'
          : 'mdi-briefcase-variant-outline'
      })

      return {
        icon,
        onClick () {
          event('click', {
            event_category: 'app-bar',
            event_label: 'jobs',
            value: name,
          })
        },
        newJobs: [],
        rpath,
      }
    },
  })
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none
</style>
