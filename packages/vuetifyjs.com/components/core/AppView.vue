<template lang="pug">
  v-content
    v-fade-transition(mode="out-in")
      router-view(:key="$route.path")
    //- app-footer
</template>

<script>
  // Components
  import AppFooter from '@/components/core/AppFooter'

  export default {
    components: {
      AppFooter
    }
  }
</script>
