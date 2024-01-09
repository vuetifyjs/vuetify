<template>
  <v-navigation-drawer
    v-if="!route.meta.fluid"
    id="app-toc"
    v-model="tocDrawer"
    color="background"
    floating
    location="right"
    sticky
    width="256"
  >
    <template
      v-if="toc?.length"
      #prepend
    >
      <app-headline
        class="mt-4 mb-2 ms-4"
        path="contents"
      />
    </template>

    <ul class="ms-5">
      <router-link
        v-for="{ to, level, text } in toc"
        v-slot="{ href }"
        :key="text"
        :to="to"
        custom
      >
        <li
          :class="[
            'ps-3 text-medium-emphasis text-body-2 py-1 font-weight-regular',
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
            class="v-toc-link d-block transition-swing text-decoration-none"
            @click.prevent.stop="onClick(to)"
            v-text="text"
          />
        </li>
      </router-link>
    </ul>

    <template #append>
      <v-container>
        <app-headline
          v-if="sponsors.length"
          :to="rpath('/introduction/sponsors-and-backers/')"
          class="mb-1 mt-n1 text-high-emphasis text-decoration-none"
          path="sponsors"
          size="subtitle-1"
          tag="router-link"
        />

        <v-row dense>
          <template v-if="sponsors.length">
            <v-col
              v-for="sponsor of sponsors"
              :key="sponsor.slug"
              class="d-inline-flex"
            >
              <sponsor-card
                :color="dark ? undefined : 'grey-lighten-5'"
                :max-height="sponsor.metadata.tier === -1 ? 52 : 40"
                :sponsor="sponsor"
              />
            </v-col>

            <v-col class="d-inline-flex">
              <v-btn
                :to="rpath('/introduction/sponsors-and-backers/')"
                append-icon="$vuetify"
                block
                class="text-none"
                color="primary"
                size="large"
                variant="tonal"
                text="Support"
              />
            </v-col>
          </template>

          <v-col v-else cols="12">
            <v-btn
              block
              border
              class="text-none border-opacity-50 border-primary"
              color="primary"
              href="https://github.com/sponsors/johnleider"
              prepend-icon="mdi-github"
              rel="noopener noreferrer"
              size="large"
              target="_blank"
              text="Your Logo Here"
              variant="tonal"
            />
          </v-col>

          <v-col
            v-if="!user.disableAds && spot.spot"
            cols="12"
          >
            <a
              :href="spot.spot.href"
              target="_blank"
              rel="noopener noreferrer sponsored"
              @click="gtagClick('toc', 'promotion', spot.spot.sponsor)"
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
  // Components
  import SponsorCard from '@/components/sponsor/Card.vue'

  // Composables
  import { useRoute, useRouter } from 'vue-router'
  import { useTheme } from 'vuetify'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useUserStore } from '@vuetify/one'
  import { useSponsorsStore } from '@/store/sponsors'
  import { useSpotStore } from '@/store/spot'

  // Utilities
  import { computed, nextTick, onMounted, onScopeDispose, ref, watch } from 'vue'
  import { gtagClick } from '@/util/analytics'
  import { rpath } from '@/util/routes'
  import { storeToRefs } from 'pinia'

  type TocItem = {
    to: string;
    text: string;
    level: number;
  }

  const { toc: tocDrawer, scrolling } = storeToRefs(useAppStore())

  const route = useRoute()
  const router = useRouter()
  const spot = useSpotStore()
  const theme = useTheme()
  const user = useUserStore()

  const routeToc = computed(() => route.meta.toc as TocItem[] | undefined)

  const activeStack = [] as string[]
  const activeItem = ref('')
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeStack.push(entry.target.id)
      } else if (activeStack.includes(entry.target.id)) {
        activeStack.splice(activeStack.indexOf(entry.target.id), 1)
      }
    })
    activeItem.value = activeStack.at(-1) || activeItem.value || routeToc.value?.[0]?.to.slice(1) || ''
  }, { rootMargin: '-10% 0px -75%' })

  async function observeToc () {
    scrolling.value = false
    activeStack.length = 0
    activeItem.value = ''
    observer.disconnect()
    await nextTick()
    routeToc.value?.forEach(v => {
      const el = document.querySelector(v.to)
      el && observer.observe(el)
    })
  }

  watch(routeToc, observeToc)
  onMounted(() => {
    observeToc()
  })
  onScopeDispose(() => {
    observer.disconnect()
  })

  let internalScrolling = false
  let timeout = -1
  watch(activeItem, async val => {
    if (!val || internalScrolling) return

    scrolling.value = true

    if (val === routeToc.value?.[0]?.to.slice(1) && route.hash) {
      router.replace({ path: route.path })
    } else {
      const toc = routeToc.value?.find(v => v.to.slice(1) === val)
      if (toc) {
        await router.replace({ path: route.path, hash: toc.to })
      }
    }
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      scrolling.value = false
    }, 200)
  })

  async function onClick (hash: string) {
    if (route.hash === hash) return

    internalScrolling = true
    await router.replace({ path: route.path, hash })
    setTimeout(() => {
      internalScrolling = false
    }, 1000)
  }

  const sponsorStore = useSponsorsStore()

  const toc = computed(() => route.meta.toc as TocItem[])

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
  #app-toc
    ul
      list-style-type: none

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
