<template>
  <section
    :id="id"
    class="mt-12"
  >
    <app-heading
      :content="text"
      level="2"
    />

    <i18n
      path="ready-text"
      tag="div"
    >
      <template v-slot:team>
        <i18n
          :href="url"
          path="team"
          tag="app-link"
        />
      </template>
    </i18n>

    <related-pages />

    <up-next />

    <app-divider />

    <v-lazy>
      <exit-ad />
    </v-lazy>

    <contribute />
  </section>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'Backmatter',

    data: () => ({ id: 'ready-for-more' }),

    computed: {
      locale: get('route/params@locale'),
      toc: sync('pages/toc'),
      text () {
        return this.$i18n.t('ready', { url: this.url })
      },
      url () {
        return `/${this.locale}/introduction/meet-the-team/`
      },
    },
  }
</script>
