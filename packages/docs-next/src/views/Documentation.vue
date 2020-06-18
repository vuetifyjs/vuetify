<script>
  // Extensions
  import Page from './Page'

  async function load (route) {
    const { category, locale, page } = route.params

    return import(
      /* webpackChunkName: "documentation-pages-[request]" */
      `@/pages/${locale}/${category}/${page}.md`
    )
  }

  export default {
    name: 'Documentation',

    extends: Page,

    methods: { load },
  }
</script>
