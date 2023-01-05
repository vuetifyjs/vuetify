<template>
  <v-container
    class="text-center fill-height"
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <h1 class="text-h3 text-primary">
          Whoops, 404
        </h1>

        <p>The page you were looking for does not exist</p>

        <v-btn
          :to="rpath('/getting-started/installation/')"
          color="primary"
          variant="outlined"
        >
          Get me out of here!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { rpath } from '@/util/routes'
  import { usePwaStore } from '@/store/pwa'
  import { useHead } from '@vueuse/head'

  const pwa = usePwaStore()
  useHead({
    title: 'Page not found',
  })

  onMounted(async () => {
    const sw = await navigator.serviceWorker?.getRegistration()
    await sw?.update()
    if (sw?.waiting) {
      pwa.update()
    }
  })
</script>
