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
      pages: get('i18n/pages'),
      page: get('route/params@page'),
      currentCategory () {
        return this.pages && this.pages[this.category]
      },
      current () {
        return this.currentCategory && this.currentCategory[this.currentIndex]
      },
      currentIndex () {
        const current = `/${this.category}/${this.page}`

        return this.currentCategory && this.currentCategory.findIndex(page => {
          return page.to === current
        })
      },
      prev () {
        return this.currentCategory && this.currentCategory[this.currentIndex - 1]
      },
      next () {
        return this.currentCategory && this.currentCategory[this.currentIndex + 1]
      },
    },
  }
</script>
