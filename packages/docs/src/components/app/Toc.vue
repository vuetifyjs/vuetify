<template>
  <v-navigation-drawer
    id="app-toc"
    color="background"
    class="py-4 pr-3"
    floating
    width="256"
    location="right"
  >
    <template
      v-if="toc.length"
      #prepend
    >
      <app-headline
        class="mb-2"
        path="contents"
      />
    </template>

    <ul class="mb-4 ml-5">
      <router-link
        v-for="{ to, level, text } in toc"
        v-slot="{ href }"
        :key="text"
        :to="to"
        custom
      >
        <li
          :class="[
            'pl-3 text-body-2 py-1 font-weight-regular',
            {
              'text-primary router-link-active': route.hash === to,
              'text-grey': route.hash !== to,
              'pl-6': level === 3,
              'pl-9': level === 4,
              'pl-12': level === 5,
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
        <v-card
          :color="dark ? undefined : 'grey-lighten-5'"
          variant="flat"
        >

          <v-container class="pa-2">
            <app-caption
              v-if="sponsors.length"
              path="sponsors"
              class="mt-n1 mb-1 ml-2"
            />

            <v-row dense>
              <v-col
                v-for="sponsor of sponsors"
                :key="sponsor.slug"
                :cols="sponsor.metadata.tier === -1 ? 12 : 6"
                class="text-center"
              >
                <sponsor-card
                  :max-height="sponsor.metadata.tier === -1 ? 52 : undefined"
                  :sponsor="sponsor"
                  style="width: 100%; height: 100%;"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-row>
          <v-col cols="12">
            <carbon />
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
  // Utilities
  import { computed, defineComponent, onBeforeMount, ref } from 'vue'
  import { RouteLocation, Router, useRoute, useRouter } from 'vue-router'
  import { useSponsorsStore } from '../../store/sponsors'
  import { useTheme } from 'vuetify'

  import SponsorCard from '@/components/sponsor/Card.vue'

  type TocItem = {
    to: string;
    text: string;
    level: number;
  }

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

  export default defineComponent({
    name: 'AppToc',

    components: {
      SponsorCard,
    },

    setup () {
      const route = useRoute()
      const router = useRouter()
      const theme = useTheme()

      const { onScroll, scrolling } = useUpdateHashOnScroll(route, router)

      async function onClick (hash: string) {
        if (route.hash === hash) return

        scrolling.value = true

        router.replace({ path: route.path, hash })

        // await this.$vuetify.goTo(hash)
        // await wait(200)

        scrolling.value = false
      }

      const sponsorStore = useSponsorsStore()

      onBeforeMount(async () => sponsorStore.load())

      return {
        toc: computed(() => route.meta.toc as TocItem[]),
        onClick,
        onScroll,
        sponsors: computed(() => (
          sponsorStore.sponsors
            .filter(sponsor => sponsor.metadata.tier <= 2)
            .sort((a, b) => {
              const aTier = a.metadata.tier
              const bTier = b.metadata.tier

              return aTier === bTier ? 0 : aTier > bTier ? 1 : -1
            })
        )),
        dark: computed(() => theme.current.value.dark),
        route,
      }
    },
  })
</script>

<style lang="sass">
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

    .v-navigation-drawer__content
      height: auto
</style>
