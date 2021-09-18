<template>
  <v-navigation-drawer
    id="app-toc"
    v-scroll="onScroll"
    class="py-4 pr-3"
    clipped
    floating
    width="256"
    position="right"
  >
    <template
      v-if="toc.length"
      #prepend
    >
      <!-- <headline
        class="mb-2"
        path="contents"
      /> -->
      Headline
    </template>

    <ul class="mb-6">
      <router-link
        v-for="({ to, level, text }, i) in toc"
        :key="text"
        v-slot="{ href, isActive }"
        :to="to"
        custom
      >
        <li
          :class="{
            'primary--text router-link-active': isActive,
            'text--disabled': !isActive,
            'pl-6': level === 3,
            'pl-9': level === 4,
            'pl-12': level === 5,
          }"
          class="pl-3 text-body-2 py-1 font-weight-regular"
        >
          <a
            :href="href"
            class="v-toc-link d-block transition-swing text-decoration-none"
            @click.prevent.stop="onClick(to, i)"
            v-text="text"
          />
        </li>
      </router-link>
    </ul>

    <div class="ml-5">
      <!-- <app-caption
        v-if="sponsors.length"
        class="ml-2 mb-3"
        path="platinum-sponsors"
      />

      <sponsors
        class="mb-3"
        compact
        no-gutters
        tier="2"
      />

      <sponsor-link
        class="ml-2"
        small
      /> -->
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
  // Utilities
  // import { get, sync } from 'vuex-pathify'
  // import { wait } from '@/util/helpers'
  import { RouteLocation, Router, useRoute, useRouter } from 'vue-router'
  import { computed, ref } from 'vue'

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

  export default {
    name: 'AppToc',

    setup () {
      const route = useRoute()
      const router = useRouter()

      const { onScroll, scrolling } = useUpdateHashOnScroll(route, router)

      async function onClick (hash: string) {
        if (route.hash === hash) return

        scrolling.value = true

        router.replace({ path: route.path, hash })

        // await this.$vuetify.goTo(hash)
        // await wait(200)

        scrolling.value = false
      }

      return {
        toc: computed(() => route.meta.toc),
        onClick,
        onScroll,
      }
    },
  }
</script>

<style lang="sass">
  #default-toc
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
</style>
