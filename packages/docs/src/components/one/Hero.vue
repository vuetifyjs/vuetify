<template>
  <v-container class="one-hero mx-auto text-center pa-md-12 pa-6 pb-7" fluid>
    <v-responsive class="mx-auto" max-width="700">
      <v-img
        :src="logoSrc"
        :width="$vuetify.display.mdAndUp ? 500 : 300"
        alt="Vuetify One Logo"
        class="mb-8 mx-auto"
      />

      <h1 class="text-h4 text-md-h2 font-weight-bold mb-4">
        Power the Future of Vuetify
      </h1>

      <p class="text-body-1 text-md-h6 text-medium-emphasis mb-8">
        Your subscription directly funds Vuetify development. Get premium tools, an ad-free experience, and early access to what's next—while keeping the framework free for everyone.
      </p>

      <div class="d-flex ga-4 justify-center flex-wrap">
        <v-btn
          :loading="one.isLoading"
          class="text-none"
          color="primary"
          rounded="lg"
          size="x-large"
          text="Subscribe Now"
          @click="one.subscribe('year', 'solo')"
        />

        <v-btn
          class="text-none"
          color="primary"
          rounded="lg"
          size="x-large"
          text="See What's Included"
          to="#features"
          variant="outlined"
        />
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
  const one = useOneStore()
  const theme = useTheme()

  const logoSrc = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

<style scoped>
  .one-hero {
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-primary), 0.38) 0%,
      rgba(var(--v-theme-background), 1) 100%
    );
  }
</style>
