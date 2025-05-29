<template>
  <v-badge
    :class="{'vertical-middle': one.mobileBreakpoint.value}"
    :model-value="newJobs.length > 0"
    color="#ED561B"
    location="top end"
    dot
  >
    <AppBtn
      :icon="icon"
      :to="rpath('/resources/jobs-for-vue/')"
      class="jobs-link"
      @click="sweClick('app-bar', 'jobs', name)"
    />
  </v-badge>
</template>

<script setup>
  const { currentRoute } = useRouter()
  const { name } = useRoute()
  const one = useOneStore()
  const newJobs = []

  const icon = computed(() => {
    return currentRoute.value.path.match('resources/jobs-for-vue')
      ? 'mdi-briefcase-variant'
      : 'mdi-briefcase-variant-outline'
  })
</script>

<style lang="sass">
  .jobs-link .v-btn:not(:hover)::before
    display: none

  .vertical-middle
    vertical-align: middle
</style>
