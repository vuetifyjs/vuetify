<template>
  <v-theme-provider :theme="theme">
    <router-view />
  </v-theme-provider>
</template>

<script lang="ts">
  // Utilities
  import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
  import { useHead } from '@vueuse/head'
  import { useI18n } from 'vue-i18n'
  import { useRoute, useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user'
  import metadata from '@/data/metadata.json'
  import { genAppMetaInfo } from '@/util/metadata'
  import { getMatchMedia } from '@/util/helpers'
  import { IN_BROWSER } from '@/util/globals'

  export default defineComponent({
    name: 'App',

    setup () {
      const user = useUserStore()
      const router = useRouter()
      const route = useRoute()
      const { locale } = useI18n()

      const path = computed(() => route.path.replace(`/${locale.value}`, ''))

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
            media.addEventListener('change', onThemeChange)
            onThemeChange()
          } else if (media) {
            media.removeEventListener('change', onThemeChange)
          }
        }, { immediate: true })
        function onThemeChange () {
          systemTheme.value = media!.matches ? 'dark' : 'light'
        }
      }

      return {
        theme: computed(() => {
          return user.theme === 'system' ? systemTheme.value : user.theme
        }),
        user,
      }
    },
  })
</script>

<style lang="sass">
  a:not(:hover)
    text-decoration: none

  code
    padding: 0.1em 0.2em
    border-radius: 4px
    background: rgba(var(--v-border-color), var(--v-idle-opacity))

  p
    margin-bottom: 1rem

    a, a:visited
      color: rgb(var(--v-theme-primary))

  h1
    + p
      font-size: 1.25rem
      font-weight: 300

  .v-theme--light,
  .v-theme--dark
    .v-bar--underline
      border-width: 0 0 thin 0
      border-style: solid

      &.v-theme--light
        border-bottom-color: #0000001F !important

      &.v-theme--dark
        border-bottom-color: #FFFFFF1F !important
</style>
