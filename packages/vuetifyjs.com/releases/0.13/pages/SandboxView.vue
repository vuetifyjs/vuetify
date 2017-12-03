<template lang="pug">
  doc-view#sandbox-view
    v-layout(column-xs row-sm wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Sandbox
          dd(slot="desc") This page will allow you to configure the various settings available to you when setting up a layout with Vuetify.
      ad
    section
      v-layout
        v-flex(xs12)
          component-example(
            header="Application"
            file="sandbox/1"
          )
</template>

<script>
  export default {
    //
  }
</script>

<style lang="stylus">
  #sandbox-view .application
    z-index: 0
</style>
