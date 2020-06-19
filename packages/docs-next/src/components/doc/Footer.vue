<template>
  <section
    :id="id"
    class="mt-12"
  >
    <app-heading
      :content="text"
      :href="href"
      level="2"
    />

    <i18n
      path="ready-text"
      tag="div"
    >
      <template v-slot:team>
        <i18n
          :href="url"
          tag="app-link"
          path="team"
        />
      </template>
    </i18n>

    <related-pages />

    <up-next />

    <app-divider />

    <exit-ad />

    <contribute />
  </section>
</template>

<script>
  // Utilities
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DocFooter',

    data: () => ({ id: 'ready-for-more' }),

    computed: {
      locale: get('route/params@locale'),
      toc: sync('page/toc'),
      href () {
        return `#${this.id}`
      },
      text () {
        return this.$i18n.t('ready', { url: this.url })
      },
      url () {
        return `/${this.locale}/introduction/meet-the-team/`
      },
    },

    mounted () {
      if (!this.toc.find(t => t.href === this.href)) {
        this.toc.push({
          href: this.href,
          level: '2',
          text: this.text,
        })
      }
    },
  }
</script>
