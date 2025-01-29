<template>
  <div class="mb-4 d-flex flex-column">
    <div v-for="link in links" :key="link.name">
      <AppLink :href="link.href">{{ link.name }}</AppLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import pageToApi from '@/data/page-to-api.json'

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  })

  const route = useRoute()
  const router = useRouter()

  const links = computed(() => {
    return (Object.keys(pageToApi) as (keyof typeof pageToApi)[])
      .filter(page => pageToApi[page].includes(props.name))
      .map(page => {
        const resolved = router.resolve('/' + route.meta.locale + '/' + page)
        const name = (resolved.meta.nav ?? page.split('/').at(-1)) as string
        return {
          name,
          href: resolved.href,
        }
      })
  })
</script>
