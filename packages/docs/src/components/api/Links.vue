<template>
  <div class="mb-4 d-flex flex-column">
    <div v-for="link in links" :key="link.name">
      <AppLink :href="link.href">{{ link.name }}</AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
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
      href: `/${locale.value}/api/` + (name.startsWith('v-') ? `${name}-directive` : name),
    }))
  })
</script>
