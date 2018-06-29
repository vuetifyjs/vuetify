<template lang="pug">
  doc-view#sandbox-view
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") Sandbox
          dd(slot="desc") This page will allow you to configure the various settings available to you when setting up a layout with Vuetify. Keep in mind, this is <strong>not</strong> an exhaustive list, but a starting point allowing you to understand what is available.
      ad
    section
      v-layout
        v-flex(xs12).text-xs-center
          v-btn(
            href="/examples/layouts/sandbox"
            target="_blank"
            color="primary"
            large
            dark
          ).mt-5 Go to Sandbox
</template>
