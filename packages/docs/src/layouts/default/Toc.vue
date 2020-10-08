<template>
  <v-navigation-drawer
    id="default-toc"
    v-scroll="onScroll"
    :color="dark ? '#121212' : undefined"
    :right="!rtl"
    app
    class="py-4 pr-3"
    clipped
    floating
    width="256"
  >
    <template
      v-if="toc.length"
      #prepend
    >
      <headline
        class="mb-2"
        path="contents"
      />
    </template>

    <ul class="mb-6">
      <router-link
        v-for="({ to, level, text }, i) in toc"
        :key="text"
        #default="{ href, isActive }"
        :to="to"
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
      <app-caption
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
      />
    </div>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'
  import { wait } from '@/util/helpers'

  export default {
    name: 'DefaultToc',

    data: () => ({
      offsets: [],
      timeout: null,
    }),

    computed: {
      ...get('user', [
        'rtl',
        'theme@dark',
      ]),
      ...get('route', [
        'hash',
        'path',
      ]),
      sponsors: get('sponsors/all'),
      scrolling: sync('app/scrolling'),
      toc: get('pages/toc'),
    },

    methods: {
      async onClick (hash, i) {
        if (this.hash === hash) return

        this.scrolling = true

        this.$router.replace({ path: this.path, hash })

        await this.$vuetify.goTo(hash)
        await wait(200)

        this.scrolling = false
      },
      setOffsets () {
        const offsets = []
        const toc = this.toc.slice().reverse()

        for (const item of toc) {
          const section = document.getElementById(item.to.slice(1))

          if (!section) continue

          offsets.push(section.offsetTop - 48)
        }

        this.offsets = offsets
      },
      async findActiveIndex () {
        if (this.$vuetify.breakpoint.mobile) return

        const currentOffset = (
          window.pageYOffset ||
          document.documentElement.offsetTop ||
          0
        )

        // If we are at the top of the page
        // reset the offset
        if (currentOffset === 0) {
          if (this.hash) {
            this.$router.replace({ path: this.path })
          }

          return
        }

        if (
          this.offsets.length !== this.toc.length
        ) this.setOffsets()

        const index = this.offsets.findIndex(offset => {
          return offset < currentOffset
        })

        let tindex = index > -1
          ? this.offsets.length - 1 - index
          : 0

        if (currentOffset + window.innerHeight === document.documentElement.offsetHeight) {
          tindex = this.toc.length - 1
        }

        const hash = this.toc[tindex].to

        if (hash === this.hash) return

        this.scrolling = true

        await this.$router.replace({
          path: this.path,
          hash,
        })

        this.scrolling = false
      },
      onScroll () {
        clearTimeout(this.timeout)

        if (
          this.scrolling ||
          !this.toc.length
        ) return

        this.timeout = setTimeout(this.findActiveIndex, 17)
      },
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
