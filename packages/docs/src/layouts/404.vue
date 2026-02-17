<template>
  <DefaultLayout>
    <v-container :style="{ minHeight: '100%' }" class="d-flex">
      <v-row align="center" justify="center">
        <v-col cols="auto">
          <h1 class="text-h3 text-primary">
            Whoops, 404
          </h1>

          <p>The page you were looking for does not exist</p>

          <p>
            <v-btn
              :to="rpath('/getting-started/installation/')"
              color="primary"
              variant="outlined"
            >
              Get me out of here!
            </v-btn>
          </p>

          <p>
            <AppLink :href="'https://v2.vuetifyjs.com' + route.fullPath">Looking for Vuetify 2?</AppLink>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script setup lang="ts">
  // Components
  import DefaultLayout from '@/layouts/default.vue'

  // Utilities
  import { useHead } from '@unhead/vue'

  const route = useRoute()
  useHead({
    title: 'Page not found',
  })
</script>
