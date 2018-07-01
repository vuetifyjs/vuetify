<template lang="pug">
  views-doc
    section#structure
      helpers-section-head(value="Guides.ServerSideRendering.structureHeader")
      helpers-section-text(value="Guides.ServerSideRendering.structureText1")
      helpers-section-subheader(value="Guides.ServerSideRendering.structureSubHeader")
      helpers-markup(lang="bash")
        | / project
        |   / assets
        |   / build
        |   / components
        |   / mixins
        |   / pages
        |   / router
        |   / static
        |   / store
      helpers-section-text(value="Guides.ServerSideRendering.structureText2")

    section#application
      helpers-section-head(value="Guides.ServerSideRendering.applicationHeader")
      helpers-section-text(value="Guides.ServerSideRendering.applicationText1")
      helpers-section-text(value="Guides.ServerSideRendering.applicationText2")
      helpers-markup(lang="html")
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
      helpers-section-subheader(value="Guides.ServerSideRendering.applicationSubHeader1")
      helpers-section-text(value="Guides.ServerSideRendering.applicationText3")
      helpers-section-subheader(value="Guides.ServerSideRendering.applicationSubHeader2")
      helpers-section-text(value="Guides.ServerSideRendering.applicationText4")

    section#routing
      helpers-section-head(value="Guides.ServerSideRendering.routingHeader")
      helpers-section-text(value="Guides.ServerSideRendering.routingText1")
      helpers-markup(lang="js")
        |routes: [
        |   route('/', 'Welcome'),
        |   route('/inspire', 'Inspire')
        |]
      helpers-section-text(value="Guides.ServerSideRendering.routingText2")

    section#state-control
      helpers-section-head(value="Guides.ServerSideRendering.stateControlHeader")
      helpers-section-text(value="Guides.ServerSideRendering.stateControlText1")
      helpers-markup(lang="js")
        |preFetch (store) {
        |   store.dispatch('GET_USER', 2)
        |}
      helpers-section-text(value="Guides.ServerSideRendering.stateControlText2")
      helpers-section-text(value="Guides.ServerSideRendering.stateControlText3")
      helpers-section-text(value="Guides.ServerSideRendering.stateControlText4")

    section#meta-data
      helpers-section-head(value="Guides.ServerSideRendering.metaDataHeader")
      helpers-section-text(value="Guides.ServerSideRendering.metaDataText")

    section#redirects
      helpers-section-head(value="Guides.ServerSideRendering.redirectsHeader")
      helpers-section-text(value="Guides.ServerSideRendering.redirectsText")

    section#web-app-support
      helpers-section-head(value="Guides.ServerSideRendering.webAppSupportHeader")
      helpers-section-text(value="Guides.ServerSideRendering.webAppSupportText")
</template>
