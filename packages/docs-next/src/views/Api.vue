<script>
  // Extensions
  import Page from './Page'

  async function load (route) {
    const { locale, page } = route.params

    return import(
      /* webpackChunkName: "api-pages-[request]" */
      `@/api/${locale}/${page}.md`
    )
  }

  export default {
    name: 'Api',

    extends: Page,

    methods: { load },
  }
</script>
