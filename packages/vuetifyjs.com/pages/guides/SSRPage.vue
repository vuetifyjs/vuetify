<template lang="pug">
  text-page(:data="$data")
    section#structure
      section-head(value="Guides.SSR.structureHeader")
      section-text(value="Guides.SSR.structureText1")
      h3.mb-3 {{ $t('Guides.SSR.structureSubHeader') }}
      markup(lang="cli")
        | / project
        |   / assets
        |   / build
        |   / components
        |   / mixins
        |   / pages
        |   / router
        |   / static
        |   / store
      section-text(value="Guides.SSR.structureText2")

    section#application
      section-head(value="Guides.SSR.applicationHeader")
      section-text(value="Guides.SSR.applicationText1")
      section-text(value="Guides.SSR.applicationText2")
      markup(lang="html")
        |&lt;v-app&gt;
        |   &lt;v-toolbar app&gt;
        |     &lt;v-toolbar-logo&gt;Portfolio&lt;/v-toolbar-logo&gt;
        |   &lt;/v-toolbar&gt;
        |   &lt;v-content&gt;
        |     &lt;v-container fluid&gt;
        |       &lt;router-view&gt;&lt;/router-view&gt;
        |     &lt;/v-container&gt;
        |   &lt;/v-content&gt;
        |   &lt;v-footer app&gt;2017&lt;/v-footer&gt;
        |&lt;/v-app&gt;
      h3.mb-3 {{ $t('Guides.SSR.applicationSubHeader1') }}
      section-text(value="Guides.SSR.applicationText3")
      h3.mb-3 {{ $t('Guides.SSR.applicationSubHeader2') }}
      section-text(value="Guides.SSR.applicationText4")

    section#routing
      section-head(value="Guides.SSR.routingHeader")
      section-text(value="Guides.SSR.routingText1")
      markup(lang="js")
        |routes: [
        |   route('/', 'Welcome'),
        |   route('/inspire', 'Inspire')
        |]
      section-text(value="Guides.SSR.routingText2")

    section#state-control
      section-head(value="Guides.SSR.stateControlHeader")
      section-text(value="Guides.SSR.stateControlText1")
      markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |}
      section-text(value="Guides.SSR.stateControlText2")
      section-text(value="Guides.SSR.stateControlText3")
      section-text(value="Guides.SSR.stateControlText4")

    section#meta-data
      section-head(value="Guides.SSR.metaDataHeader")
      section-text(value="Guides.SSR.metaDataText")

    section#redirects
      section-head(value="Guides.SSR.redirectsHeader")
      section-text(value="Guides.SSR.redirectsText")

    section#web-app-support
      section-head(value="Guides.SSR.webAppSupportHeader")
      section-text(value="Guides.SSR.webAppSupportText")
</template>

<script>
  export default {
    name: 'ssr-page',
    data: () => ({
      header: "Guides.SSR.header",
      headerText: "Guides.SSR.headerText",
      toc: 'Guides.SSR.toc'
    })
  }
</script>
