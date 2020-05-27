<template>
  <v-navigation-drawer
    id="default-toc"
    app
    class="pa-4"
    clipped
    right
  >
    <h3 class="text-h6 font-weight-regular mb-4">
      Contents
    </h3>

    <ul class="pl-0">
      <li
        v-for="({ href, level, text }, i) in toc"
        :key="i"
        :class="{
          'pl-3': level === 3,
          'pl-6': level === 4
        }"
        class="mt-2"
      >
        <a
          :href="href"
          class="d-block text-body-2 font-weight-light text-decoration-none grey--text text--darken-1"
          @click.stop.prevent="$vuetify.goTo(href)"
          v-html="text"
        />
      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultToc',

    computed: {
      category: get('route/params@category'),
      page: get('route/params@page'),
      tocs: get('i18n/tocs'),
      toc () {
        return this.tocs && this.tocs[this.category] && this.tocs[this.category][this.page]
      },
    },
  }
</script>

<style lang="sass">
  #default-toc
    ul
      list-style-type: none
</style>
