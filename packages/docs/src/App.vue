<template>
  <router-view />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent, onBeforeMount } from 'vue'
  import { useHead } from '@vueuse/head'
  // import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  // import { useTheme } from 'vuetify'

  export default defineComponent({
    name: 'App',

    setup () {
      onBeforeMount(() => {
        // const theme = useTheme({})
        // console.log(theme)
        const router = useRouter()
        // const { locale } = useI18n()
        console.log(router)

        // https://github.com/vueuse/head
        useHead({
          title: 'Vuetify',
          meta: [
            { name: 'description', content: 'Vite Docs Test', layout: 'home' },
          ],
        })

        // set current route lang if root
        // const currentRoute = router.currentRoute.value
        // if (currentRoute.path === '/') {
        //   router.replace(`/${locale.value}`)
        // }
      })
    },
  })
</script>
