<template lang="pug">
  text-page(:data="$data" id="roadmap")
    section#higlights
      table.table.elevation-1
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
            td(v-html="road.desc")
</template>

<script>
  export default {
    data: () => ({
      header: 'GettingStarted.Roadmap.header',
      headerText: 'GettingStarted.Roadmap.headerText'
    }),

    computed: {
      roadmap () {
        return this.$t('GettingStarted.Roadmap.roadmap')
      }
    }
  }
</script>