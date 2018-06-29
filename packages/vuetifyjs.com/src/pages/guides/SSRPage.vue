<template lang="pug">
  doc-view
    section#structure
      section-head(value="Guides.ServerSideRendering.structureHeader")
      section-text(value="Guides.ServerSideRendering.structureText1")
      section-subheader(value="Guides.ServerSideRendering.structureSubHeader")
      markup(lang="bash")
        | / project
        |   / assets
        |   / build
        |   / components
        |   / mixins
        |   / pages
        |   / router
        |   / static
        |   / store
      section-text(value="Guides.ServerSideRendering.structureText2")

    section#application
      section-head(value="Guides.ServerSideRendering.applicationHeader")
      section-text(value="Guides.ServerSideRendering.applicationText1")
      section-text(value="Guides.ServerSideRendering.applicationText2")
      markup(lang="html")
        |&lt;v-app&gt;
        |   &lt;v-toolbar app&gt;
        |     &lt;v-toolbar-title&gt;Portfolio&lt;/v-toolbar-title&gt;
        |   &lt;/v-toolbar&gt;
        |   &lt;v-content&gt;
        |     &lt;v-container fluid&gt;
        |       &lt;router-view&gt;&lt;/router-view&gt;
        |     &lt;/v-container&gt;
        |   &lt;/v-content&gt;
        |   &lt;v-footer app&gt;2017&lt;/v-footer&gt;
        |&lt;/v-app&gt;
      section-subheader(value="Guides.ServerSideRendering.applicationSubHeader1")
      section-text(value="Guides.ServerSideRendering.applicationText3")
      section-subheader(value="Guides.ServerSideRendering.applicationSubHeader2")
      section-text(value="Guides.ServerSideRendering.applicationText4")

    section#routing
      section-head(value="Guides.ServerSideRendering.routingHeader")
      section-text(value="Guides.ServerSideRendering.routingText1")
      markup(lang="js")
        |routes: [
        |   route('/', 'Welcome'),
        |   route('/inspire', 'Inspire')
        |]
      section-text(value="Guides.ServerSideRendering.routingText2")

    section#state-control
      section-head(value="Guides.ServerSideRendering.stateControlHeader")
      section-text(value="Guides.ServerSideRendering.stateControlText1")
      markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |}
      section-text(value="Guides.ServerSideRendering.stateControlText2")
      section-text(value="Guides.ServerSideRendering.stateControlText3")
      section-text(value="Guides.ServerSideRendering.stateControlText4")

    section#meta-data
      section-head(value="Guides.ServerSideRendering.metaDataHeader")
      section-text(value="Guides.ServerSideRendering.metaDataText")

    section#redirects
      section-head(value="Guides.ServerSideRendering.redirectsHeader")
      section-text(value="Guides.ServerSideRendering.redirectsText")

    section#web-app-support
      section-head(value="Guides.ServerSideRendering.webAppSupportHeader")
      section-text(value="Guides.ServerSideRendering.webAppSupportText")
</template>
