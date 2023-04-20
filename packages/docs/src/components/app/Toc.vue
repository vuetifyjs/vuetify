<template>
  <v-navigation-drawer
    id="app-toc"
    v-model="app.toc"
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
            'ps-3 text-body-2 py-1 font-weight-regular',
            {
              'text-primary router-link-active': route.hash === to,
              'text-medium-emphasis': route.hash !== to,
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
          <v-col
            v-for="sponsor of sponsors"
            :key="sponsor.slug"
            class="d-inline-flex"
          >
            <sponsor-card
              :max-height="sponsor.metadata.tier === -1 ? 52 : 40"
              :sponsor="sponsor"
              :color="dark ? undefined : 'grey-lighten-5'"
            />
          </v-col>

          <v-col class="d-inline-flex">

            <v-hover>
              <template #default="{ isHovering, props: hoverProps }">
                <v-card
                  :color="isHovering ? 'primary' : dark ? undefined : 'grey-lighten-5'"
                  :to="rpath('/introduction/sponsors-and-backers/')"
                  v-bind="hoverProps"
                  class="py-1 px-3 text-center"
                  variant="tonal"
                  width="100%"
                >
                  <div :class="isHovering ? undefined : 'text-disabled'">
                    Support

                    <v-icon icon="$vuetify" />
                  </div>
                </v-card>
              </template>
            </v-hover>
          </v-col>

          <v-col cols="12">
            <a
              href="https://themeselection.com/item/category/vuejs-admin-templates/?utm_source=vuetify&utm_medium=banner&utm_campaign=category_page&utm_id=12"
              target="_blank"
              rel="noopener noreferrer sponsored"
              @click="onClickPromotion"
            >
              <v-img src="https://cdn.vuetifyjs.com/docs/images/promotions/theme-selection-dashboard-2023/themeselection-promotion-banner.png" />
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
  import { RouteLocation, Router, useRoute, useRouter } from 'vue-router'
  import { useAppStore } from '@/store/app'
  import { useGtag } from 'vue-gtag-next'
  import { useSponsorsStore } from '@/store/sponsors'
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, ref } from 'vue'
  import { rpath } from '@/util/routes'

  type TocItem = {
    to: string;
    text: string;
    level: number;
  }

  const app = useAppStore()

  function useUpdateHashOnScroll (route: RouteLocation, router: Router) {
    const scrolling = ref(false)
    let offsets: number[] = []
    let timeout: any = 0

    function calculateOffsets () {
      const offsets = []
      const toc = route.meta.toc as any[]

      for (const item of toc.slice().reverse()) {
        const section = document.getElementById(item.to.slice(1))

        if (!section) continue

        offsets.push(section.offsetTop - 48)
      }

      return offsets
    }

    async function findActiveHash () {
      const toc = route.meta.toc as any[]
      // if (this.$vuetify.breakpoint.mobile) return

      const currentOffset = (
        window.pageYOffset ||
        document.documentElement.offsetTop ||
        0
      )

      // If we are at the top of the page
      // reset the offset
      if (currentOffset === 0) {
        if (route.hash) {
          router.replace({ path: route.path })
        }

        return
      }

      if (
        offsets.length !== toc.length
      ) {
        offsets = calculateOffsets()
      }

      const index = offsets.findIndex(offset => {
        return offset < currentOffset
      })

      let tindex = index > -1
        ? offsets.length - 1 - index
        : 0

      if (currentOffset + window.innerHeight === document.documentElement.offsetHeight) {
        tindex = toc.length - 1
      }

      const hash = toc[tindex].to

      if (hash === route.hash) return

      scrolling.value = true

      await router.replace({
        path: route.path,
        hash,
      })

      scrolling.value = false
    }

    function onScroll () {
      const toc = route.meta.toc as any[]

      clearTimeout(timeout)

      if (
        scrolling.value ||
        !toc.length
      ) return

      timeout = setTimeout(findActiveHash, 17)
    }

    return { onScroll, scrolling }
  }

  const route = useRoute()
  const router = useRouter()
  const theme = useTheme()
  const { event } = useGtag()

  const { scrolling } = useUpdateHashOnScroll(route, router)

  async function onClick (hash: string) {
    if (route.hash === hash) return

    scrolling.value = true

    router.replace({ path: route.path, hash })

    // await this.$vuetify.goTo(hash)
    // await wait(200)

    scrolling.value = false
  }

  function onClickPromotion () {
    event('click', {
      event_category: 'vuetify-toc',
      event_label: 'promotion',
      value: 'theme-selection',
    })
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
      border-left: 2px solid #E5E5E5

      &.router-link-active
        border-left-color: currentColor

    .v-toc-link
      color: inherit

    &.theme--dark
      li:not(.router-link-active)
        border-left-color: rgba(255, 255, 255, 0.5)

    :deep(.v-navigation-drawer__content)
      height: auto
      margin-right: 12px
</style>
