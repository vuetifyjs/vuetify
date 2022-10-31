<template>
  <router-view />
</template>

<script setup lang="ts">
  // Composables
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, onBeforeMount, ref, watch, watchEffect } from 'vue'
  import { genAppMetaInfo } from '@/util/metadata'
  import { getMatchMedia } from '@/util/helpers'

  // Globals
  import { IN_BROWSER } from '@/util/globals'

  // Data
  import metadata from '@/data/metadata.json'

  const user = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const theme = useTheme()
  const { locale } = useI18n()

  const path = computed(() => route.path.replace(`/${locale.value}/`, ''))

  const meta = computed(() => {
    return genAppMetaInfo(path.value === '' ? metadata : {
      title: `${route.meta.title} — Vuetify`,
      description: route.meta.description,
      keywords: route.meta.keywords,
    })
  })

  useHead({
    title: computed(() => meta.value.title),
    meta: computed(() => meta.value.meta),
    link: computed(() => meta.value.link),
  })

  onBeforeMount(() => {
    // set current route lang if root
    const currentRoute = router.currentRoute.value
    if (currentRoute.path === '/') {
      router.replace(`/${locale.value}`)
    }
  })

  const systemTheme = ref('light')
  if (IN_BROWSER) {
    let media: MediaQueryList
    watch(() => user.theme, val => {
      if (val === 'system') {
        media = getMatchMedia()!
        media.addListener(onThemeChange)
        onThemeChange()
      } else if (media) {
        media.removeListener(onThemeChange)
      }
    }, { immediate: true })
    function onThemeChange () {
      systemTheme.value = media!.matches ? 'dark' : 'light'
    }

    watchEffect(() => {
      theme.global.name.value = (
        user.theme === 'system' ? systemTheme.value : user.theme
      )
    })
  }
</script>

<style lang="sass">
  a:not(:hover)
    text-decoration: none

  p
    margin-bottom: 1rem

    a, a:visited
      color: rgb(var(--v-theme-primary))

  h1
    + p
      font-size: 1.25rem
      font-weight: 300

  ul:not([class])
    padding-left: 20px
    margin-bottom: 16px
</style>
