<template>
  <div
    id="up-next"
    class="d-flex"
  >
    <router-link
      v-if="prev"
      :to="`/${lang}${prev.to}`"
    >
      <span class="text--primary">←</span>

      {{ prev.title }}
    </router-link>

    <v-spacer />

    <router-link
      v-if="next"
      :to="`/${lang}${next.to}`"
    >
      {{ next.title }}

      <span class="text--primary">→</span>
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
        'params@page',
        'params@lang',
      ]),
      pages: get('app/pages'),
      page: get('route/params@page'),
      current () {
        return this.pages[this.category][this.currentIndex]
      },
      currentIndex () {
        const current = `/${this.category}/${this.page}`

        return this.pages[this.category].findIndex(page => {
          return page.to === current
        })
      },
      prev () {
        return this.pages[this.category][this.currentIndex - 1]
      },
      next () {
        return this.pages[this.category][this.currentIndex + 1]
      },
    },
  }
</script>
