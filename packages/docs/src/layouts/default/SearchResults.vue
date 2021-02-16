<template>
  <!--  eslint-disable vue/no-template-shadow -->
  <!--  eslint-disable vue/valid-v-for -->
  <!--  eslint-disable vue/require-v-for-key -->
  <v-list>
    <template v-for="group in groups">
      <v-subheader>{{ group.name }}</v-subheader>
      <v-divider />
      <template v-for="group in group.items">
        <v-list-item
          v-if="group.items[0]._highlightResult.hierarchy.lvl1.matchLevel === 'full'"
          :to="new URL(location.origin + group.items[0].url).pathname"
        >
          <v-list-item-content>
            <v-list-item-title v-html="group.items[0]._highlightResult.hierarchy.lvl1.value" />
          </v-list-item-content>
        </v-list-item>

        <v-list v-else>
          <v-list-item class="py-1">
            <v-list-item-title>{{ group.name }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-for="item in group.items" :to="item.url" class="pl-12">
            <v-list-item-content>
              <v-list-item-title class="text-wrap" v-html="makeBreadcrumbs(item)" />
              <v-list-item-subtitle v-if="item.content" v-html="item._highlightResult.content.value" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </template>
  </v-list>
</template>

<script>
  export default {
    props: ['groups'],
    data: () => ({
      location,
    }),
    methods: {
      URL,
      makeBreadcrumbs (item) {
        const hierarchy = item._highlightResult.hierarchy
        let str = ''
        for (const lvl of Object.keys(hierarchy).slice(2)) {
          if (str.length) str += ' <i class="mdi mdi-chevron-right"></i> '
          str += hierarchy[lvl].value
          if (hierarchy[lvl].matchLevel === 'full') break
        }
        return str
      },
    },
  }
</script>

<style lang="sass" scoped>
  .v-list-item
    min-height: 0

  ::v-deep mark
    background: rgb(33, 150, 243, 30%)
    color: inherit
</style>
