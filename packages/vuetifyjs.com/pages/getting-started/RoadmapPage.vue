<template lang="pug">
  doc-view
    section#highlights
      table.table.elevation-1.mb-5
        tbody
          tr(
            v-for="(road, i) in roadmap"
            :key="i"
          )
            td
              v-layout(justify-start align-center)
                v-icon(v-text="road.icon")
            td.no-wrap
              div(v-html="road.name").body-2
              span(v-html="road.date")
            td
              markdown(:source="road.desc")
      support-vuetify
</template>

<script>
  export default {
    computed: {
      roadmap () {
        return this.$t('GettingStarted.Roadmap.roadmap')
      }
    }
  }
</script>

<style lang="stylus">
  #highlights table.table tbody p
    margin-bottom: 0
</style>
