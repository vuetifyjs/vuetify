<template lang="pug">
  views-doc
    section#highlights
      table.v-table.elevation-1.mb-5
        tbody
          tr(
            v-for="(roadmap, i) in roadmaps"
            :key="i"
          )
            td
              v-layout(justify-start align-center)
                v-icon(v-text="roadmap.icon")
            td.no-wrap
              div(v-html="roadmap.name").body-2
              span(v-html="roadmap.date")
            td
              translation-translatable(:i18n="`${roadmap.namespace}.desc`")
                markdown(:source="roadmap.desc")
      misc-support-vuetify
</template>

<script>
  export default {
    computed: {
      roadmaps () {
        const length = this.$t('GettingStarted.Roadmap.roadmap', 'en').length
        return [...Array(length).keys()].map(i => ({
          namespace: `GettingStarted.Roadmap.roadmap[${i}]`,
          icon: this.$t(`GettingStarted.Roadmap.roadmap[${i}].icon`),
          name: this.$t(`GettingStarted.Roadmap.roadmap[${i}].name`),
          date: this.$t(`GettingStarted.Roadmap.roadmap[${i}].date`),
          desc: this.$t(`GettingStarted.Roadmap.roadmap[${i}].desc`)
        }))
      }
    }
  }
</script>

<style lang="stylus">
  #highlights table.v-table tbody p
    margin-bottom: 0
</style>
