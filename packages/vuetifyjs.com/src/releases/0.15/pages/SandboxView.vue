<template lang="pug">
  doc-view#sandbox-view
    v-layout(row wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Sandbox
          dd(slot="desc") This page will allow you to configure the various settings available to you when setting up a layout with Vuetify. Keep in mind, this is <strong>not</strong> an exhaustive list, but a starting point allowing you to understand what is available.
      ad
    section
      v-layout
        v-flex(xs12)
          component-example(
            header="Application"
            file="sandbox/1"
          )
</template>

<style lang="stylus">
  #sandbox-view .application
    z-index: 0
</style>
