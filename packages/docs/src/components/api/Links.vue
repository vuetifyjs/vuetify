<template>
  <div class="mb-4 d-flex flex-column">
    <div v-for="link in links" :key="link.name">
      <app-link :href="link.href">{{ link.name }}</app-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  // Data
  import pageToApi from '@/data/page-to-api.json'

  const props = defineProps({
    path: String,
  })

  const route = useRoute()
  const { locale } = useI18n()

  const links = computed(() => {
    const path = props.path || route.path.replace(`/${locale.value}/`, '').replace(/\/$/, '')
    const apis = pageToApi[path as keyof typeof pageToApi]

    return apis.map(name => ({
      name,
      href: `/${locale.value}/api/${name}`,
    }))
  })
</script>
