<template>
  <v-navigation-drawer
    v-if="!route.meta.fluid"
    id="app-toc"
    v-model="tocDrawer"
    color="background"
    location="right"
    width="256"
    floating
    sticky
  >
    <template #prepend>
      <AppHeadline
        v-if="frontmatter?.toc?.length"
        class="mt-4 mb-2 ms-4"
        path="contents"
      />
    </template>

    <ul class="ms-5">
      <router-link
        v-for="{ to, level, text } in frontmatter?.toc"
        :key="text"
        v-slot="{ href }"
        :to="to"
        custom
      >
        <li
          :class="[
            'ps-3 text-medium-emphasis text-body-medium py-1 font-weight-regular',
            {
              'text-primary router-link-active': activeItem === to.slice(1),
              'ps-6': level === 3,
              'ps-9': level === 4,
              'ps-12': level === 5,
            }
          ]"
        >
          <a
            :href="href"
            class="v-toc-link d-block text-decoration-none"
            @click.prevent.stop="onClick(to)"
            v-text="text"
          />
        </li>
      </router-link>
    </ul>

    <template #append>
      <v-container>
        <AppHeadline
          v-if="sponsors.length"
          :to="rpath('/introduction/sponsors-and-backers/')"
          class="mb-1 mt-n1 text-high-emphasis text-decoration-none"
          path="sponsors"
          size="subtitle-1"
          tag="router-link"
        />

        <v-row density="comfortable">
          <template v-if="sponsors.length">
            <v-col
              v-for="sponsor of sponsors"
              :key="sponsor.slug"
              :cols="sponsor.metadata.tier === -2 ? 12 : 6"
              class="d-inline-flex"
            >
              <sponsor-card
                :color="dark ? undefined : 'grey-lighten-5'"
                :max-height="sponsor.metadata.tier === -2 ? 52 : 40"
                :sponsor="sponsor"
              />
            </v-col>

            <v-col class="d-inline-flex">
              <v-btn
                :to="rpath('/introduction/sponsors-and-backers/')"
                append-icon="$vuetify"
                class="text-none"
                color="primary"
                size="large"
                text="Support"
                variant="tonal"
                block
              />
            </v-col>
          </template>

          <v-col v-else cols="12">
            <v-btn
              class="text-none border-opacity-50 border-primary"
              color="primary"
              href="https://github.com/sponsors/johnleider"
              prepend-icon="mdi-github"
              rel="noopener noreferrer"
              size="large"
              target="_blank"
              text="Your Logo Here"
              variant="tonal"
              block
              border
            />
          </v-col>

          <v-col
            v-if="spot.spot && (user.one.ads.enabled || (user.one.ads.house && spot.spot.sponsor === 'Vuetify'))"
            cols="12"
          >
            <a
              :href="spot.spot.href"
              rel="noopener noreferrer sponsored"
              target="_blank"
              @click="sweClick('toc', 'promotion', spot.spot.sponsor)"
            >
              <v-img :src="spot.spot.image.url" />
            </a>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  const { toc: tocDrawer } = storeToRefs(useAppStore())

  const route = useRoute()
  const router = useRouter()
  const spot = useSpotStore()
  const theme = useTheme()
  const user = useUserStore()
  const frontmatter = useFrontmatter()

  const activeStack = [] as string[]
  const activeItem = shallowRef('')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeStack.push(entry.target.id)
      } else if (activeStack.includes(entry.target.id)) {
        activeStack.splice(activeStack.indexOf(entry.target.id), 1)
      }
    })
    // Enter page from left aside -> click toc slots link -> re-enter page from left aside.
    // The observer band is rootMargin: '-10% 0px -75%', a thin zone in the upper viewport.
    // After "click Slots → click left link → instant jump to top", the Slots section leaves
    // the band and — because of the page's tall header/search area — no section has entered
    // it yet.
    // Stack goes empty, and the || activeItem.value fallback deliberately keeps the previous
    // value: stale "Slots" highlight at the top of the page.
    const firstEntry = frontmatter.value?.toc?.[0]?.to.slice(1) || ''
    activeItem.value = activeStack.at(-1) || (window.scrollY < 200 ? firstEntry : activeItem.value) || firstEntry
  }, { rootMargin: '-10% 0px -75%' })

  async function observeToc () {
    activeStack.length = 0
    activeItem.value = ''
    observer.disconnect()
    await nextTick()
    frontmatter.value?.toc?.forEach(v => {
      const el = document.getElementById(v.to.slice(1))
      el && observer.observe(el)
    })
  }

  watch(() => frontmatter.value?.toc, observeToc)
  onMounted(() => {
    observeToc()
  })
  onScopeDispose(() => {
    observer.disconnect()
  })

  let internalScrolling = false

  watch(activeItem, async val => {
    if (!val || internalScrolling) return

    const query = route.query

    if (val === frontmatter.value?.toc?.[0]?.to.slice(1) && route.hash) {
      router.replace({ path: route.path, query })
    } else {
      const toc = frontmatter.value?.toc?.find(v => v.to.slice(1) === val)
      if (toc) {
        await router.replace({ path: route.path, hash: toc.to, query })
      }
    }
  })

  function handleScroll (top: number, el: HTMLElement) {
    // If the user does not want animations, or the jump is greater than 500 pixels, instant.
    const isReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      Math.abs(top) > 500

    // Listener to release internalScrolling just at the end of the animation
    let fallbackTimeout: ReturnType<typeof setTimeout>
    const onScrollEnd = () => {
      internalScrolling = false
      clearTimeout(fallbackTimeout)
      document.removeEventListener('scrollend', onScrollEnd)
    }
    document.addEventListener('scrollend', onScrollEnd)

    // Security fallback of 1000ms for older browsers or instant jumps
    fallbackTimeout = setTimeout(onScrollEnd, 1000)

    el.scrollIntoView({ behavior: isReduced ? 'instant' : 'smooth' })
  }

  async function onClick (hash: string) {
    internalScrolling = true
    await router.replace({ path: route.path, hash })

    // avoid CSS selector issues by only allowing ID selectors
    const el = document.getElementById(hash.slice(1))
    if (el) {
      requestAnimationFrame(() => {
        // give scroll spy a chance to update the activeItem before forcing a re-layout
        setTimeout(() => {
          requestAnimationFrame(() => {
            // force re-layout only once
            handleScroll(el.getBoundingClientRect().top, el)
          })
        }, 0)
      })
    } else {
      // release the internalScrolling flag if the element is not found, to avoid locking the state
      internalScrolling = false
    }
  }

  const sponsorStore = useSponsorsStore()

  const sponsors = computed(() => (
    sponsorStore.sponsors
      .filter(sponsor => sponsor.metadata.tier <= 1)
      .sort((a, b) => {
        const aTier = a.metadata.tier
        const bTier = b.metadata.tier

        return aTier === bTier ? 0 : aTier > bTier ? 1 : -1
      })
  ))
  const dark = computed(() => theme.current.value.dark)
</script>

<style lang="sass" scoped>
  @layer base
    #app-toc
      ul
        list-style-type: none
        margin: 0
        padding: 0

      li
        border-left: 2px solid rgb(var(--v-theme-on-surface-variant))

        &.router-link-active
          border-left-color: currentColor

      .v-toc-link
        color: inherit

      :deep(.v-navigation-drawer__content)
        height: auto
        margin-right: 12px
</style>
