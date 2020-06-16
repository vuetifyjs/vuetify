<template>
  <section :id="id">
    <app-heading level="2">
      <a
        :href="href"
        class="text-decoration-none v-link"
        v-text="'#'"
      />

      {{ text }}
    </app-heading>

    <i18n
      tag="app-md"
      path="ready-text"
    />

    <related-pages />

    <up-next />

    <app-divider />

    <exit-ad />

    <contribute />
  </section>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DocFooter',

    data: () => ({ id: 'ready-for-more' }),

    computed: {
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
