<template>
  <router-view v-slot="{ Component }">
    <v-fade-transition appear>
      <component :is="Component" />
    </v-fade-transition>
  </router-view>

  <PromotedScript
    id="bitterbrainsads-script"
    script-id="_bitterbrainsads_js"
    src="//media.bitterbrains.com/main.js?from=VUETIFY&type=top"
    async
  />
</template>

<script setup lang="ts">
  // Composables
  import { useHead } from '@unhead/vue'

  const user = useUserStore()
  const router = useRouter()
  const route = useRoute()
  const theme = useTheme()
  const { locale } = useI18n()
  const auth = useAuthStore()
  const frontmatter = useFrontmatter()

  const path = computed(() => route.path.replace(`/${locale.value}/`, ''))

  const meta = computed(() => {
    let title = route.meta.title

    // API pages
    if (route.meta.title === 'API') {
      const name = route.params.name as string
      title = `${name.charAt(0).toUpperCase()}${camelize(name.slice(1))} API`
    }

    return genAppMetaInfo({
      title: `${title}${path.value === '' ? '' : ' — Vuetify'}`,
      description: frontmatter.value?.meta.description,
      keywords: frontmatter.value?.meta.keywords,
      assets: frontmatter.value?.assets,
    })
  })

  useHead({
    title: computed(() => meta.value.title),
    meta: computed(() => meta.value.meta),
    link: computed(() => meta.value.link),
    script: computed(() => {
      return route.meta.locale === 'eo-UY' ? [
        {
          type: 'text/javascript',
          innerHTML: `let _jipt = [['project', 'vuetify']];`,
        },
        {
          type: 'text/javascript',
          src: '//cdn.crowdin.com/jipt/jipt.js',
        },
      ] : []
    }),
  })

  onBeforeMount(() => {
    // set current route lang if root
    const currentRoute = router.currentRoute.value
    if (currentRoute.path === '/') {
      const query = currentRoute.query
      router.replace({ path: `/${locale.value}`, query })
    }
  })

  const systemTheme = ref('light')
  if (IN_BROWSER) {
    let media: MediaQueryList

    auth.verify()

    watch(() => user.one.theme, val => {
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
</script>

<style lang="sass">
  a:not(:hover)
    text-decoration: none

  h1 + p
    font-size: 1.25rem
    font-weight: 300
    margin-top: 0

  p :is(a, a:visited)
    color: rgb(var(--v-theme-primary))

  // Theme transition
  .app-copy
    position: fixed !important
    z-index: -1 !important
    pointer-events: none !important
    contain: size style !important
    overflow: clip !important

  .app-transition
    --clip-size: 0
    --clip-pos: 0 0
    clip-path: circle(var(--clip-size) at var(--clip-pos))
    transition: clip-path .35s ease-out
</style>

<style lang="sass" scoped>
  .pwa-loader
    position: fixed
    top: 0
    left: 0
    right: 0
    z-index: 1010
</style>
