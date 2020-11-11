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
      class="mb-3"
      path="ready-text"
      tag="div"
    >
      <template #team>
        <i18n
          :href="url"
          path="team"
          tag="app-link"
        />
      </template>
    </i18n>

    <related-pages />

    <app-divider class="mt-7 mb-5" />

    <up-next class="mb-4" />

    <exit-ad class="mb-8" />

    <contribute />
  </section>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'Backmatter',

    data: () => ({ id: 'ready-for-more' }),

    computed: {
      toc: sync('pages/toc'),
      text () {
        return this.$t('ready', { url: this.url })
      },
      url () {
        return '/about/meet-the-team/'
      },
    },
  }
</script>
