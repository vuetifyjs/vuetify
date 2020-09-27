<template>
  <div
    id="up-next"
    class="d-flex"
  >
    <router-link
      v-if="prev"
      :to="prev.to"
      class="text-decoration-none body-1"
    >
      <span class="text-h6 text--primary" v-html="arrows.prev" />
      <span v-text="prev.title" />
    </router-link>

    <v-spacer />

    <router-link
      v-if="next"
      :to="next.to"
      class="text-decoration-none body-1"
    >
      <span v-text="next.title" />
      <span class="text-h6 text--primary" v-html="arrows.next" />
    </router-link>
  </div>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'UpNext',

    computed: {
      ...get('route', [
        'params@page',
        'path',
      ]),
      nav: get('app/nav'),
      leafs () {
        const leafs = []
        const unvisited = [...this.nav]

        while (unvisited.length) {
          const current = unvisited.shift()

          if (current.items) {
            unvisited.push(...current.items)
          } else {
            leafs.push(current)
          }
        }

        return leafs
      },
      currentIndex () {
        if (!this.leafs) return -1

        return this.leafs.findIndex(item => item.to === this.path)
      },
      prev () {
        return this.leafs[this.currentIndex - 1]
      },
      next () {
        return this.leafs[this.currentIndex + 1]
      },
      arrows () {
        return {
          next: this.$vuetify.rtl ? '←&nbsp;' : '&nbsp;→',
          prev: this.$vuetify.rtl ? '&nbsp;→' : '←&nbsp;',
        }
      },
    },
  }
</script>
