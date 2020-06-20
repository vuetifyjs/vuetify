<template>
  <v-navigation-drawer
    id="default-toc"
    app
    class="pa-4"
    clipped
    right
    width="192"
  >
    <i18n
      class="text-h6 font-weight-regular mb-4"
      tag="h3"
      path="contents"
    />

    <ul class="pl-0">
      <li
        v-for="({ to, level, text }, i) in toc"
        :key="i"
        :class="{
          'pl-3': level === 3,
          'pl-6': level === 4
        }"
        class="mt-2"
      >
        <router-link
          :to="to"
          active-class="primary--text"
          class="v-toc-link d-block text-body-2 font-weight-light text-decoration-none"
          v-text="text"
        />
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DocumentationToc',

    computed: {
      category: get('route/params@category'),
      page: get('route/params@page'),
      toc: get('pages/toc'),
    },
  }
</script>

<style lang="sass">
  #default-toc
    ul
      list-style-type: none

    .v-toc-link:not(.router-link-exact-active)
      color: #757575 // grey.darken-1
</style>
