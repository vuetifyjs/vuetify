<template>
  <router-view />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'App',

    beforeCreate () {
      const router = useRouter()
      const { locale } = useI18n()

      // https://github.com/vueuse/head
      useHead({
        title: 'Vuetify',
        meta: [
          { name: 'description', content: 'Vite Docs Test', layout: 'home' },
        ],
      })

      // set current route lang if root
      const currentRoute = router.currentRoute.value
      if (currentRoute.path === '/') {
        router.replace(`/${locale.value}`)
      }
    },

  })
</script>
