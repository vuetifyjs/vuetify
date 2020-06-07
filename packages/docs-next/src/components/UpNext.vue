<template>
  <div
    id="up-next"
    class="d-flex"
  >
    <router-link
      v-if="prev"
      :to="prev.to"
      class="text-decoration-none d-inline-flex align-center body-1"
    >
      <v-icon color="primary">
        $prev
      </v-icon>

      {{ prev.title }}
    </router-link>

    <v-spacer />

    <router-link
      v-if="next"
      :to="next.to"
      class="text-decoration-none d-inline-flex align-center body-1"
    >
      {{ next.title }}

      <v-icon color="primary">
        $next
      </v-icon>
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
        'params@category',
        'params@locale',
        'params@page',
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

        const to = `/${this.locale}/${this.category}/${this.page}/`

        return this.leafs.findIndex(item => item.to === to)
      },
      prev () {
        return this.leafs[this.currentIndex - 1]
      },
      next () {
        return this.leafs[this.currentIndex + 1]
      },
    },
  }
</script>
