<template>
  <section
    :id="id"
    class="mt-12"
  >
    <app-heading
      :content="text"
      :to="to"
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
    name: 'Endmatter',

    data: () => ({ id: 'ready-for-more' }),

    computed: {
      locale: get('route/params@locale'),
      toc: sync('pages/toc'),
      to () {
        return `#${this.id}`
      },
      text () {
        return this.$i18n.t('ready', { url: this.url })
      },
      url () {
        return `/${this.locale}/introduction/meet-the-team/`
      },
    },

    created () {
      if (!this.toc.find(t => t.to === this.to)) {
        this.toc.push({
          to: this.to,
          level: '2',
          text: this.text,
        })
      }
    },
  }
</script>
