<template>
  <div class="mb-4 d-flex flex-column">
    <div v-for="link in links" :key="link.name">
      <app-link :href="link.href">{{ link.name }}</app-link>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import pageToApi from '@/data/page-to-api.json'

  export default defineComponent({
    name: 'ApiLinks',

    setup () {
      const route = useRoute()
      const locale = useI18n()

      const links = computed(() => {
        const path = route.path.replace(`/${locale.locale.value}/`, '').replace(/\/$/, '')
        const apis = pageToApi[path] as string[]

        console.log(path)

        return apis.map(name => ({
          name,
          href: `/${locale.locale.value}/api/${name}`,
        }))
      })

      return {
        links,
      }
    },
  })
</script>
